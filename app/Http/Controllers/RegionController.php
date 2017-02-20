<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Region;

class RegionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $regions = Region::with('cities')->get();

        Region::parseRegions($regions);

        return response()->json([
            'message' => 'Listing all regions.',
            'regions' => $regions
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  Integer|String  $region
     * @return \Illuminate\Http\Response
     */
    public function show($identifier)
    {
        // If integer look for region with that ID. Otherwise look for region with slug of $identifier
        if ( is_numeric($identifier) ) {
            $region = Region::with('cities')->findOrFail((int)$identifier);
        } else {
            $region = Region::with('cities')->where('slug', $identifier)->firstOrFail();
        }

        Region::parseRegion($region);

        return response()->json([
            'message' => 'Viewing region data',
            'region' => $region
        ], 200);
    }
}
