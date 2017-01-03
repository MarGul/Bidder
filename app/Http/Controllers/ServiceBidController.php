<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Bid;
use App\Service;
use Carbon\Carbon;

class ServiceBidController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  int  $service_id
     * @return \Illuminate\Http\Response
     */
    public function index(Service $service)
    {
        if ( !$bids = Bid::getBids(['service_id' => $service->id]) ) {
            return response()->json(['message' => 'Error trying to list bids.'], 500);
        }

        return response()->json([
            'message' => 'Listing bids for a service.',
            'bids' => $bids
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  App\Service               $service
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Service $service)
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
            'hours_service' => (!empty($request->input('hours_service'))) ? (float)$request->input('hours_service') : null,
            'price' => (float)$request->input('price')
        ];

        if ( !$bid = Bid::createBid($service, $data) ) {
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
     * @param  App\Service  $service
     * @param  App\Bid      $bid_id
     * @return \Illuminate\Http\Response
     */
    public function show(Service $service, Bid $bid)
    {
        // Maybe implement in the future
        return response()->json(['Not implemented at the moment.'], 403);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  App\Service  $service
     * @param  App\Bid      $bid_id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Service $service, Bid $bid)
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
            'hours_service' => (!empty($request->input('hours_service'))) ? (float)$request->input('hours_service') : null,
            'price' => (float)$request->input('price')
        ];

        if ( !$bid = Bid::updateBid($service, $bid, $data) ) {
            return response()->json(['Could not update bid.'], 500);
        }

        return response()->json([
            'message' => 'Successfully updated the bid.',
            'bid' => $bid
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  App\Service  $service
     * @param  App\Bi       $bid_id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Service $service, Bid $bid)
    {
        if ( !$bid = Bid::deleteBid($bid) ) {
            return response()->json(['Could not delete bid.'], 500);
        }

        return response()->json([
            'message' => 'Successfully deleted bid.',
            'bid' => $bid
        ], 200);
    }
}