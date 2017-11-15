<?php

namespace App\Managers;

use App\Subscription;
use App\User;
use App\Notifications\NewSubscriptionService;

class SubscriptionManager extends BaseManager
{

	/**
	 * The subscription that the manager is working on.
	 * @var App\Subscription
	 */
	protected $subscription;
	/**
	 * The subscriptions that the manager is working on.
	 * @var collection
	 */
	protected $subscriptions;

	/**
	 * Set the subscription that the manager is working on.
	 * 
	 * @param  App\Subscription 	$subscription
	 * @return SubscriptionManager
	 */
	public function forSubscription($subscription)
	{
		if ( !$subscription instanceof \App\Subscription ) {
			$this->setError('Subscription must be an instance of subscription.', 500);
		} else {
			$this->subscription = $subscription;
		}

		return $this;
	}

	/**
	 * Return the subscription that the manager is working on.
	 * 
	 * @return App\Subscription
	 */
	public function subscription() { return $this->subscription; }
	/**
	 * Return the subscriptions that the manager is working on.
	 * 
	 * @return Collection
	 */
	public function subscriptions() { return $this->subscriptions; }

	
	/**
	 * Get a users subscriptions.
	 * 
	 * @return boolean
	 */
	public function get()
	{
		if ( $this->hasError() ) return false;

		try {
			$this->subscriptions = Subscription::where('user_id', $this->user->id)
												->get();
		} catch (\Exception $e) {
			$this->setError('Could not fetch the users subscriptions.', 500);
			return false;
		}

		$this->setSuccess('Listing the users subscriptions.', 200);

		return true;
	}

	/**
	 * Create a new subscription.
	 * 
	 * @param  array 	$data
	 * @return boolean
	 */
	public function create($data)
	{
		if ( $this->hasError() ) return false;

		if ( !$this->setData($data)->insert() ) return false;

		$this->setSuccess('Successfully inserted the subscription into storage.', 201);

		return true;
	}

	/**
	 * Delete a subscription
	 * 
	 * @return boolean
	 */
	public function delete()
	{
		if ( $this->hasError() ) return false;

		try {
			$this->subscription->delete();
		} catch (\Exception $e) {
			$this->setError('Could not delete the subscription from storage.', 500);
			return false;
		}

		$this->setSuccess('Successfully deleted the subscription from storage.', 200);

		return true;
	}

	/**
	 * Send out notifications for a newly created service.
	 * 
	 * @param  App\Service 	$service
	 * @return void
	 */
	public function send($service)
	{
		$subscribers = $this->subscriptionUsers($service);

		\Notification::send($subscribers, new NewSubscriptionService($service));
	}

	/**
	 * Insert the subscription into storage.
	 * 
	 * @return boolean
	 */
	protected function insert()
	{
		try {
			$this->subscription =  Subscription::create([
				'user_id' => $this->user->id,
				'category_id' => $this->data('category_id'),
				'region_id' => $this->data('region_id'),
				'city_id' => $this->data('city_id'),
			]);
		} catch (\Exception $e) {
			$this->setError('Could not insert the subscription into storage.', 500);
			return false;
		}

		return true;
	}

	/**
	 * Based on a service, get the users that has subscribed to being notified to this service.
	 * 
	 * @param  App\Service 	$service
	 * @return Eloquent Collection
	 */
	protected function subscriptionUsers($service)
	{
		$categorySubs = Subscription::where('category_id', $service->category_id)->get();
		$subscribers = collect();

		foreach ($categorySubs as $subscription) {
			// If we already have the user_id in our collection we don't have to care about this subscription.
			if ( $subscribers->contains($subscription->user_id) ) {
				continue;
			}

			// The user has subscribed to everything in this category
			if ( is_null($subscription->region_id) && is_null($subscription->city_id) ) {
				$subscribers->push($subscription->user_id);
			}

			// If the user has subscribed only to the region or city of the service.
			if ( $subscription->region_id === $service->region_id || $subscription->city_id === $service->city_id ) {
				$subscribers->push($subscription->user_id);
			}
		}

		// Get the user models for the subscribers.
		$users = User::whereIn('id', $subscribers->toArray())->get();

		return $users;
	}

}