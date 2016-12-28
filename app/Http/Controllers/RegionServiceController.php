<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service;
use App\Region;

class RegionServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  App\Region   $region
     * @return \Illuminate\Http\Response
     */
    public function index(Region $region)
    {
        if ( !$services = Service::getServices(['region_id' => $region->id, 'status' => 'active']) ) {
            return response()->json(['message' => 'Could not list services based on region.'], 500);
        }

        return response()->json([
            'message' => 'Listing services based on region',
            'services' => $services
        ], 200);
    }

}
