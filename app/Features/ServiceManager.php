<?php

namespace App\Features;

use App\Service;
use App\Features\CommentManager;

class ServiceManager {

	/**
	 * Get a single service.
	 * 
	 * @param  App\Service $service
	 * @return \Illuminate\Http\Response
	 */
	public function get($service) {
		$s = Service::where('id', $service->id)->first();
		$s->load(['user', 'category', 'region', 'city', 'bids', 'comments' => function($query) {
			$query->with(['user', 'replies.user'])->where('parent', null);
		}]);

		return response()->json(['message' => 'Service details', 'service' => $s], 200);
	}

}