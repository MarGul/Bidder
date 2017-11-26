<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Managers\RegionManager;


class RegionController extends Controller
{
    
    /**
     * Manager
     * 
     * @var App\Managers\RegionManager
     */
    private $manager;
    
    public function __construct(RegionManager $manager) {
        $this->manager = $manager;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Try to get the regions with their cities
        $this->manager->active()->withCities();
        
        if ( $this->manager->hasError() ) {
            return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
        }

        return response()->json([
            'message' => $this->manager->successMessage(),
            'data' => [
                'regions' => $this->manager->regions()
            ]
        ], $this->manager->successCode());
    }
}
