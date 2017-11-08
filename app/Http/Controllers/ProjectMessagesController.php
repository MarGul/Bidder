<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Managers\MessageManager;
use App\Project;

class ProjectMessagesController extends Controller
{
    
    /**
	 * Manager
	 * 
	 * @var App\Managers\MessageManager
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

    	// Try to insert the message.
        $this->manager->byUser($request->user())
                      ->forProject($project)
                      ->create(['message' => $request->message]);

        if ( $this->manager->hasError() ) {
            return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
        }

        return response()->json([
            'message' => $this->manager->successMessage(),
            'data' => [
                'message' => $this->manager->message()
            ]
        ], $this->manager->successCode());
    }

}
