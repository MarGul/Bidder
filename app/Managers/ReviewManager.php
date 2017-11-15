<?php

namespace App\Managers;

use App\Review;
use App\Project;
use App\Managers\Traits\ProjectTrait;

class ReviewManager extends BaseManager
{
	use ProjectTrait;
	
	/**
	 * The review that the manager is working with.
	 * @var App\Review
	 */
	protected $review;

	/**
	 * Return the review that the manager has been working on.
	 * 
	 * @return App\Review
	 */
	public function review() { return $this->review; }

	/**
	 * Create a new review
	 * 
	 * @param  array 	$data
	 * @return boolean
	 */
	public function create($data)
	{
		if ( $this->hasError() ) return false;

		if ( !$this->allowedToReview() ) {
			$this->setError('Not auhtorized.', 403);
			return false;
		}
		
		if ( !$this->setData($data)->insert() ) return false;

		if ( !$this->markUserReviewed() ) return false;

		$this->projectHistoryManager->forProject($this->project->id)
									->add('leftReview', ['user' => $this->user->username]);

		$this->setSuccess('Successfully inserted the review into storage.', 201);

		return true;
	}

	/**
	 * Is the user trying to make a review allowed to?
	 * 
	 * @return boolean
	 */
	public function allowedToReview()
	{
		// If the project isn't completed we are not allowed to review yet.
		if ( !$this->project->completed ) return false;
		// If the user already left a review he's not allowed to leave a new one.
		$this->project->load('users');
		foreach ($this->project->users as $user) {
			if ( $user->id === $this->user->id ) {
				if ( !is_null($user->pivot->review) ) return false;
				break;
			}
		}

		return true;
	}

	/**
	 * Insert the new review into storage.
	 * 
	 * @return boolean
	 */
	protected function insert()
	{
		try {
			$this->review = Review::create([
				'user_id' => $this->data('user_id'),
				'project_id' => $this->project->id,
				'user_id_reviewer' => $this->user->id,
				'communication' => $this->data('communication'),
				'as_described' => $this->data('as_described'),
				'would_recommend' => $this->data('would_recommend'),
				'review' => $this->data('review')
			]);
		} catch (\Exception $e) {
			$this->setError('Could not insert the review into storage.', 500);
			return false;
		}

		return true;
	}

	/**
	 * Set the project user that he has left a review.
	 * 
	 * @return boolean
	 */
	protected function markUserReviewed()
	{
		try {
			$this->project->users()->updateExistingPivot($this->user->id, ['review' => $this->review->id]);
		} catch (\Exception $e) {
			$this->setError('Could not mark the user as reviewed.', 500);
			return false;
		}

		return true;
	}

}