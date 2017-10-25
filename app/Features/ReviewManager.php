<?php

namespace App\Features;

use App\Review;

class ReviewManager 
{

	protected $user_id;
	protected $project_id;
	protected $user_reviewer;
	protected $data;

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
		// Mark the user that left the review tha he has.
		if ( !app(ProjectManager::class)->submittedReview($this->user_reviewer, $this->project_id) ) return false;

		return true;
	}

	protected function allowedToReview()
	{
		return true;
	}

	protected function insertReview()
	{
		$review = Review::create([
			'user_id' => $this->user_id,
			'project_id' => $this->project_id,
			'communication' => $this->data['communication'],
			'as_described' => $this->data['as_described'],
			'would_recommend' => $this->data['would_recommend'],
			'review' => $this->data['review']
		]);

		
	}

}