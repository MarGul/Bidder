<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Managers\ContractManager;
use App\Project;
use App\Contract;

class ContractsController extends Controller
{

    /**
     * Manager
     * 
     * @var App\Managers\ContractManager
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

        // Fixed for 5.5
        $data = $request->only([
            'client_name','client_identity','contractor_name','contractor_identity','project_description','contractor_dissuasion', 
            'project_start','project_end','project_price','project_price_specified','payment_full','payment_specified','other'
        ]);

        // Try and create the contract.
        $this->manager->byUser( $request->user() )
                      ->forProject( $project )
                      ->create( $data );

        // The contract could not be created.
        if ( $this->manager->hasError() ) {
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

    /**
     * Update the resource in storage.
     * 
     * @param  Request  $request
     * @return Illuminate\Http\Response
     */
    public function update(Request $request, Contract $contract)
    {
        $this->validate($request, [
            'client_name' => 'required',
            'client_identity' => 'required',
            'contractor_name' => 'required', 
            'contractor_identity' => 'required', 
            'project_description' => 'required',
            'contractor_dissuasion' => '', 
            'project_start' => 'required|date_format:Y-m-d', 
            'project_end' => 'required|date_format:Y-m-d|after_or_equal:today', 
            'project_price' => 'required|numeric',
            'project_price_specified' => '',
            'payment_full' => '', 
            'payment_specified' => '', 
            'other' => ''
        ]);

        $project = Project::findOrFail($contract->project_id);
        $this->authorize('in-project', $project);

        // Fixed for 5.5
        $data = $request->only([
            'client_name','client_identity','contractor_name','contractor_identity','project_description','contractor_dissuasion', 
            'project_start','project_end','project_price','project_price_specified','payment_full','payment_specified','other'
        ]);

        // Try and update the resource
        $this->manager->byUser( $request->user() )
                      ->forContract( $contract )
                      ->update( $data );

        // The contract could not be updated.
        if ( $this->manager->hasError() ) {
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
