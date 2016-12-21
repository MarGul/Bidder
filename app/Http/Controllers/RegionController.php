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
        $regions = Region::all();

        foreach ($regions as $region) {
            $region->view_region = [
                'href' => 'api/v1/regions/' . $region->id,
                'method' => 'GET'
            ];
        }

        return response()->json([
            'message' => 'Listing all regions.',
            'regions' => $regions
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $region = Region::findOrFail((int)$id);

        $region->view_regions = [
            'href' => 'api/v1/regions',
            'method' => 'GET'
        ];

        return response()->json([
            'message' => 'Viewing region data',
            'region' => $region
        ], 200);
    }
}
