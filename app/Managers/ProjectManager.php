<?php

namespace App\Managers;

use App\Project;
use Carbon\Carbon;
use App\Managers\Traits\ProjectTrait;
use App\Managers\Traits\ServiceTrait;
use App\Managers\Traits\BidTrait;
use Notification;
use App\Notifications\ProjectUsingContract;
use App\Notifications\ProjectRemoveContract;
use App\Notifications\ProjectAccepted;
use App\Notifications\ProjectCancelled;


class ProjectManager extends BaseManager 
{
	use ProjectTrait, ServiceTrait, BidTrait;
	
	/**
	 * The amount of days after a project is created that users have to accept the project.
	 * @var integer
	 */
	protected $acceptDays = 14;
	/**
	 * The role for a project user that created the service.
	 * @var string
	 */
	protected $userRoleService = 'service';
	/**
	 * The role for a project user that created the bid.
	 * @var string
	 */
	protected $userRoleBid = 'bid';
	/**
	 * The users that has been marked as not accepting the project anymore.
	 *
	 * @var array
	 */
    protected $usersNotAccepted = [];

	/**
     * Return the users that has been marked as not accepted.
     *
     * @return array
     */
	public function usersNotAccepted() { return $this->usersNotAccepted; }
	
	/**
	 * Fetch the users projects.
	 *
	 * @return boolean
	 */
	public function get()
	{
		try {
			$this->projects = Project::with(['users' => function($query) {
				$query->where('user_id', $this->user->id);
			}])->get();
		} catch ( \Exception $e ) {
			$this->setError('Could not fetch the users projects from storage.', 500);
			return false;
		}

		$this->setSuccess('Listing the users projects.', 200);

		return true;
	}

	/**
	 * Create a project between a service and a bid.
	 * 
	 * @param  	App\Service 	$service
	 * @param 	App\Bid 		$bid
	 * @return 	boolean
	 */
	public function create() 
	{
        if ( $this->hasError() ) return false;

        if ( !$this->insert() ) return false;

        if ( !$this->attachProjectUsers() ) return false;

		// Insert a history record that the project was created.
		$this->projectHistoryManager->forProject($this->project->id)->add('created');
        
        $this->setSuccess('Successfully created the project in storage.', 201);

		return true;
    }
    
    /**
     * Insert a project into storage.
     *
     * @return boolean
     */
    protected function insert()
    {
        try {
            $this->project = Project::create([
                'service_id' => $this->service->id,
                'bid_id' => $this->bid->id,
                'service_price' => $this->bid->price,
                'service_start' => $this->bid->start,
                'service_end' => $this->bid->end,
                'service_hours' => $this->bid->hours,
                'accept_ends' => Carbon::now()->addDays($this->acceptDays)
            ]);
        } catch ( \Exception $e ) {
            $this->setError('Could not insert the project into storage.', 500);
            return false;
        }

        return true;
    }

    /**
     * Attach the users to a project.
     *
     * @return boolean
     */
    protected function attachProjectUsers()
    {
        try {
            // Attach the service user.
            $this->project->users()->attach($this->service->user_id, ['role' => $this->userRoleService, 'title' => "Projekt #{$this->project->id}"]);
            // Attach the bid user.
            $this->project->users()->attach($this->bid->user_id, ['role' => $this->userRoleBid, 'title' => "Projekt #{$this->project->id}"]);
        } catch ( \Exception $e ) {
            $this->setError('Could not attach the users for the project.', 500);
            return false;
        }

        return true;
    }

    /**
     * Update the project.
     *
     * @param   array $data
     * @return  boolean
     */
    public function update($data)
    {
        if ( $this->hasError() ) return false;

        if ( !$this->setData($data)->edit() ) return false;

        if ( !$this->setOthersNotAccepted() ) return false;

        $this->projectHistoryManager->forProject($this->project->id)
									->add('updateDetails', ['user' => $this->user->username]);
									
		// Broadcast that the project details has been updated to the other user.
		event(new DetailsUpdated($this->project, $this->history(), $this->usersNotAccepted()));

        $this->setSuccess('Successfully updated the resource in storage.', 200);

        return true;
    }

    /**
     * Update the resource in storage.
     *
     * @return boolean
     */
    protected function edit()
    {
        try {
            $this->project->update($this->data());
        } catch ( \Exception $e ) {
            $this->setError('Could not update the resource in storage.', 500);
            return false;
        }

        return true;
    }

	/**
	 * Mark a project to use a contract.
	 * 
	 * @return boolean
	 */
	public function useContract()
	{
		if ( $this->hasError() ) return false;

		try {
			// Mark that the project is use a contract.
			$this->project->update(['use_contract' => true]);
			// Mark the user that wants to use contract.
			$this->project->users()->updateExistingPivot($this->user->id, ['use_contract' => true]);
		} catch ( \Exception $e ) {
			$this->setError('Could not mark the project as using a contract.', 500);
			return false;
		}

		// Mark the other user as not accepted.
		if ( !$this->setOthersNotAccepted() ) return false;

		// Set a history that the user wanted to use a contract.
		$this->projectHistoryManager->forProject($this->project->id)
									->add('useContract', ['user' => $this->user->username]);

		// Send out the notification about the use of contract.
		Notification::send($this->otherUsers(), new ProjectUsingContract($this->project, $this->history(), $this->usersNotAccepted()));
		
		$this->setSuccess('Successfully marked the project as using a contract.', 200);

		return true;
	}

