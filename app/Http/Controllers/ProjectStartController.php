<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Managers\ProjectManager;
use App\Project;

class ProjectStartController extends Controller
{
    
	/**
	 * Manager
	 * 
	 * @var App\Managers\ProjectManager
	 */
	private $manager;

	public function __construct(ProjectManager $manager) {
		$this->middleware('auth:api');
		$this->manager = $manager;
	}

	/**
	 * Update the resource in storage.
	 * 
	 * @param  Project 	$project
	 * @return Illuminate\Http\Response
	 */
	public function update(Project $project)
	{
		$this->authorize('in-project', $project);

		if ( !$this->manager->start($project) ) {
			return response()->json(['message' => 'Could not start the project'], 500);
		}

		return response()->json(['message' => 'Successfully started the project'], 200);
	}

}
