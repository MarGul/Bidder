<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
		$this->middleware('auth:api');
		$this->manager = $manager;
	}
    
	/**
	 * Store a resource in the database
	 * 
	 * @param  Request 		$request
	 * @return Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		$this->validate($request, [
			'user_id' => 'required|exists:users',
			'project_id' => 'required|exists:project',
			'communication' => 'required|numeric',
			'as_described' => 'required|numeric',
			'would_recommend' => 'required|numeric',
			'review' => 'required'
		]);
		
		$data = $request->only(['communication', 'as_described', 'would_recommend', 'review']);

		if ( !$this->manager->submit($request->user_id, $request->project_id, $request->user(), $data) ) {
			return response()->json(['message' => 'Could not store your review.'], 500);
		}

		return response()->json(['message' => 'Successfully stored your review.'], 201);
	}

}
