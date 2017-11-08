<?php

namespace App\Managers;

use App\Bid;
use App\Service;
use App\Events\NewBid;
use App\Events\RemoveService;
use App\Jobs\NotificationsForNewBid;
use Carbon\Carbon;

class BidManager extends BaseManager
{

	protected $service;
	protected $bid;
	protected $bids;

	/**
	 * Set the service that the manager is working with.
	 * 
	 * @param  App\Service 	$service
	 * @return BidManager
	 */
	public function forService($service)
	{
		if ( !$service instanceof \App\Service ) {
			$this->setError('Service must be an instance of service.', 500);
		} else {
			$this->service = $service;
		}

		return $this;
	}

	/**
	 * Set the bid that the manager is working with.
	 * 
	 * @param  App\Bid 	$bid
	 * @return BidManager
	 */
	public function forBid($bid)
	{
		if ( !$bid instanceof \App\Bid ) {
			$this->setError('Bid must be an instance of bid.', 500);
		} else {
			$this->bid = $bid;
		}

		return $this;
	}

	/**
	 * Return the bid that the manager has been working on.
	 * 
	 * @return App\Bid
	 */
	public function bid() { return $this->bid; }
	
	/**
	 * Return the bids that the manager has been working on.
	 * 
	 * @return Collection
	 */
	public function bids() { return $this->bids; }
	/**
	 * Does the service have a bid already accepted?
	 * 
	 * @return boolean
	 */
	public function bidAccepted() 
	{
		return (boolean)Bid::where('service_id', $this->service->id)
							->where('accepted', true)
							->count();
	}


	/**
	 * Get the bids for a service.
	 * 
	 * @return boolean
	 */
	public function get()
	{
		if ( $this->hasError() ) return false;

		try {
			$this->bids = Bid::with('user.rating')
							  ->where('service_id', $this->service->id)
							  ->orderBy('created_at', 'desc')
							  ->get();
		} catch (\Exception $e) {
			$this->setError('Could not fetch bids for the service.', 500);
			return false;
		}

		$this->setSuccess('Listing bids for the service.', 200);

		return true;
	}

	/**
	 * Create a new bid.
	 * 
	 * @param  array 	$data
	 * @return boolean
	 */
	public function create($data)
	{
		if ( $this->hasError() ) return false;

		if ( $this->biddingTimeEnded() ) return false;

		if ( !$this->setData($data)->insert() ) return false;

		// Broadcast that a new bid has been created
		event(new NewBid($this->bid));

		// Dispatch a job for this new bid that will send out the appropriate notifications.
		dispatch(new NotificationsForNewBid($this->bid));

		$this->setSuccess('Successfully stored your bid in storage.', 201);

		return true;
	}

	/**
	 * Accept a bid for a service.
	 * 
	 * @return boolean
	 */
	public function accept() 
	{
		if ( $this->hasError() ) return false;

		if ( !$this->acceptBid() ) return false;

		if ( !$this->deactivateService() ) return false;

		// Broadcast that the bidding for this service has now stopped
		event(new RemoveService($this->service->id));
		// Create a project between the users.
		app(\App\Features\ProjectManager::class)->create($this->service, $this->bid);

		$this->setSuccess('Bid was accepted and a project created.', 201);
		
		return true;
	}

	/**
	 * Display one bid.
	 * 
	 * @return boolean
	 */
	public function show()
	{
		if ( $this->hasError() ) return false;

		try {
			$this->bid->load('service');
		} catch (\Exception $e) {
			$this->setError('Could not show the bid.', 500);
			return false;
		}
		
		$this->setSuccess('Displaying a single bid.', 200);

		return true;
	}

	/**
	 * Remove a bid.
	 * 
	 * @return boolean
	 */
	public function delete()
	{
		if ( $this->hasError() ) return false;

		try {
			$this->bid->delete();
		} catch (\Exception $e) {
			$this->setError('Could not delete your bid from storage.', 500);
			return false;
		}

		$this->setSuccess('Successfully removed the bid from storage.', 200);

		return true;
	}

	/**
	 * Get the bids for a user.
	 * 
	 * @return boolean
	 */
	public function userBids()
	{
		if ( $this->hasError() ) return false;

		try {
			$this->bids = Bid::with('service')
							 ->where('user_id', $this->user->id)
							 ->orderBy('created_at', 'desc')
							 ->get();
		} catch (\Exception $e) {
			$this->setError('Could not fetch bids for the user.', 500);
			return false;
		}

		$this->setSuccess('Listing bids for the user.', 200);

		return true;
	}

	/**
	 * Insert the new bid into storage.
	 * 
	 * @return boolean
	 */
	protected function insert()
	{
		try {
			$this->bid = Bid::create([
				'service_id' => $this->service->id,
				'user_id' => $this->user->id,
				'description' => $this->data('description'),
				'start' => Carbon::createFromFormat('Y-m-d', $this->data('start'), 'Europe/Stockholm')->toDateString(),
				'end' => Carbon::createFromFormat('Y-m-d', $this->data('end'), 'Europe/Stockholm')->toDateString(),
				'hours' => $this->data('hours'),
				'price' => (float)$this->data('price')
			]);
		} catch (\Exception $e) {
			$this->setError('Could not stor the bid in storage.', 500);
			return false;
		}

		return true;
	}

	/**
	 * Flag a bid as accepted in storage.
	 * 
	 * @return boolean
	 */
	protected function acceptBid()
	{
		try {
			$this->bid->update(['accepted' => true]);
		} catch (\Exception $e) {
			$this->setError('Could not accpt the bid.', 500);
			return false;
		}

		return true;
	}

	/**
	 * Mark a service as not active anymore (maybe in serviceManager?)
	 * 
	 * @return boolean
	 */
	protected function deactivateService()
	{
		try {
			$this->service->update(['active' => false]);
		} catch (\Exception $e) {
			$this->setError('Could not deactivate the service.', 500);
			return false;
		}

		return true;
	}

	/**
	 * Has the time for bidding stopped?
	 * 
	 * @return boolean
	 */
	protected function biddingTimeEnded()
	{
		$bidStop = Carbon::createFromFormat('Y-m-d H:i:s', $this->service->bid_stop, 'Europe/Stockholm');
        
        if ( Carbon::now('Europe/Stockholm') > $bidStop ) {
        	$this->setError('The bidding period for this service has ended.', 403);
        	return true;
        }

        return false;
	}

}