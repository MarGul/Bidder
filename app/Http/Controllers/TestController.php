<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;
use App\Invoice;
use App\Features\InvoiceManager;

class TestController extends Controller
{
    
	public function index()
	{
		//$invoice = \App\Invoice::find(4);
		return app(InvoiceManager::class)->downloadInvoice('KWylEkRLu9F7yVApitXpwF2KEyBz6f92vidNMWgNEhBB6');
		//$data = app(\App\Features\InvoiceManager::class)->invoicePDFData($invoice);

		//return view('pdf.invoice', $data);
	}

}
