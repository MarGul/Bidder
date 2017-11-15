<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;
use App\Managers\ContractManager;

class ProjectDownloadContractController extends Controller
{
    
    /**
     * Manager
     *  
     * @var App\Managers\ContractManager
     */
    protected $manager;


    public function __construct(ContractManager $manager)
    {
        $this->middleware('auth');
        $this->manager = $manager;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Project $project)
    {
        $this->authorize('in-project', $project);

        return $this->manager->forProject($project)
                             ->download();
    }
}
