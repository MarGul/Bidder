<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Bid;
use Carbon\Carbon;

class ServiceBidController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  int  $service_id
     * @return \Illuminate\Http\Response
     */
    public function index($service_id)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int                       $service_id
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $service_id)
    {
        $this->validate($request, [
            'description' => 'required',
            'start_service' => 'required|date_format:YmdHie',
            'end_service' => 'required|date_format:YmdHie',
            'hours_service' => 'numeric',
            'price' => 'required|numeric'
        ]);

        $data = [
            'description' => $request->input('description'),
            'start_service' => Carbon::createFromFormat('YmdHie', $request->input('start_service')),
            'end_service' => Carbon::createFromFormat('YmdHie', $request->input('end_service')),
            'hours_service' => (float)$request->input('hours_service'),
            'price' => (float)$request->input('price')
        ];

        if ( !$bid = Bid::createBid($service_id, $data) ) {
            return response()->json(['Could not create bid.'], 500);
        }

        return response()->json([
            'message' => 'Successfully created the bid.',
            'bid' => $bid
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $service_id
     * @param  int  $bid_id
     * @return \Illuminate\Http\Response
     */
    public function show($service_id, $bid_id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $service_id
     * @param  int  $bid_id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $service_id, $bid_id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $service_id
     * @param  int  $bid_id
     * @return \Illuminate\Http\Response
     */
    public function destroy($service_id, $bid_id)
    {
        //
    }
}
