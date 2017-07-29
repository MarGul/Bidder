<?php

namespace App\Features;

use App\Comment;
use App\Events\CommentCreated;
use Auth;


class CommentManager {

	/**
	 * Get comments for a service
	 * 
	 * @param  App\Service $service
	 * @return \Illuminate\Http\Response
	 */
	public function all($service) {
		$comments = Comment::with('user', 'replies.user')
					->where('service_id', $service->id)
					->where('parent', null)
					->get();

		return response()->json(['message' => 'Listing comments for service', 'comments' => $comments], 200);
	}

	/**
	 * Create a comment
	 * 
	 * @param  array  			$data
	 * @param  App\Service      $service
	 * @return boolean
	 */
	public function add($data, $service) {
		$comment = new Comment([
			'service_id' => $service->id,
			'user_id' => Auth::user()->id,
			'body' => $data['body'],
			'parent' => $data['parent'] ?: null
		]);

		if ( !$comment->save() ) { return false; }

		// Broadcast an event that a comment was created
		event(new CommentCreated($comment));

		// Pass with the user and empty replies as well.
		$comment->user = Auth::user();
		$comment->replies = [];

		return $comment;
	}

}