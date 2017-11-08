<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Managers\ReviewManager;
use App\Project;

class ReviewsController extends Controller
{

	/**
	 * Manager
	 * 
	 * @var App\Managers\ReviewManager
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
			'user_id' => 'required|exists:users,id',
			'project_id' => 'required|exists:projects,id',
			'communication' => 'required|numeric',
			'as_described' => 'required|numeric',
			'would_recommend' => 'required|numeric',
			'review' => 'required'
		]);

		$project = Project::findOrFail($request->project_id);

		$this->authorize('in-project', $project);

		$data = $request->only(['user_id', 'communication', 'as_described', 'would_recommend', 'review']);
		
		// Try to create the review.
		$this->manager->byUser($request->user())
					  ->forProject($project)
					  ->create($data);

		if ( $this->manager->hasError() ) {
			return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
		}

		return response()->json([
			'message' => $this->manager->successMessage(),
			'data' => [
				'review' => $this->manager->review(),
				'history' => $this->manager->history()
			]
		], $this->manager->successCode());
	}

}
