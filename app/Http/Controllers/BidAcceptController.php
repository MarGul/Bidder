<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Bid;
use App\Service;
use App\Features\BidManager;

class BidAcceptController extends Controller
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
	 * @param  App\Bid     	$bid
	 * @param  Request 		$request
	 * @return \Illuminate\Http\Response
	 */
	public function create(Bid $bid, Request $request) {
		$service = Service::findOrFail($bid->service_id);
		// Policy to make sure user can accept bids for this service.
		$this->authorize('my-resource', $service);

		if ( !$this->manager->accept($bid) ) {
			return response()->json(['message' => 'Could not accept the bid'], 500);
		}

		return response()->json(['message' => 'Bid was accepted and a project created.'], 201);
	}

}
