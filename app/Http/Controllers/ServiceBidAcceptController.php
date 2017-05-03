<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service;
use App\Bid;
use App\Features\BidManager;

class ServiceBidAcceptController extends Controller
{
    
	/**
     * Class to manage bids
     * 
     * @var App\Features\BidManager
     */
	private $manager;

	public function __construct(BidManager $manager) {
		$this->middleware('auth:api');
		$this->manager = $manager;
	}

	/**
	 * Create an acceptance for a bid
	 * 
	 * @param  App\Service 	$service
	 * @param  App\Bid     	$bid
	 * @param  Request 		$request
	 * @return \Illuminate\Http\Response
	 */
	public function create(Service $service, Bid $bid, Request $request) {
		// Policy to make sure user can accept bids for this service.
		$this->authorize('accept-bid', $service);

		if ( !$this->manager->accept($bid) ) {
			return response()->json(['message' => 'Could not accept the bid'], 500);
		}

		return response()->json(['message' => 'Bid was accepted and a project created.'], 201);
	}

}
