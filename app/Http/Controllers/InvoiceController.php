<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Managers\InvoiceManager;

class InvoiceController extends Controller
{
	/**
	 * Display the resource
	 * 
	 * @param  string 	$hash
	 * @return Illuminate\Http\Response
	 */
	public function index($hash)
	{
		return app(InvoiceManager::class)->downloadInvoice($hash);
	}

}
