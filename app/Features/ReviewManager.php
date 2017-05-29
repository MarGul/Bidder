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
		if ( !$this->forUser($user1, $user2) ) return false;

		return $this->forUser($user2, $user1) ? true : false;
	}

	/**
	 * Attach review ticket for a user.
	 * 
	 * @param  integer 	$reviewing
	 * @param  integer 	$reviewed
	 * @return boolean
	 */
	protected function attachForUser($reviewing, $reviewed)
	{
		$review = new Review([
			'reviewing' => $reviewing,
			'reviewed' => $reviewed,
		]);

		return $review->save() ? true : false;
	}

}