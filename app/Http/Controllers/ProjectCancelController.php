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
		
		// Try to cancel the project.
		$this->manager->byUser($request->user())
					  ->forProject($project)
					  ->cancel();

		if ( $this->manager->hasError() ) {
			return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
		}

		return response()->json([
			'message' => $this->manager->successMessage(),
			'data' => [
				'history' => $this->manager->history()
			]
		], $this->manager->successCode());
	}

}
