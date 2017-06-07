<?php

namespace App\Features;

use App\Subscription;

class SubscriptionManager
{

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

	public function get($user_id)
	{
		return Subscription::where('user_id', $user_id)->get();
	}

}