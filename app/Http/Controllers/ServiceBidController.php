<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreBid;
use App\Bid;
use App\Service;
use App\Features\BidManager;

class ServiceBidController extends Controller
{
    private $manager;

    public function __construct(BidManager $manager) {
        $this->middleware('auth:api', ['only' => ['store', 'update', 'destroy']]);
        $this->manager = $manager;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  int  $service_id
     * @return \Illuminate\Http\Response
     */
    public function index(Service $service)
    {
        return $this->manager->get($service);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  App\Service               $service
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBid $request, Service $service)
    {
        return $this->manager->create($request, $service);
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
        $user = AuthHelp::authorize($bid);
        if ( isset($user['error']) ) return $user['response'];

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

        $bid = Bid::updateBid($service, $bid, $data);
        if ( isset($bid['error']) ) return $bid['response'];

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
        $user = AuthHelp::authorize($bid);
        if ( isset($user['error']) ) return $user['response'];

        if ( !$bid = Bid::deleteBid($bid) ) {
            return response()->json(['Could not delete bid.'], 500);
        }

        return response()->json([
            'message' => 'Successfully deleted bid.',
            'bid' => $bid
        ], 200);
    }
}
