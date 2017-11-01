<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Features\ContractManager;
use App\Project;

class ContractsController extends Controller
{

    /**
     * Manager
     * 
     * @var App\Features\ContractManager
     */
    private $manager;

    
    public function __construct(ContractManager $manager) {
        $this->middleware('auth:api');
        $this->manager = $manager;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'project_id' => 'required|exists:projects,id',
            'client_name' => 'required',
            'client_identity' => 'required',
            'contractor_name' => 'required', 
            'contractor_identity' => 'required', 
            'project_description' => 'required',
            'contractor_dissuasion' => '', 
            'project_start' => 'required|date_format:Y-m-d|after_or_equal:today', 
            'project_end' => 'required|date_format:Y-m-d|after_or_equal:today', 
            'project_price' => 'required|numeric',
            'project_price_specified' => '',
            'payment_full' => '', 
            'payment_specified' => '', 
            'other' => ''
        ]);

        $project = Project::findOrFail($request->project_id);
        $this->authorize('in-project', $project);

        // Try and create the contract.
        $this->manager->byUser( $request->user() )
                      ->forProject( $project )
                      ->create( $data );

        // The contract could not be created.
        if ( $this->manager->error ) {
            return response()->json(['message' => $this->manager->errorMessage], $this->manager->errorCode);
        }

        return response()->json([
            'message' => $this->manager->successMessage,
            'data' => [
                'contract' => $this->manager->contract(),
                'history' => $this->manager->history()
            ]
        ], $this->manager->successCode);
    }

}
