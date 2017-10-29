<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Features\ProjectManager;
use App\Project;

class ProjectUseContractController extends Controller
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request     $request
     * @param  App\Project                  $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Project $project)
    {
        $this->authorize('in-project', $project);

        if ( !$response = $this->manager->useContract($project, $request->user()) ) {
            return response()->json(['message' => 'Could not set the project to use a contract.'], 500);
        }

        return response()->json([
            'message' => 'Successfully updated the project to use a contract.',
            'history' => $response['history'],
            'usersNotAccepted' => $response['usersNotAccepted']
        ], 200);
    }
}
