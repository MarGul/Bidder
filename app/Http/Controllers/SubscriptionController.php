<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Features\SubscriptionManager;

class SubscriptionController extends Controller
{

    /**
     * Manager
     * 
     * @var App\Features\SubscriptionManager
     */
    private $manager;

    public function __construct(SubscriptionManager $manager) 
    {
        $this->middleware('auth:api');
        $this->manager = $manager;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ( !$this->manager->add($request->user()->id, $request->only('category_id', 'region_id', 'city_id')) ) {
            return response()->json(['message' => 'Could not add the subscription'], 500);
        }

        return response()->json(['message' => 'Successfully added your subscription'], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
