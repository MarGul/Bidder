<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Managers\PaymentManager;
use App\Invoice;

class PaymentInvoiceController extends Controller
{
    
    /**
	 * Manager
	 * 
	 * @var App\Managers\PaymentManager
	 */
	private $manager;


	public function __construct(PaymentManager $manager) {
		$this->middleware('auth:api');
		$this->manager = $manager;
    }
    
    public function store(Request $request)
    {
        $data = $this->validate($request, [
            'invoice' => 'required|numeric',
            'notes' => ''
        ]);

        // Is it my invoice that I'm trying to pay?
        $invoice = Invoice::findOrFail($data['invoice']);
        $this->authorize('my-resource', $invoice);

        // Try to complete the payment
        $this->manager->byUser($request->user())
                      ->forInvoice($invoice)
                      ->payWithInvoice($data['notes']);

        if ( $this->manager->hasError() ) {
            return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
        }

        return response()->json([
            'message' => $this->manager->successMessage(),
            'data' => [
                'payment' => $this->manager->payment()
            ]
        ], $this->manager->successCode());
    }

}
