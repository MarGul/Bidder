<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Features\ProjectManager;
use App\Project;

class ProjectAcceptController extends Controller
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
	 * Update a resource in storage.
	 * 
	 * @param  Request 	$request
	 * @param  Project 	$project
	 * @return Illuminate\Http\Response
	 */
	public function update(Request $request, Project $project)
	{
		$this->authorize('in-project', $project);
		
		if ( !$response = $this->manager->accept($project, $request->user()) ) {
			return response()->json(['message' => 'Could not accept the project for you.'], 500);
		}

		return response()->json([
			'message' => 'Successfully accepted the project.',
			'started' => $response['started'],
			'history' => $response['history']
		], 200);
	}

}
