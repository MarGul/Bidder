<?php

namespace App\Managers;

use App\Comment;
use App\Events\CommentCreated;


class CommentManager extends BaseManager
{
	/**
	 * The service that the manager is working with.
	 * @var App\Service
	 */
	protected $service;
	/**
	 * The comment that the manager is working with.
	 * @var App\Comment
	 */
	protected $comment;
	/**
	 * The comments that the manager is working with.
	 * @var Collection
	 */
	protected $comments;


	/**
	 * Set the service that the manager is working on.
	 * 
	 * @param  App\Service 	$service
	 * @return CommentManager
	 */
	public function forService($service)
	{
		if ( !$service instanceof \App\Service ) {
			$this->setError('Service must be an instance of service.', 500);
		} else {
			$this->service = $service;
		}

		return $this;
	}

	/**
	 * Return the comment that the manager has gotten.
	 * 
	 * @return App\Comment
	 */
	public function comment() { return $this->comment; }
	
	/**
	 * Return the comments that the manager has gotten.
	 * 
	 * @return Collection
	 */
	public function comments() { return $this->comments; }

	/**
	 * Get the comments for a service.
	 * 
	 * @return boolean
	 */
	public function get()
	{
		try {
			$this->comments = Comment::with('user')
									  ->where('service_id', $this->service->id)
									  ->get();
		} catch (\Exception $e) {
			$this->setError('Could not fetch comments for the service.', 500);
			return false;
		}

		$this->setSuccess('Listing comments for the service.', 200);

		return true;
	}

	/**
	 * Create a new comment.
	 * 
	 * @param  array 	$data
	 * @return boolean
	 */
	public function create($data)
	{
		if ( $this->hasError() ) return false;

		if ( !$this->setData($data)->insert() ) return false;

		// Load in the user as well.
		$this->comment->load('user');

		// Broadcast an event that a comment was created
		event(new CommentCreated($this->comment));

		$this->setSuccess('Successfully inserted the comment into storage.', 201);

		return true;
	}

	/**
	 * Insert the comment into storage.
	 * 
	 * @return boolean
	 */
	protected function insert()
	{
		try {
			$this->comment = Comment::create([
				'service_id' => $this->service->id,
				'user_id' => $this->user->id,
				'body' => $this->data('body')
			]);
		} catch (\Exception $e) {
			$this->setError('Could not insert the commment into storage.', 500);
			return false;
		}

		return true;
	}
}