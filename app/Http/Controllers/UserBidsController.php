<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Features\BidManager;

class UserBidsController extends Controller
{
    /**
	 * Manager
	 * 
	 * @var App\Features\BidManager
	 */
	private $manager;


	public function __construct(BidManager $manager) {
		$this->middleware('auth:api');
		$this->manager = $manager;
	}

	/**
	 * Display a listing of the resource.
	 * 
	 * @param  Request 	$request 
	 * @return Illuminate\Http\Response
	 */
	public function index(Request $request) {
		return $this->manager->byUser($request->user());
	}

}
