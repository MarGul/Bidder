<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;
use App\Managers\ProjectManager;

class UserProjectsController extends Controller
{
    
    /**
     *  Class to manage projects.
     * 
     * @var App\Managers\ProjectManager;
     */
	private $manager;

	public function __construct(ProjectManager $manager) {
		$this->manager = $manager;
		$this->middleware('auth:api');
	}

	/**
	 * Display all resources
	 * 
	 * @param  Request $request
	 * @return Illuminate\Http\Response
	 */
	public function index(Request $request) {
		// Try to get the users projects.
		$this->manager->byUser($request->user())
					  ->get();

		if ( $this->manager->hasError() ) {
			return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
		}
		
		return response()->json([
			'message' => $this->manager->successMessage(),
			'data' => [
				'projects' => $this->manager->projects()
			] 
		], $this->manager->successCode());
	}

	/**
	 * Display a resource
	 * 
	 * @param  Request $request
	 * @param  Project $project
	 * @return Illuminate\Http\Response
	 */
	public function show(Request $request, Project $project)
	{
		$this->authorize('in-project', $project);

		// Try to fetch the project
		$this->manager->forProject($project)
					  ->show();

		if ( $this->manager->hasError() ) {
			return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
		}
		
		return response()->json([
			'message' => $this->manager->successMessage(),
			'data' => [
				'project' => $this->manager->project()
			]
		], $this->manager->successCode());
	}

}
