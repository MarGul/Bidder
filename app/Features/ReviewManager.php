<?php

namespace App\Features;

use App\Review;
use App\Project;

class ReviewManager 
{

	protected $user_id;
	protected $project_id;
	protected $project;
	protected $user_reviewer;
	protected $data;
	protected $review;

	/**
	 * Submit a review
	 * 
	 * @param  integer 	$user_id 			[The user getting reviewed]
	 * @param  integer 	$project_id 
	 * @param  integer 	$user_reviewer  	[The user that is submitting the review]
	 * @param  array 	$data      			[Data to save in the review]
	 * @return boolean
	 */
	public function submit($user_id, $project_id, $user_reviewer, $data)
	{
		$this->user_id = $user_id;
		$this->project_id = $project_id;
		$this->user_reviewer = $user_reviewer;
		$this->data = $data;		

		if ( !$this->allowedToReview() ) return false;

		if ( !$this->insertReview() ) return false;

		if ( !$this->markUserReviewed() ) return false;

		$history = app(ProjectHistoryManager::class)->forProject($this->project->id)
										 			->add('leftReview', ['user' => $this->user_reviewer->username]);

		return [
			'review' => $this->review,
			'history' => $history
		];
	}

	/**
	 * Is the user trying to make a review allowed to?
	 * 
	 * @return boolean
	 */
	protected function allowedToReview()
	{
		// We will find a project where it has a user that is matching the user trying to
		// review. This way we know the user is in the project. Also see that the review
		// column is null, meaning that the user hasn't already left a review.
		// Project also needs to be completed.
		$project = 	Project::with('users')
							->whereHas('users', function($q) {
								$q->where('user_id', $this->user_reviewer->id);
								$q->whereNull('review');
							})
							->where('completed', true)
							->findOrFail($this->project_id);

		$this->project = $project;

		return true;
	}

	/**
	 * Insert the new review into storage.
	 * 
	 * @return boolean
	 */
	protected function insertReview()
	{
		$review = Review::create([
			'user_id' => $this->user_id,
			'project_id' => $this->project_id,
			'user_id_reviewer' => $this->user_reviewer->id,
			'communication' => $this->data['communication'],
			'as_described' => $this->data['as_described'],
			'would_recommend' => $this->data['would_recommend'],
			'review' => $this->data['review']
		]);

		if ( !$review->id ) return false;

		$this->review = $review;

		return true;
	}

	/**
	 * Set the project user that he has left a review.
	 * 
	 * @return boolean
	 */
	protected function markUserReviewed()
	{
		return $this->project->users()->updateExistingPivot($this->user_reviewer->id, ['review' => $this->review->id]);
	}

}