<?php

namespace App\Features;

use App\Comment;


class CommentManager {

	/**
	 * Get comments for a service
	 * 
	 * @param  App\Service $service
	 * @return \Illuminate\Http\Response
	 */
	public function get($service) {
		$comments = Comment::with('user', 'replies.user')
					->where('service_id', $service->id)
					->where('parent', null)
					->get();

		return response()->json(['message' => 'Listing comments for service', 'comments' => $comments], 200);
	}

	/**
	 * Create a comment
	 * 
	 * @param  \Illuminate\Http\Request  $request
	 * @param  App\Service               $service
	 * @return \Illuminate\Http\Response
	 */
	public function create($request, $service) {
		$comment = new Comment([
			'service_id' => $service->id,
			'user_id' => $request->user()->id,
			'body' => $request->body,
			'parent' => $request->parent ?: null
		]);

		if ( !$comment->save() ) {
			return response()->json(['message' => 'Could not store the comment in the database. Please try again.'], 500);
		}

		// Pass with the user and empty replies as well.
		$comment->user = $request->user();
		$comment->replies = [];

		return response()->json(['message' => 'Created comment', 'comment' => $comment], 201);
	}

}