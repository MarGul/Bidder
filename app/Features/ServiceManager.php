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
		$s->load('user', 'category', 'region', 'city', 'comments.user', 'bids');

		// Get the comments into a hierachy with replies.
		CommentManager::parseComments($s->comments);

		return response()->json(['message' => 'Service details', 'service' => $s], 200);
	}

}