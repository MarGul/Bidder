<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Features\ServiceManager;

class UserServicesController extends Controller
{
    
	/**
	 * Manager
	 * 
	 * @var App\Features\ServiceManager
	 */
	private $manager;


	public function __construct(ServiceManager $manager) {
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
