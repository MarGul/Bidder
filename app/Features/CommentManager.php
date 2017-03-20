<?php

namespace App\Features;

use App\Comment;

class CommentManager {

	public function get($service) {
		$comments = Comment::where('service_id', $service->id)->get();

		return response()->json(['message' => 'Listing comments for service', 'comments' => $comments], 200);
	}

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

		return response()->json(['message' => 'Created comment', 'comment' => $comment], 201);
	}

}