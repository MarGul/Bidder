<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service;
use App\Managers\BidManager;

class ServiceBidController extends Controller
{
    /**
     * Class to manage bids
     * 
     * @var App\Managers\BidManager
     */
    private $manager;

    public function __construct(BidManager $manager) {
        $this->manager = $manager;
        $this->middleware('auth:api', ['only' => ['store']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Service $service
     * @return \Illuminate\Http\Response
     */
    public function index(Service $service)
    {
        // Try to get the bids
        $this->manager->forService($service)
                      ->get();

        if ( $this->manager->hasError() ) {
            return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
        }

        return response()->json([
            'message' => $this->manager->successMessage(),
            'data' => [
                'bids' => $this->manager->bids()
            ]
        ], $this->manager->successCode());
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
            'start' => 'required|date_format:Y-m-d|after_or_equal:today',
            'end' => 'required|date_format:Y-m-d|after_or_equal:today',
            'hours' => 'nullable|numeric',
            'price' => 'required|numeric'
        ]);

        $data = $request->only(['description', 'start', 'end', 'hours', 'price']);

        // Try to insert the bid.
        $this->manager->byUser($request->user())
                      ->forService($service)
                      ->create($data);

        if ( $this->manager->hasError() ) {
            return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
        }

        return response()->json([
            'message' => $this->manager->successMessage(),
            'data' => [
                'bid' => $this->manager->bid()
            ]
        ], $this->manager->successCode());
    }
}