	/**
	 * Remove the use of contract for the project.
	 * 
	 * @return boolean
	 */
	public function removeContract()
	{
		if ( $this->hasError() ) return false;

		if ( !$this->canRemoveUseOfContract() ) return false;

		try {
			// Mark the project as not using contract.
			$this->project->update(['use_contract' => false]);
			// Remove the user that before wanted to use the contract (Right no only the user that wanted to use contract can remove it.)
			$this->project->users()->updateExistingPivot($this->user->id, ['use_contract' => false]);
		} catch (\Exception $e) {
			$this->setError('Could not remove the use of contract for the project.', 500);
			return false;
		}

		// Mark the other user as not accepted.
		if ( !$this->setOthersNotAccepted() ) return false;

		// Insert a history record that the use of contract has been made.
		$this->projectHistoryManager->forProject($this->project->id)
									->add('removeContract', ['user' => $this->user->username]);

		// Send out the notification about the removal of the contract.
		Notification::send($this->otherUsers(), new ProjectRemoveContract($this->project, $this->history(), $this->usersNotAccepted()));

		$this->setSuccess('Successfully removed the use of contract for the project.', 200);

		return true;
	}

	/**
	 * Show a single project with relations.
	 * 
	 * @return boolean
	 */
	public function show()
	{
		try {
			$this->project->load('service', 'users', 'bid.user', 'contracts', 'history', 'messages.user');
		} catch ( \Exception $e ) {
			$this->setError('Could not display the project.', 500);
			return false;
		}
		
		$this->setSuccess('Displaying a project.', 200);

		return true;
	}

	/**
	 * Accept a project.
	 * 
	 * @return boolean
	 */
	public function accept()
	{
		if ( $this->hasError() ) return false;

		try {
			// Mark the user that accepted.
			$this->project->users()->updateExistingPivot($this->user->id, ['accepted' => true]);
		} catch ( \Exception $e ) {
			$this->setError('Could not accept the project.', 500);
			return false;
		}
		
		// Insert a project history record that the project was accepted by the user.
		$this->projectHistoryManager->forProject($this->project->id)
									->add('accepted', ['user' => $this->user->username]);
		
		// If all users on the project has accepted we should start the project.
		if ( $this->shouldStart() ) {
			if ( !$this->start() ) return false;
		}

		// Send out notification to the other users that you accepted the project.
		Notification::send($this->otherUsers(), new ProjectAccepted(
			$this->project, $this->project->started, $this->history(), $this->user->id
		));

		$this->setSuccess('Successfully accepted the project.', 200);

		return true;
	}

	/**
	 * Cancel a project.
	 * 
	 * @return boolean
	 */
	public function cancel()
	{
		if ( $this->hasError() ) return false;

		try {
			// Mark the project as cancelled.
			$this->project->update(['cancelled' => true]);
			// Set the user that cancelled.
			$this->project->users()->updateExistingPivot($this->user->id, ['cancelled' => true]);
		} catch ( \Exception $e ) {
			$this->setError('Could not mark the project as cancelled.', 500);
			return false;
		}
		
		// Insert a project history record that the project was cancelled.
		$this->projectHistoryManager->forProject($this->project->id)
									->add('cancelled', ['user' => $this->user->username]);

		// Send out notification to the other users that you cancelled the project.
		Notification::send($this->otherUsers(), new ProjectCancelled(
			$this->project, $this->history(), $this->user->id
		));

		
		$this->setSuccess('Successfully cancelled the project.', 200);

		return true;
	}

	/**
	 * Mark other user in the project as not accepted.
	 * 
	 * @return array
	 */
	protected function setOthersNotAccepted()
	{
        try {
            $this->project->load(['users' => function($q) {
                $q->where('user_id', '<>', $this->user->id);
            }]);
    
            // The users that has been marked as not accepted.
            $users = [];
            foreach ($this->project->users as $u) {
                $this->project->users()->updateExistingPivot($u->id, ['accepted' => false]);
                $this->usersNotAccepted[] = $u->id;
            }
        } catch ( \Exception $e ) {
            $this->setError('Could not mark other users as not accepted.', 500);
            return false;
        }
        
        return true;
	}

	/**
	 * Is the user allowed to remove the use of contract for the project?
	 * 
	 * @return boolean
	 */
	protected function canRemoveUseOfContract()
	{
		$this->project->load('users');

		foreach ($this->project->users as $user) {
			if ( $user->id === $this->user->id && $user->pivot->use_contract) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Get the other users of the project.
	 *
	 * @return collection
	 */
	protected function otherUsers()
	{
		if ( $this->project->users->isEmpty() ) {
			$this->project->load(['users' => function($q) {
				$q->where('user_id', '<>', $this->user->id);
			}]);

			return $this->project->users;
		}

		return $this->project->users->whereNotIn('id', [$this->user->id]);
	}

	/**
	 * Should we start the project? 
	 * If all participants have accepted we can start.
	 * 
	 * @return boolean
	 */
	protected function shouldStart()
	{
		try {
			$this->project->load('users');
		} catch ( \Exception $e ) {
			$this->setError('Could not load users when seeing if the project should start.', 500);
			return false;
		}
		
		// Loop through each user for the project.
		foreach ($this->project->users as $user) {
			// If one of them still haven't accepted we shouldn't start.
			if ( !$user->pivot->accepted ) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Start a project.
	 * 
	 * @return boolean
	 */
	protected function start()
	{
		try {
			$this->project->update(['started' => true]);
		} catch ( \Exception $e ) {
			$this->setError('Could not mark the project as started.', 500);
			return false;
		}

		// Add a history record that the project has been started.
		$this->projectHistoryManager->forProject($this->project->id)
									->add('started');

		return true;
	}

}