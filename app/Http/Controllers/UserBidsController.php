<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Managers\BidManager;
use App\Bid;

class UserBidsController extends Controller
{
    /**
	 * Manager
	 * 
	 * @var App\Managers\BidManager
	 */
	private $manager;


	public function __construct(BidManager $manager) {
		$this->middleware('auth:api');
		$this->manager = $manager;
	}

	/**
	 * Display a listing of the resource.
	 * 
	 * @param  Request 	$request 
	 * @return Illuminate\Http\Response
	 */
	public function index(Request $request) {
		// Try to fetch the bids.
		$this->manager->byUser($request->user())
					  ->userBids();

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
	 * Display a resource.
	 * 
	 * @param  Request $request
	 * @param  Bid     $bid
	 * @return Illuminate\Http\Response
	 */
	public function show(Request $request, Bid $bid)
	{
		$this->authorize('my-resource', $bid);

		// Try and find the bid.
		$this->manager->forBid($bid)
					  ->show();

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

	/**
	 * Destroy a resource
	 * 
	 * @param  Request $request
	 * @param  Bid     $bid
	 * @return Illuminate\Http\Response
	 */
	public function destroy(Request $request, Bid $bid)
	{
		$this->authorize('my-resource', $bid);

		// Try to delete the bid
		$this->manager->forBid($bid)
					  ->delete();

		if ( $this->manager->hasError() ) {
            return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
        }

        return response()->json([
            'message' => $this->manager->successMessage()
        ], $this->manager->successCode());
	}

}
