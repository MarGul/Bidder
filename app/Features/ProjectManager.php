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

}