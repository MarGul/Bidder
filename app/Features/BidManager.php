<?php

namespace App\Features;

use App\Bid;
use App\Service;
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
	 * Get bids for a user
	 * 
	 * @param  App\User 	$user
	 * @return \Illuminate\Http\Response
	 */
	public function byUser($user) {
		$bids = Bid::where('user_id', $user->id)
					->orderBy('created_at', 'desc')
					->get();

		return response()->json(['message' => 'Displaying bids for a user', 'bids' => $bids], 200);
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
			'start' => Carbon::createFromFormat('Y-m-d', $request->start, 'Europe/Stockholm')->toDateString(),
			'end' => Carbon::createFromFormat('Y-m-d', $request->end, 'Europe/Stockholm')->toDateString(),
			'hours' => $request->hours,
			'price' => (float)$request->price,
			'accepted' => false
		]);

		if ( !$bid->save() ) {
			return response()->json(['message' => 'Could not store the bid in the database.'], 500);
		}

		return response()->json(['message' => 'Bid was successfully created.', 'bid' => $bid], 201);
	}

	/**
	 * Accept a bid for a service.
	 * 
	 * @param  App\Bid $bid
	 * @return boolean
	 */
	public function accept($bid) {
		if ( !$bid->update(['accepted' => true]) ) {
			return false;
		}

		// Create a contract between the two parties.
		$data = [
			'service_user' => Service::find($bid->service_id)->user_id,
			'bid_user' => $bid->user_id,
			'finish' => Carbon::createFromFormat('Y-m-d', $bid->end, 'Europe/Stockholm')->toDateString(),
			'active' => true
		];

		if ( !app(ContractManager::class)->create($data) ) {
			return false;
		}

		return true;
	}

}