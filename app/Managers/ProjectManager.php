<?php

namespace App\Managers;

use App\Project;
use Carbon\Carbon;
use App\Features\InvoiceManager;
use App\Managers\ProjectHistoryManager;

class ProjectManager extends BaseManager 
{

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
	 * ProjectHistoryManager instance.
	 * @var App\Managers\ProjectHistoryManager
	 */
    protected $projectHistoryManager;
    
	protected $project;
	protected $projects;
    protected $service;
    protected $bid;
    protected $usersNotAccepted = [];

	
	public function __construct(ProjectHistoryManager $projectHistoryManager)
	{
        $this->projectHistoryManager = $projectHistoryManager;
    }
    
    /**
     * Set the service that the manager will be working on.
     *
     * @param   App\Service $service
     * @return  ProjectManager
     */
    public function forService($service)
    {
        if ( !$service instanceof \App\Service ) {
            $this->setError('Service needs to be an instance of service.', 500);
        } else {
            $this->service = $service;
        }

        return $this;
    }

    /**
     * Set the bid that the manager will be working with.
     *
     * @param   App\Bid $bid
     * @return  ProjectManager
     */
    public function forBid($bid)
    {
        if ( !$bid instanceof \App\Bid ) {
            $this->setError('Bid needs to be an instance of bid.', 500);
        } else {
            $this->bid = $bid;
        }

        return $this;
    }

    /**
	 * Set the project that the manager is working on.
	 * 
	 * @param  App\Project 	$project
	 * @return ProjectManager
	 */
	public function forProject($project)
	{
		if ( !$project instanceof \App\Project ) {
			$this->setError('Project must be an instance of project.', 500);
		} else {
			$this->project = $project;
		}

		return $this;
	}

	/**
	 * Return the project that the manager has been working on.
	 *
	 * @return App\Project
	 */
	public function project() { return $this->project; }
	/**
	 * Return the projects that the manager has been working on.
	 *
	 * @return Collection
	 */
	public function projects() { return $this->projects; }
	/**
     * Return the users that has been marked as not accepted.
     *
     * @return array
     */
	public function usersNotAccepted() { return $this->usersNotAccepted; }
	/**
	 * Return the added project history records.
	 *
	 * @return array
	 */
	public function history() { return $this->projectHistoryManager->addedRecords(); }

	
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
	 * @return mixed
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

		$this->setSuccess('Successfully marked the project as using a contract.', 200);

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