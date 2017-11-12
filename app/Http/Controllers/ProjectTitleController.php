<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Managers\ProjectManager;
use App\Project;

class ProjectTitleController extends Controller
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
	 * Update the resource in storage
	 * 
	 * @param  Request 	$request
	 * @param  Project 	$project
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, Project $project) {
		$this->authorize('in-project', $project);
		$this->validate($request, ['title' => 'required']);

		if ( !$this->manager->updateTitle($request->user(), $project, $request->title) ) {
			return response()->json(['message' => 'Could not update the projects title.'], 500);
		}

		return response()->json(['message' => 'Updated the projects title.'], 200);
	}

}
