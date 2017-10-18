<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Features\ProjectManager;
use App\Project;

class ProjectDetailsController extends Controller
{
    /**
	 * Manager
	 * 
	 * @var App\Features\ProjectManager
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

		if ( !$response = $this->manager->updateDetails($project, $request->user(), $data) ) {
			return response()->json(['message' => 'Could not update the project details.'], 500);
		}

		return response()->json([
			'message' => 'Successfully updated the project details', 
			'history' => $response['history'],
			'updates' => $response['updates']
		], 200);
	}
}
