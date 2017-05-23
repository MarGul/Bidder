<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Features\ProjectManager;
use App\Project;

class ProjectMessagesController extends Controller
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
     * Display a listing of the resource
     * 
     * @param  Project  $project
     * @return \Illuminate\Http\Response
     */
    public function index(Project $project) {
        $this->authorize('in-project', $project);

        $messages = $this->manager->messages($project);

        return response()->json(['message' => 'Displaying messages for project.', 'messages' => $messages], 200);
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

    	if ( !$message = $this->manager->createMessage($project, $request->user(), $request->message) ) {
    		return response()->json(['message' => 'Could not create the message.'], 500);
    	}

    	return response()->json(['msg' => 'Created the message.', 'message' => $message], 201);
    }

}
