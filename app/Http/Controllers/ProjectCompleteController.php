<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Features\ProjectManager;
use App\Project;

class ProjectCompleteController extends Controller
{
    
	/**
	 * Manager
	 * 
	 * @var App\Features\ProjectManager
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

		if ( !$this->manager->complete($project) ) {
			return response()->json(['message' => 'Could not complete the project'], 500);
		}

		return response()->json(['message' => 'Successfully completed the project'], 200);
	}

}
