<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Features\InvoiceManager;

class UserInvoiceController extends Controller
{
    
	/**
	 * Manager
	 * 
	 * @var App\Features\InvoiceManager
	 */
	private $manager;

	public function __construct(InvoiceManager $manager) 
	{
		$this->middleware('auth:api');
		$this->manager = $manager;
	}

	public function index(Request $request)
	{
		return response()->json([
			'message' => 'Displaying users invoices.', 
			'invoices' =>  $this->manager->byUser($request->user())
		], 200);
	}

}
