<?php

namespace App\Features;

use App\Bid;
use App\Service;
use App\Events\NewBid;
use App\Events\RemoveService;
use App\Jobs\NotificationsForNewBid;
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
	public function byUser($user) 
	{
		$bids = Bid::where('user_id', $user->id)
					->orderBy('created_at', 'desc')
					->get();

		return $bids;
	}

	/**
	 * Display one bid.
	 * 
	 * @param  App\Bid 	$bid
	 * @return App\Bid;
	 */
	public function show($bid)
	{
		$bid->load('service');

		return $bid;
	}

	/**
	 * Create a bid
	 * 
	 * @param  array  			$data
	 * @param  App\Service      $service
	 * @return boolean|App\Bid
	 */
	public function add($data, $service) 
	{
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

		// Dispatch a job for this new bid that will send out the appropriate notifications.
		dispatch(new NotificationsForNewBid($bid));

		return $bid;
	}

	/**
	 * Remove a bid.
	 * 
	 * @param  App\Bid 	$bid
	 * @return boolean
	 */
	public function destroy($bid)
	{
		return $bid->delete();
	}

	/**
	 * Accept a bid for a service.
	 * 
	 * @param  App\Bid $bid
	 * @return boolean
	 */
	public function accept($bid) 
	{
		// Flag the bid as accepted.
		if ( !$bid->update(['accepted' => true]) ) return false;

		// Set the service as not active anymore.
		$service = Service::find($bid->service_id);
		if ( !$service->update(['active' => false]) ) return false;

		// Broadcast that the bidding for this service has now stopped
		event(new RemoveService($service->id));

		return app(ProjectManager::class)->create($service, $bid) ? true : false;
	}

}