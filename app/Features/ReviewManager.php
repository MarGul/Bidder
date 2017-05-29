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
	public function attach($user1, $user2)
	{
		return $this->attachForUser($user1, $user2) && $this->attachForUser($user2, $user1) ? true : false;
	}

	/**
	 * Attach review ticket for a user.
	 * 
	 * @param  integer 	$reviewing 	[User that's doing the reviewing]
	 * @param  integer 	$reviewed 	[User that is getting reviewed]
	 * @return boolean
	 */
	protected function attachForUser($reviewing, $reviewed)
	{
		$review = new Review([
			'reviewing' => $reviewing,
			'reviewed' => $reviewed
		]);

		return $review->save() ? true : false;
	}

	/**
	 * Submit a review
	 * 
	 * @param  integer 	$reviewing [The user making the review]
	 * @param  integer 	$reviewed  [The user that is getting reviewed]
	 * @param  array 	$data      [Data to save in the review]
	 * @return boolean
	 */
	public function submit($reviewing, $reviewed, $data)
	{
		$review = Review::where([ ['reviewing', $reviewing], ['reviewed', $reviewed], ['submitted', false] ])->first();

		if ( !$review ) return false;

		return $review->update(array_merge($data, ['submitted' => true])) ? true : false;
	}

}