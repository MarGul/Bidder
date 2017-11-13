<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Managers\InvoiceManager;

class UserInvoiceController extends Controller
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
		return response()->json([
			'message' => 'Displaying users invoices.', 
			'invoices' =>  $this->manager->byUser($request->user())
		], 200);
	}

}
