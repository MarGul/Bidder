<?php

namespace App\Features;

use App\Project;
Use App\Message;

class ProjectManager 
{

	/**
	 * Create a project.
	 * 
	 * @param  array $data 	[The data for the project]
	 * @return boolean
	 */
	public function create($data) 
	{
		$project = new Project($data);

		return ($project->save()) ? true : false;
	}

	/**
	 * Show a users projects.
	 * 
	 * @param  App\User 	$user
	 * @return collection
	 */
	public function byUser($user) 
	{
		$projects = Project::where('service_user', $user->id)
							->orWhere('bid_user', $user->id)
							->orderBy('created_at', 'desc')
							->get();

		return $projects;
	}

	/**
	 * Get the messages for a project.
	 * 
	 * @param  App\Project 	$project
	 * @return collection
	 */
	public function messages($project) 
	{
		$messages = Message::where('project_id', $project->id)->get();
		$messages->load('user');

		return $messages;
	}

	/**
	 * Create a message for a project.
	 * 
	 * @param  App\Project 	$project
	 * @param  App\User 	$user
	 * @param  string 		$message
	 * @return boolean
	 */
	public function createMessage($project, $user, $message) 
	{
		$message = new Message([
			'project_id' => $project->id,
			'user_id' => $user->id,
			'message' => $message
		]);

		if ( !$message->save() ) return false;

		$message->user = $user;

		return $message;
	}

	/**
	 * Update the title for a project according to what role the user has on the project.
	 * 
	 * @param  App\User 	$user
	 * @param  App\Project 	$project
	 * @param  string 		$title
	 * @return boolean
	 */
	public function updateTitle($user, $project, $title)
	{
		if ( $user->id === $project->service_user ) {
			$project->service_user_title = $title;
		} else {
			$project->bid_user_title = $title;
		}

		return $project->update() ? true : false;
	}

}