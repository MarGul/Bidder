<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreReview;
use App\Features\ReviewManager;

class UserReviewsController extends Controller
{

	/**
	 * Manager
	 * 
	 * @var App\Features\ReviewManager
	 */
	private $manager;

	public function __construct(ReviewManager $manager) {
		//$this->middleware('auth:api');
		$this->manager = $manager;
	}
    
	/**
	 * Store a resource in the database
	 * 
	 * @param  StoreReview 	$request
	 * @param  integer    	$reviewed
	 * @return Illuminate\Http\Response
	 */
	public function store(StoreReview $request, $reviewed)
	{
		$data = $request->only(['communication', 'as_described', 'would_recommend', 'review']);

		if ( !$this->manager->submit(1, $reviewed, $data) ) {
			return response()->json(['message' => 'Could not store your review.'], 500);
		}

		return response()->json(['message' => 'Successfully stored your review.'], 201);
	}

}
