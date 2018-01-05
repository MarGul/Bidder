<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Contract;
use App\Managers\ContractManager;

class ContractsAcceptController extends Controller
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
     * Update the resource in storage
     *
     * @param   Contract    $contract
     * @param   Request     $request
     * @return  Illuminate\Http\Response
     */
    public function update(Contract $contract, Request $request)
    {
        // Auhtorize that the user is able to accept the contract.
        $project = Project::findOrFail($contract->project_id);
        $this->authorize('in-project', $project);

        // Try to accept the contract
        $this->manager->byUser($request->user())
                      ->forProject($project)
                      ->forContract($contract)
                      ->accept();

        if ( $this->manager->hasError() ) {
            return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
        }

        return response()->json([
            'message' => $this->manager->successMessage(),
            'data' => [

            ]
        ], $this->manager->successCode());
    }

}
