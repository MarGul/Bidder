<?php

namespace App\Features;

use App\Subscription;
use App\User;
use App\Notifications\NewSubscriptionService;

class SubscriptionManager
{

	/**
	 * Get a users subscriptions.
	 * 
	 * @param  integer 	$user_id
	 * @return collection
	 */
	public function byUser($user_id)
	{
		return Subscription::where('user_id', $user_id)->get();
	}

	/**
	 * Add a new subscription for a user.
	 * 
	 * @param integer 	$user_id
	 * @param array 	$data
	 */
	public function add($user_id, $data)
	{
		$subscription = new Subscription([
			'user_id' => $user_id,
			'category_id' => $data['category_id'],
			'region_id' => $data['region_id'] ?? null,
			'city_id' => $data['city_id'] ?? null,
		]);

		return $subscription->save() ? $subscription : false;
	}

	/**
	 * Delete a subscription
	 * 
	 * @param  integer 	$subscription_id
	 * @return boolean
	 */
	public function delete($subscription_id)
	{
		return Subscription::where('id', $subscription_id)->first()->delete() ? true : false;
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