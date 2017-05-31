<?php

namespace App\Features;

use App\Review;

class ReviewManager 
{

	/**
	 * Attach reviews tickets in the database between two users. 
	 * This will later on allow them to leave reviews of eachother.
	 * 
	 * @param  integer 	$user1
	 * @param  integer 	$user2
	 * @return boolean
	 */
	public function attach($user1, $user2, $project_id)
	{
		return $this->attachForUser($user1, $user2, $project_id) && $this->attachForUser($user2, $user1, $project_id) ? true : false;
	}

	/**
	 * Attach review ticket for a user.
	 * 
	 * @param  integer 	$user 		[User that's doing the reviewing]
	 * @param  integer 	$reviewed 	[User that is getting reviewed]
	 * @return boolean
	 */
	protected function attachForUser($user, $reviewed, $project_id)
	{
		$review = new Review([
			'reviewing' => $user,
			'reviewed' => $reviewed,
			'project_id' => $project_id
		]);

		return $review->save() ? true : false;
	}

	/**
	 * Submit a review
	 * 
	 * @param  integer 	$reviewing 		[The user making the review]
	 * @param  integer 	$reviewed  		[The user that is getting reviewed]
	 * @param  integer 	$project_id 
	 * @param  array 	$data      		[Data to save in the review]
	 * @return boolean
	 */
	public function submit($reviewing, $reviewed, $project_id, $data)
	{
		$review = Review::where([ 
			['reviewing', $reviewing], 
			['reviewed', $reviewed], 
			['project_id', $project_id],
			['submitted', false] 
		])->first();

		if ( !$review ) return false;

		// Mark, in the project, that the user ($reviewing) has left a review.
		if ( !app(ProjectManager::class)->hasReviewed($reviewing, $project_id) ) return false;

		return $review->update(array_merge($data, ['submitted' => true])) ? true : false;
	}

}