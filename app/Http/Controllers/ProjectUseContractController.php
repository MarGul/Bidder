<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Managers\ProjectManager;
use App\Project;

class ProjectUseContractController extends Controller
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request     $request
     * @param  App\Project                  $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Project $project)
    {
        $this->authorize('in-project', $project);

        // Try the mark the project as using a contract.
        $this->manager->byUser($request->user())
                      ->forProject($project)
                      ->useContract();
        
        if ( $this->manager->hasError() ) {
            return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
        }

        return response()->json([
            'message' => $this->manager->successMessage(),
            'data' => [
                'history' => $this->manager->history(),
                'usersNotAccepted' => $this->manager->usersNotAccepted()
            ]
        ], $this->manager->successCode());
    }
}
