<?php

namespace App\Features;

use App\Bid;
use Carbon\Carbon;

class BidManager {

	/**
	 * Get bids for a service
	 * 
	 * @param  App\Service $service
	 * @return \Illuminate\Http\Response
	 */
	public function all($service) {
		$bids = Bid::with('user')->where('service_id', $service->id)->get();

		return response()->json([
			'message' => 'Displaying bids for serviceId: ' . $service->id,
			'bids' => $bids
		], 200);
	}

	/**
	 * Create a bid
	 * 
	 * @param  \App\Http\Requests\StoreBid  $request
	 * @param  App\Service               	$service
	 * @return \Illuminate\Http\Response
	 */
	public function create($request, $service) {
		$bid = new Bid([
			'service_id' => $service->id,
			'user_id' => $request->user()->id,
			'description' => $request->description,
			'start' => Carbon::createFromFormat('Y-m-d', $request->start, 'Europe/Stockholm'),
			'end' => Carbon::createFromFormat('Y-m-d', $request->end, 'Europe/Stockholm'),
			'hours' => $request->hours,
			'price' => (float)$request->price,
			'status' => 'active'
		]);

		if ( !$bid->save() ) {
			return response()->json(['message' => 'Could not store the bid in the database.'], 500);
		}

		return response()->json(['message' => 'Bid was successfully created.', 'bid' => $bid], 201);
	}

}