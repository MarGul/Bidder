<?php

namespace App\Features;

use App\Project;

class ProjectManager {

	/**
	 * Create a project.
	 * 
	 * @param  array $data 	[The data for the project]
	 * @return boolean
	 */
	public function create($data) {
		$project = new Project($data);

		return ($project->save()) ? true : false;
	}

	/**
	 * Show a users projects.
	 * 
	 * @param  App\User 	$user
	 * @return collection
	 */
	public function byUser($user) {
		$projects = Project::where('service_user', $user->id)
							->orWhere('bid_user', $user->id)
							->orderBy('created_at', 'desc')
							->get();

		return $projects;
	}

}