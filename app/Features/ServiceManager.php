<?php

namespace App\Features;

use App\Service;
use App\Features\CommentManager;
use Carbon\Carbon;

class ServiceManager {

	/**
	 * Get a single service.
	 * 
	 * @param  App\Service $service
	 * @return \Illuminate\Http\Response
	 */
	public function get($service) {
		$s = Service::where('id', $service->id)->first();
		$s->load(['user', 'category', 'region', 'city', 'bids.user', 'comments' => function($query) {
			$query->with(['user', 'replies.user'])->where('parent', null);
		}]);

		return response()->json(['message' => 'Service details', 'service' => $s], 200);
	}

	/**
	 * Get services for a user
	 * 
	 * @param  App\User 	$user
	 * @return \Illuminate\Http\Response
	 */
	public function byUser($user) {
		$services = Service::where('user_id', $user->id)
							->orderBy('created_at', 'desc')
							->get();

		return response()->json(['message' => 'Displaying services for a user', 'services' => $services], 200);
	}

	/**
	 * Create a service
	 * 
	 * @param  \App\Http\Requests\StoreService 	$request 
	 * @return \Illuminate\Http\Response
	 */
	public function create($request) {
		$service = new Service([
			'user_id' => $request->user()->id,
			'category_id' => $request->category,
			'region_id' => $request->region,
			'city_id' => $request->city,
			'title' => $request->title,
			'description' => $request->description,
			'start' => Carbon::createFromFormat('Y-m-d', $request->start, 'Europe/Stockholm')->toDateString(),
			'end' => Carbon::createFromFormat('Y-m-d', $request->end, 'Europe/Stockholm')->toDateString(),
			'bid_start' => Carbon::now('Europe/Stockholm'),
			'bid_stop' => Carbon::now('Europe/Stockholm')->addDays($request->bidding),
			'status' => 'active'
		]);

		if ( !$service->save() ) {
			return response()->json(['message' => 'Could not store the service in the database.'], 500);
		}

		return response()->json(['message' => 'Service was successfully created.', 'service' => $service], 201);
	}

}