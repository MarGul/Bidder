<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Features\ProjectManager;
use App\Project;

class ProjectCancelController extends Controller
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
	 * Store a newly created resource in storage.
	 * 
	 * @param  Request 	$request
	 * @return Illuminate\Http\Response
	 */
	public function store(Request $request, Project $project)
	{
		$this->authorize('in-project', $project);
		
		if ( !$this->manager->cancel($project) ) {
			return response()->json(['message' => 'Could not cancel the project for you.'], 500);
		}

		return response()->json(['message' => 'Successfully cancelled the project.'], 200);
	}

}
