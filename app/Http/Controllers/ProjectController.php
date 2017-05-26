<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Features\ProjectManager;
use App\Project;

class ProjectController extends Controller
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
			'finish' => 'required|date_format:Y-m-d|after_or_equal:today',
            'price' => 'required|numeric'
		]);

		if ( !$this->manager->update($project, $request->only(['finish', 'price'])) ) {
			return response()->json(['message' => 'Could not update the project details.'], 500);
		}

		return response()->json(['message' => 'Successfully updated the project details'], 200);
	}
}
