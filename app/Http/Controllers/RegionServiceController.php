<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service;

class RegionServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($region_id)
    {
        if ( !$services = Service::getServices(['region_id' => $region_id]) ) {
            return response()->json(['message' => 'Could not list services based on region.'], 500);
        }

        return response()->json([
            'message' => 'Listing services based on region',
            'services' => $services
        ], 200);
    }

}
