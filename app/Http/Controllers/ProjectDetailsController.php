<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Managers\ProjectManager;
use App\Project;

class ProjectDetailsController extends Controller
{
    /**
	 * Manager
	 * 
	 * @var App\Managers\ProjectManager
	 */
	private $manager;

	public function __construct(ProjectManager $manager) 
	{
		$this->middleware('auth:api');
		$this->manager = $manager;
	}

	/**
	 * Update the resource in storage
	 * 
	 * @param  Request 	$request
	 * @param  Project 	$project
	 * @return Illuminate\Http\Response
	 */
	public function update(Request $request, Project $project)
	{
		$this->authorize('in-project', $project);
		$this->validate($request, [
			'service_start' => 'required|date_format:Y-m-d|after_or_equal:today',
			'service_end' => 'required|date_format:Y-m-d|after_or_equal:today',
			'service_hours' => 'required|numeric',
            'service_price' => 'required|numeric'
		]);

		$data = $request->only(['service_start', 'service_end', 'service_hours', 'service_price']);
		
		// Try to update the project.
		$this->manager->byUser($request->user())
                      ->forProject($project)
                      ->update($data);

		if ( $this->manager->hasError() ) {
			return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
		}

		return response()->json([
			'message' => $this->manager->successMessage(),
			'data' => [
				'history' => $this->manager->history(),
				'usersNotAccepted' => $this->manager->usersNotAccepted()
			]
		], $this->manager->successCode());
	}
}
