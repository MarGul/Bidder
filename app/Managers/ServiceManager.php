<?php

namespace App\Managers;

use App\Service;
use App\Events\NewService;
use Carbon\Carbon;
use App\Managers\Traits\ServiceTrait;

class ServiceManager extends BaseManager 
{
	use ServiceTrait;

	/**
	 * Display a listing of the service based on filtering.
	 * 
	 * @param  string $text
	 * @param  string $categories
	 * @param  string $regions
	 * @param  string $cities
	 * @return boolean
	 */
	public function filter($page, $text = '', $categories = [], $regions = [], $cities = [])
	{
		$query = Service::query();
		$query->with('bid_count', 'comment_count');

		if ( $text ) {
			$query = $query->where(function($q) use ($text) {
				$q->where('description', 'LIKE', '%'.$text.'%')->orWhere('title', 'LIKE', '%'.$text.'%');
				
			});	
		}
		if ( !empty($categories) ) $query = $query->whereIn('category_id', $categories);
		if ( !empty($regions) ) $query = $query->whereIn('region_id', $regions);
		if ( !empty($cities) ) $query = $query->whereIn('city_id', $cities);

		try {
			$this->services = $query->where('active', true)
									->where('bid_stop', '>', Carbon::now())
									->orderBy('bid_stop', 'asc')
									->simplePaginate(20, ['*'], 'page', $page);
		} catch (\Exception $e) {
			$this->setError('Could not fetch services.', 500);
			return false;
		}
		
		$this->setSuccess('Listing all services.', 200);

		return true;
	}

	/**
	 * Get the services for a specified user.
	 * 
	 * @return collection
	 */
	public function get()
	{
		try {
			$this->services = Service::where('user_id', $this->user->id)
									 ->orderBy('created_at', 'desc')
									 ->get();	
		} catch (\Exception $e) {
			$this->setError('Could not fetch the users servies.', 500);
			return false;
		}

		$this->setSuccess('Displaying the users servies.', 200);

		return $this->services;
	}

	/**
	 * Show a service for a user.
	 * 
	 * @return App\Service
	 */
	public function show()
	{
		$this->setSuccess('Listing a single service', 200);

		try {
			$this->service->load('bids.user', 'media');
		} catch (\Exception $e) {
			$this->setError('Could not load the media for the service.', 500);
		}

		return $this->service;
	}

	/**
	 * Find one service for the front end.
	 * 
	 * @return App\Service
	 */
	public function find()
	{
		try {
			$this->service->load(['user.rating', 'bids.user', 'media', 'comments.user']);
		} catch (\Exception $e) {
			$this->setError('Could not find the service.', 500);			
		}

		$this->setSuccess('Displaying a single service.', 200);

		return $this->service;
	}

	/**
	 * Create a service
	 * 
	 * @param  array  	$data 
	 * @return boolean
	 */
	public function create($data) {
		if ( $this->hasError() || $this->usersEmailNotVerified() ) return false;

		if ( !$this->setData($data)->insert() ) return false;

		if ( $this->dataExists('media') ) {
			// Add media if there were any.
			app(MediaManager::class)->forService($this->service)
									 ->addMedia($this->data('media'));
		}

		// Broadcast the creation of the new service for everyone listening.
		event(new NewService($this->service));
		// Send out notifications to the people that has subscribed.
		app(SubscriptionManager::class)->send($this->service);

		$this->setSuccess('Successfully stored the service.', 201);

		return true;
	}

	/**
	 * Update a service
	 *
	 * @param  App\Service 	$service
	 * @param  array 		$data
	 * @return boolean
	 */
	public function update($data)
	{
		if ( $this->hasError() ) return false;

		if ( !$this->setData($data)->edit() ) return false;

		if ( $this->dataExists('media') || $this->dataExists('deletedMedia')) {
			// Add media if there were any.
			app(MediaManager::class)->forService($this->service)
									 ->editMedia($this->data('media') ?? [], $this->data('deletedMedia') ?? []);	
		}

		// Load in the edited media for the service.
		$this->service->load(['media', 'bids']);

		$this->setSuccess('Successfully updated the service.', 200);

		return true;
	}

	/**
	 * Remove a service from storage.
	 * 
	 * @return boolean
	 */
	public function delete()
	{
		if ( $this->hasError() ) return false;

		try {
			app(MediaManager::class)->forService($this->service)
									->deleteAllMedia();

			$this->service->delete();
		} catch (\Exception $e) {
			$this->setError('Could not delete the service.', 500);
			return false;
		}

		$this->setSuccess('Successfully removed the service from storage.', 200);

		return true;
	}

	/**
	 * Insert a service into storage.
	 * 
	 * @return boolean
	 */
	protected function insert()
	{
		try {
			$this->service = Service::create(array_merge(
				[
					'user_id' => $this->user->id,
					'bid_start' => Carbon::now('Europe/Stockholm'),
					'bid_stop' => Carbon::now('Europe/Stockholm')->addDays($this->data('bidding')),
					'active' => true
				],
				$this->dataToArray() 
			));
		} catch (\Exception $e) {
			$this->setError('Could not store the service in storage.', 500);
			return false;
		}

		return true;
	}

	/**
	 * Edit a service in storage.
	 * 
	 * @return boolean
	 */
	protected function edit()
	{
		try {
			$this->service->update($this->dataToArray());
		} catch (\Exception $e) {
			$this->setError('Could not update the service.', 500);
			return false;
		}

		return true;
	}

	/**
	 * Get the common data for insert and edit into an array.
	 * 
	 * @return array
	 */
	protected function dataToArray()
	{
		return [
			'category_id' => $this->data('category_id'),
			'region_id' => $this->data('region_id'),
			'city_id' => $this->data('city_id'),
			'title' => $this->data('title'),
			'description' => $this->data('description'),
			'start' => Carbon::createFromFormat('Y-m-d', $this->data('start'), 'Europe/Stockholm')->toDateString(),
			'end' => Carbon::createFromFormat('Y-m-d', $this->data('end'), 'Europe/Stockholm')->toDateString(),
		];
	}
}