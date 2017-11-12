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
	 * @param  App\Project 	$project
	 * @param  App\User 	$user
	 * @return mixed
	 */
	public function useContract($project, $user)
	{
		if ( !$project->update(['use_contract' => true]) ) {
			return false;
		}

		// Mark the other user as not accepted.
		$usersNotAccepted = $this->setOthersNotAccepted($project, $user);

		// Set a history that the user wanted to use a contract.
		$this->projectHistoryManager->forProject($project->id)
									->add('useContract', ['user' => $user->username]);

		return [
			'history' => $this->projectHistoryManager->addedRecords(),
			'usersNotAccepted' => $usersNotAccepted
		];
	}

	/**
	 * Show a single project with relations.
	 * 
	 * @param  App\Project 	$project
	 * @return App\Project
	 */
	public function show($project)
	{
		$project->load('service', 'bid.user', 'users', 'contracts', 'history', 'messages.user');

		return $project;
	}

	/**
	 * Accept a project.
	 * 
	 * @param  App\Project 	$project
	 * @param  App\User 	$user    [User that accepted]
	 * @return boolean
	 */
	public function accept($project, $user)
	{
		// Mark the user that accepted.
		$project->users()->updateExistingPivot($user->id, ['accepted' => true]);
		// Insert a project history record that the project was accepted by the user.
		$this->projectHistoryManager->forProject($project->id)
									->add('accepted', ['user' => $user->username]);
		// If all users on the project has accepted we should start the project.
		$started = $this->shouldStart($project) ? $this->start($project) : false;

		return [
			'started' => $started, 
			'history' => $this->projectHistoryManager->addedRecords()
		];
	}

	/**
	 * Cancel a project.
	 * 
	 * @param  App\Project 	$project
	 * @param  App\User 	$user    [User that cancelled]
	 * @return boolean
	 */
	public function cancel($project, $user)
	{
		if ( !$project->update(['cancelled' => true]) ) {
			return false;
		}

		// Mark the user that cancelled.
		$project->users()->updateExistingPivot($user->id, ['cancelled' => true]);
		// Insert a project history record that the project was cancelled.
		$this->projectHistoryManager->forProject($project->id)
									->add('cancelled', ['user' => $user->username]);

		return ['history' => $this->projectHistoryManager->addedRecords()];
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
	 * @param  App\Project 	$project
	 * @return boolean
	 */
	protected function shouldStart($project)
	{
		$project->load('users');
		// Loop through each user for the project.
		foreach ($project->users as $user) {
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
	 * @param  App\Project 	$project
	 * @return boolean
	 */
	protected function start($project)
	{
		if ( !$project->update(['started' => true]) ) {
			return false;
		}
		// Add a history record that the project has been started.
		$this->projectHistoryManager->forProject($project->id)
									->add('started');

		return true;
	}

	/**
	 * Update the title for a project according to what role the user has on the project.
	 * 
	 * @param  App\User 	$user
	 * @param  App\Project 	$project
	 * @param  string 		$title
	 * @return boolean
	 */
	/*
	public function updateTitle($user, $project, $title)
	{
		if ( $user->id === $project->service_user ) {
			$project->service_user_title = $title;
		} else {
			$project->bid_user_title = $title;
		}

		return $project->update() ? true : false;
	}

	/**
	 * Start a project
	 * 
	 * @param  App\Project 	$project
	 * @return boolean
	 */
	/*
	public function start($project)
	{
		$project->started = true;

		if ( !app(InvoiceManager::class)->create($project) ) return false;

		return $project->save() ? true : false;
	}

	/**
	 * Complete a project.
	 * 
	 * @param  App\Project 	$project
	 * @return boolean
	 */
	/*
	public function complete($project)
	{
		// Attach reviews for both users.
		if ( !app(ReviewManager::class)->attach($project->bid_user, $project->service_user, $project->id) ) {
			return false;
		}

		// Mark the project as complete
		$project->completed = true;

		return $project->save() ? true : false;
	}
*/

}