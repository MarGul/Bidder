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
		$this->projectHistoryManager->forProject($project->id)->add('created');
		
		return true;
	}

	/**
	 * Update a project's details.
	 * 
	 * @param  App\Project 	$project
	 * @param  App\User 	$user
	 * @param  array 		$data
	 * @return mixed
	 */
	public function updateDetails($project, $user, $data)
	{
		if ( !$project->update($data) ) {
			return false;
		}

		// Mark the other user as not accepted.
		$this->setOthersNotAccepted($project, $user);

		// Insert a history record that the project's details has been updated.
		$history =  $this->projectHistoryManager->forProject($project->id)
												->add('updateDetails', ['user' => $user->username]);

		return ['history' => $history, 'updates' => $data];
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
	 * @param  App\Project 	$project
	 * @param  App\User 	$user    [myself, to get other ones for the project.]
	 * @return array
	 */
	protected function setOthersNotAccepted($project, $user)
	{
		$project->load(['users' => function($q) use ($user) {
			$q->where('user_id', '<>', $user->id);
		}]);

		// The users that has been marked as not accepted.
		$users = [];
		foreach ($project->users as $u) {
			$project->users()->updateExistingPivot($u->id, ['accepted' => false]);
			$users[] = $u->id;
		}

		return $users;
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