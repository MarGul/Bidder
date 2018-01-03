<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Managers\ProjectManager;
use App\Project;

class ProjectCompleteController extends Controller
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
	public function update(Request $request, Project $project)
	{
		$this->authorize('in-project', $project);

		// Try to complete the project.
		$this->manager->byUser($request->user())
					  ->forProject($project)
					  ->completedByUser();

		if ( $this->manager->hasError() ) {
			return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
		}

		return response()->json([
			'message' => $this->manager->successMessage(),
			'data' => [
				'completed' => $this->manager->project()->completed,
				'userCompletedId' => $this->manager->user()->id,
				'history' => $this->manager->history(),
			]
		], $this->manager->successCode());
	}

}
