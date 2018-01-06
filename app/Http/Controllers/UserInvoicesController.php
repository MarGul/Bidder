<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Managers\InvoiceManager;

class UserInvoicesController extends Controller
{
    
	/**
	 * Manager
	 * 
	 * @var App\Managers\InvoiceManager
	 */
	private $manager;

	public function __construct(InvoiceManager $manager) 
	{
		$this->middleware('auth:api');
		$this->manager = $manager;
	}

	/**
	 * Display a listing of the resources
	 * 
	 * @param  Request $request
	 * @return Illuminate\Http\Response
	 */
	public function index(Request $request)
	{
		// Try to get the users invoices.
		$this->manager->byUser($request->user())->get();

		if ( $this->manager->hasError() ) {
			return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
		}

		return response()->json([
			'message' => $this->manager->successMessage(),
			'data' => [
				'invoices' => $this->manager->invoices()
			]
		], $this->manager->successCode());
	}

}
