<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Features\BidManager;
use App\Bid;

class UserBidsController extends Controller
{
    /**
	 * Manager
	 * 
	 * @var App\Features\BidManager
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
		return response()->json([
			'message' => 'Displaying a listing of users bids',
			'bids' => $this->manager->byUser($request->user())
		], 200);
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
		$this->authorize('my-resource', $request->user());

		return response()->json([
			'message' => 'Displaying a bid.', 
			'bid' => $this->manager->show($bid)
		], 200);
	}

}
