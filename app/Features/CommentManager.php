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
		$comments = Comment::where('service_id', $service->id)->get();
		$comments->load('user');

		self::parseComments($comments);

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

		return response()->json(['message' => 'Created comment', 'comment' => $comment], 201);
	}

	/**
	 * Parse comments into hierachy with replies.
	 * This manipulates the original collection passed in.
	 * 
	 * @param  Collection $comments 
	 * @return void
	 */
	public static function parseComments($comments) {
		foreach ($comments as $comment) {
			$comment->replies = [];
			foreach ($comments as $key => $c) {
				if ( $c->parent === $comment->id ) {
					$comment->replies = array_merge($comment->replies, [$c]);
					$comments->forget($key);
				}
			}
		}
	}

}