<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;
use App\Features\ProjectManager;

class UserProjectsController extends Controller
{
    
    /**
     *  Class to manage projects.
     * 
     * @var App\Features\ProjectManager;
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
		return response()->json([
			'message' => 'Displaying projects for a user.', 
			'projects' => $this->manager->byUser($request->user())
		], 200);
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

		return response()->json([
			'message' => 'Displaying a user project.',
			'project' => $this->manager->show($project)
		], 200);
	}

}
