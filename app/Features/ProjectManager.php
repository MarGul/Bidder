<?php

namespace App\Features;

use App\Project;
use Carbon\Carbon;
use App\Features\InvoiceManager;
use App\Features\ProjectHistoryManager;

class ProjectManager 
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
	 * @var App\Features\ProjectHistoryManager
	 */
	protected $projectHistoryManager;

	
	public function __construct(ProjectHistoryManager $projectHistoryManager)
	{
		$this->projectHistoryManager = $projectHistoryManager;
	}

	/**
	 * Create a project between a service and a bid.
	 * 
	 * @param  	App\Service 	$service
	 * @param 	App\Bid 		$bid
	 * @return 	boolean
	 */
	public function create($service, $bid) 
	{
		$project = Project::create([
			'service_id' => $service->id,
			'bid_id' => $bid->id,
			'service_price' => $bid->price,
			'service_start' => $bid->start,
			'service_end' => $bid->end,
			'service_hours' => $bid->hours,
			'accept_ends' => Carbon::now()->addDays($this->acceptDays)
		]);

		// Attach the service user to the project.
		$project->users()->attach($service->user_id, ['role' => $this->userRoleService, 'title' => "Projekt #{$project->id}"]);
		// Attach the bid user to the project.
		$project->users()->attach($bid->user_id, ['role' => $this->userRoleBid, 'title' => "Project #{$project->id}"]);
		// Insert a history record that the project was created.
		$this->projectHistoryManager->add($project->id, 'created');
		
		return true;
	}

	/**
	 * Update a project's details.
	 * 
	 * @param  App\Project 	$project
	 * @param  App\User 	$user
	 * @param  array 		$data
	 * @return boolean
	 */
	public function updateDetails($project, $user, $data)
	{
		if ( !$project->update($data) ) {
			return false;
		}

		// Mark the other user as not accepted.
		$this->setOthersNotAccepted($project, $user);

		// Insert a history record that the project's details has been updated.
		$history = $this->projectHistoryManager->add($project->id, 'updateDetails', ['user' => $user->username]);

		return ['history' => $history, 'updates' => $data];
	}

	/**
	 * Show a users projects.
	 * 
	 * @param  App\User 	$user
	 * @return collection
	 */
	public function byUser($user) 
	{
		$projects = Project::with(['users' => function($query) use ($user) {
						$query->where('user_id', $user->id);
					}])->get();

		return $projects;
	}

	/**
	 * Show a single project with relations.
	 * 
	 * @param  App\Project 	$project
	 * @return App\Project
	 */
	public function show($project)
	{
		$project->load('service', 'bid.user', 'users', 'history', 'messages.user');

		return $project;
	}

	/**
	 * Mark other user in the project as not accepted.
	 * 
	 * @param  App\Project 	$project
	 * @param  App\User 	$user    [myself to get other ones for the project.]
	 * @return 
	 */
	public function setOthersNotAccepted($project, $user)
	{
		$project->load(['users' => function($q) use ($user) {
			$q->where('user_id', '<>', $user->id);
		}]);

		foreach ($project->users as $u) {
			$project->users()->updateExistingPivot($u->id, ['accepted' => false]);
		}
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
	 * Accepting to start a project
	 * 
	 * @param  App\User 	$user
	 * @param  App\Project 	$project
	 * @return boolean
	 */
	/*
	public function accept($user, $project)
	{
		if ( $user->id === $project->service_user ) {
			$project->service_user_accept = true;
		} else {
			$project->bid_user_accept = true;
		}

		if ( $this->shouldStart($project) ) {
			return $this->start($project);
		}

		return $project->update() ? true : false;
	}

	/**
	 * Cancel a project
	 * 
	 * @param  App\Project 	$project
	 * @return boolean
	 */
	/*
	public function cancel($project)
	{
		$project->canceled = true;

		return $project->save() ? true : false;
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

	/**
	 * Have both parties accepted so we should start the project?
	 * 
	 * @param  App\Project 	$project
	 * @return boolean
	 */
	/*
	public function shouldStart($project)
	{
		return $project->service_user_accept && $project->bid_user_accept;
	}*/

}