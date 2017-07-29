<?php

namespace App\Features;

use App\Bid;
use App\Service;
use App\Events\NewBid;
use Auth;
use Carbon\Carbon;

class BidManager {

	/**
	 * Get bids for a service
	 * 
	 * @param  App\Service $service
	 * @return collection
	 */
	public function all($service) {
		$bids = Bid::with('user.rating')
					->where('service_id', $service->id)
					->orderBy('created_at', 'desc')
					->get();

		return $bids;
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
	 * @param  array  			$data
	 * @param  App\Service      $service
	 * @return boolean|App\Bid
	 */
	public function add($data, $service) {
		$bid = new Bid([
			'service_id' => $service->id,
			'user_id' => Auth::user()->id,
			'description' => $data['description'],
			'start' => Carbon::createFromFormat('Y-m-d', $data['start'], 'Europe/Stockholm')->toDateString(),
			'end' => Carbon::createFromFormat('Y-m-d', $data['end'], 'Europe/Stockholm')->toDateString(),
			'hours' => $data['hours'],
			'price' => (float)$data['price'],
			'accepted' => false
		]);

		if ( !$bid->save() ) { return false; }

		// Broadcast that a new bid has been created
		event(new NewBid($bid));

		return $bid;
	}

	/**
	 * Accept a bid for a service.
	 * 
	 * @param  App\Bid $bid
	 * @return boolean
	 */
	public function accept($bid) {
		// Flag the bid as accepted.
		if ( !$bid->update(['accepted' => true]) ) {
			return false;
		}

		// Update the status of the service. When a bid is accepted a flag is set and the service is not longer active.
		$service = Service::find($bid->service_id);
		if ( !$service->update(['bid_accepted' => true, 'active' => false]) ) {
			return false;
		}

		// Create a project between the two parties.
		$data = [
			'service_user' => $service->user_id,
			'bid_user' => $bid->user_id,
			'finish' => Carbon::createFromFormat('Y-m-d', $bid->end, 'Europe/Stockholm')->toDateString(),
			'price' => $bid->price
		];

		return app(ProjectManager::class)->create($data) ? true : false;
	}

}