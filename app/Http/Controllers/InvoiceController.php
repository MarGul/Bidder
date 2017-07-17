<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Features\InvoiceManager;

class InvoiceController extends Controller
{
    
	/**
	 * Display the resource
	 * 
	 * @param  string 	$hash
	 * @return [type]       [description]
	 */
	public function index($hash)
	{
		return app(InvoiceManager::class)->downloadInvoice($hash);
	}

}
