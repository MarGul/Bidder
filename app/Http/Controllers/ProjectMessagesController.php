<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Features\MessageManager;
use App\Project;

class ProjectMessagesController extends Controller
{
    
    /**
	 * Manager
	 * 
	 * @var App\Features\MessageManager
	 */
	private $manager;

	public function __construct(MessageManager $manager) {
		$this->middleware('auth:api');
		$this->manager = $manager;
	}

    /**
     * Store a newly created resource in storage.
     * 
     * @param  Request 	$request
     * @param  Project 	$project
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Project $project) {
    	$this->authorize('in-project', $project);
    	$this->validate($request, ['message' => 'required']);

    	$data = ['projectId' => $project->id, 'message' => $request->message];

        if ( !$message = $this->manager->create($request->user(), $data) ) {
    		return response()->json(['message' => 'Could not create the message.'], 500);
    	}

    	return response()->json(['msg' => 'Created the message.', 'message' => $message], 201);
    }

}
