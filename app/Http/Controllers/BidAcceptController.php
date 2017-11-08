<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Bid;
use App\Service;
use App\Managers\BidManager;

class BidAcceptController extends Controller
{
    
	/**
     * Class to manage bids
     * 
     * @var App\Managers\BidManager
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

		// Try to accept the bid
		$this->manager->forService($service)
					  ->forBid($bid)
					  ->accept();

		if ( $this->manager->hasError() ) {
			return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
		}

		return response()->json([
			'message' => $this->manager->successMessage(),
		], $this->manager->successCode());
	}

}
