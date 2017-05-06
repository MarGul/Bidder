<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreBid;
use App\Bid;
use App\Service;
use App\Features\BidManager;

class ServiceBidController extends Controller
{
    /**
     * Class to manage bids
     * 
     * @var App\Features\BidManager
     */
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
        $bids = $this->manager->all($service);

        return response()->json([
            'message' => 'Displaying bids for serviceId: ' . $service->id,
            'bids' => $bids,
            'meta' => [
                'bid_accepted' => $service->bid_accepted
            ]
        ], 200);
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
        return $this->manager->get($bid);
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
        return $this->manager->update($request, $bid);
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
        return $this->manager->delete($bid);
    }
}
