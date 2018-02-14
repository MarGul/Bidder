<?php

namespace App\Managers;

use App\Bid;
use App\Service;
use App\Events\NewBid;
use App\Events\RemoveService;
use Carbon\Carbon;
use App\Managers\Traits\ServiceTrait;
use App\Managers\Traits\BidTrait;
use Notification;
use App\Notifications\ProjectCreated;
use App\Notifications\NewBidOnMyService;
use App\Notifications\NewAcceptedBid;
use App\Notifications\NewDeclinedBid;
use App\Notifications\NewCompetingBid;

class BidManager extends BaseManager
{
	use ServiceTrait, BidTrait;


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
		if ( $this->hasError() || $this->usersEmailNotVerified() || $this->biddingTimeEnded() ) return false;

		if ( !$this->setData($data)->insert() ) return false;

		// Broadcast that a new bid has been created
		event(new NewBid($this->bid));

		// Send out notification about new bid on the users service.
		Notification::send($this->service->user, new NewBidOnMyService($this->bid));

		// Send out notification about a competing bid.
		Notification::send($this->usersWhoHasLeftBid(), new NewCompetingBid($this->bid));

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
		$projectManager = app(ProjectManager::class);
		$projectManager->forService($this->service)
					   ->forBid($this->bid)
					   ->create();

		if ( $projectManager->hasError() ) {
			$this->setError('Could not insert a project into storage.', 500);
			return false;
		}

		// Send out the notification that your bid has been accepted and a project created.
		Notification::send($this->bid->user, new ProjectCreated($projectManager->project()));

		// Send out the notification of an accepted bid. (Should combine this with project created)
		Notification::send($this->bid->user, new NewAcceptedBid($this->bid));

		// Send out the notification of a declined bid.
		Notification::send($this->usersWhoHasDeclinedBid(), new NewDeclinedBid($this->service));

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

			$this->bid->load('user');
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
			// Mark the bid that it has been accepted
			$this->bid->update(['accepted' => true]);
			// Mark the service that it has an accepted bid.
			$this->service->update(['has_accepted_bid' => true]);
		} catch (\Exception $e) {
			$this->setError('Could not accpt the bid.', 500);
			return false;
		}

		return true;
	}

	/**
	 * Get all of the users who has a declined bid on the service.
	 *
	 * @return collection
	 */
	protected function usersWhoHasDeclinedBid() 
	{
		$bids = $this->service->bids()->where('accepted', false)->with('user')->get();
	
		$users = collect([]);
		foreach ( $bids as $bid ) {
			// Put all of the users if we don't already have them in there and that the user doesn't have
			// the accepted bid. 
			if ( !$users->where('id', $bid->user->id)->count() && $bid->user->id !== $this->bid->user->id ) {
				$users->push($bid->user);
			}
		}

		return $users;
	}

	/**
	 * Get all of the users that currently have a bid on the service that the manager is handling.
	 *
	 * @return collection
	 */
	protected function usersWhoHasLeftBid()
	{
		$bids = $this->service->bids()->with('user')->get();

		$users = collect([]);
		foreach ( $bids as $bid ) {
			if ( !$users->where('id', $bid->user->id)->count() && $bid->user->id !== $this->user->id ) {
				$users->push($bid->user);
			}
		}

		return $users;
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