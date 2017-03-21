<?php

namespace App\Features;

use App\Service;
use App\Features\CommentManager;

class ServiceManager {

	public function get($service) {
		$s = Service::with('user', 'category', 'region', 'city', 'comments.user', 'bids')
					->where('id', $service->id)
					->first();

		// Get the comments into a hierachy with replies.
		CommentManager::parseComments($s->comments);

		return response()->json(['message' => 'Service details', 'service' => $s], 200);
	}

}