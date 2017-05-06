<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
		$projects = $this->manager->byUser($request->user());

		return response()->json(['message' => 'Displaying projects for a user', 'projects' => $projects], 200);
	}

}
