<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Managers\ProjectManager;
use App\Project;

class ProjectCancelController extends Controller
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
	 * @param  Request 		$request
	 * @param  App\Project 	$project
	 * @return Illuminate\Http\Response
	 */
	public function update(Request $request, Project $project)
	{
		$this->authorize('in-project', $project);
		
		if ( !$response = $this->manager->cancel($project, $request->user()) ) {
			return response()->json(['message' => 'Could not cancel the project for you.'], 500);
		}

		return response()->json([
			'message' => 'Successfully cancelled the project.',
			'history' => $response['history']
		], 200);
	}

}
