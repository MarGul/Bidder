<?php

namespace App\Features;

use App\Service;
use App\Features\CommentManager;
use App\Features\MediaManager;
use App\Features\SubscriptionManager;
use App\Jobs\UploadServiceMedia;
use Carbon\Carbon;

class ServiceManager {

	/**
	 * Display a listing of the service based on filtering.
	 * 
	 * @param  string $text
	 * @param  string $categories
	 * @param  string $regions
	 * @param  string $cities
	 * @return Illuminate\Contracts\Pagination\LengthAwarePaginator
	 */
	public function filter($page, $text = '', $categories = '', $regions = '', $cities = '')
	{
		$query = Service::query();

		if ( $text ) $query = $query->where('description', 'LIKE', '%'.$text.'%');
		if ( $categories ) $query = $query->whereIn('category_id', explode(',', $categories));
		if ( $regions ) $query = $query->whereIn('region_id', explode(',', $regions));
		if ( $cities ) $query = $query->whereIn('city_id', explode(',', $cities));

		$services = $query->where('active', true)
						  ->where('bid_stop', '>', Carbon::now())
						  ->orderBy('bid_stop', 'asc')->simplePaginate(20, ['*'], 'page', $page);

		return $services;
	}

	/**
	 * Get a single service.
	 * 
	 * @param  App\Service $service
	 * @return collection
	 */
	public function get($service) {
		$service->load(['user.rating', 'bid_count', 'media', 'comments.user']);

		return $service;
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
	 * @return boolean
	 */
	public function create($user, $request) {
		$service = new Service([
			'user_id' => $user->id,
			'category_id' => $request->category,
			'region_id' => $request->region,
			'city_id' => $request->city,
			'title' => $request->title,
			'description' => $request->description,
			'start' => Carbon::createFromFormat('Y-m-d', $request->start, 'Europe/Stockholm')->toDateString(),
			'end' => Carbon::createFromFormat('Y-m-d', $request->end, 'Europe/Stockholm')->toDateString(),
			'bid_start' => Carbon::now('Europe/Stockholm'),
			'bid_stop' => Carbon::now('Europe/Stockholm')->addDays($request->bidding),
			'active' => true
		]);

		if ( !$service->save() ) {
			return false;
		}

		if ( $request->media ) {
			// Locally store the media that was uploaded.
			$files = app(MediaManager::class)->tempStore($request->media);
			// Create a job for further processing of the files and upload to AWS S3.
			dispatch(new UploadServiceMedia($files, $service));
		}

		// Send out notifications to the people that has subscribed.
		app(SubscriptionManager::class)->send($service);

		return true;
	}

}