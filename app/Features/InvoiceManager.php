<?php

namespace App\Features;

use App\Project;
use App\Invoice;
use Carbon\Carbon;
use PDF;

class InvoiceManager
{
	/**
	 * The percentage fee that the application takes.
	 * 
	 * @var integer
	 */
	protected $feePct = 5;

	/**
	 * The value added tax percentage.
	 * 
	 * @var integer
	 */
	protected $vatPct = 25;

	/**
	 * Amount of days since the invoice was sent until it's due.
	 * 
	 * @var integer
	 */
	protected $dueDays = 30;

	/**
	 * The project instance to create an invoice for.
	 * 
	 * @var App\Project
	 */
	protected $project;

	/**
	 * Any notes for the invoice.
	 * 
	 * @var string
	 */
	protected $notes;

	/**
	 * The total value for the invoice.
	 * 
	 * @var float
	 */
	protected $total;

	/**
	 * The value added tax amount for the invoice.
	 * 
	 * @var float
	 */
	protected $vat;

	/**
	 * Temp path to store the invoice.
	 * 
	 * @var string
	 */
	protected $pdfTempDir;

	
	public function __construct()
	{
		$this->pdfTempDir = storage_path('app/tmp/');
	}

	/**
	 * Create an invoice for a project.
	 * 
	 * @param  Project $project 
	 * @param  string  $notes
	 * @return boolean
	 */
	public function create(Project $project, $notes = '')
	{
		$this->project = $project;
		$this->notes = $notes;
		
		$this->calculateCosts();

		if ( !$invoice = $this->store() ) return false;

		return $this->sendInvoice($invoice);
	}

	/**
	 * Calculate the costs for the Invoice.
	 * 
	 * @return App\Features\InvoiceManager
	 */
	protected function calculateCosts()
	{
		$this->total = $this->calculateTotal();

		$this->vat = $this->calculateVat();

		return $this;
	}

	/**
	 * Calculate the total cost for the invoice.
	 * 
	 * @return float
	 */
	protected function calculateTotal()
	{
		return (float)($this->project->price * $this->feePct) / 100;
	}

	/**
	 * Calculate the value added tax for the invoice.
	 * 
	 * @return float
	 */
	protected function calculateVat()
	{
		return is_null($this->total) ? (float)($this->calculateTotal() * $this->vatPct) / 100 : (float)($this->total * $this->vatPct) / 100;
	}

	/**
	 * Generate a PDF for the invoice
	 * 
	 * @param  string 		$hash
	 * @return boolean
	 */
	public function downloadInvoice($hash)
	{
		$invoice = Invoice::where('hash', $hash)->firstOrFail();

		$data = $this->invoicePDFData($invoice);
		
		return PDF::loadView('pdf.invoice', $data)->download($invoice->hash . '.pdf');
	}

	public function invoicePDFData($invoice)
	{
		return [
			'title' => 'Faktura #' . ($invoice->id + 1000),
			'invoice_id' => $invoice->id + 1000,
			'created' => Carbon::parse($invoice->created_at)->formatLocalized('%d %B, %Y'),
			'due' => Carbon::parse($invoice->due)->formatLocalized('%d %B, %Y'),
			'user' => $invoice->user,
			'project' => $invoice->project,
			'notes' => $invoice->notes,
			'sub_total' => number_format((float)($invoice->total - $invoice->vat), 2, ',', '.'),
			'vat' => number_format($invoice->vat, 2, ',', '.'),
			'total' => number_format($invoice->total, 2, ',', '.')
		];
	}

	/**
	 * Store the new invoice in the database.
	 * 
	 * @return App\Invoice
	 */
	protected function store()
	{
		$invoice = new Invoice([
			'user_id' => $this->project->bid_user,
			'project_id' => $this->project->id,
			'hash' => str_random(45),
			'total' => $this->total,
			'vat' => $this->vat,
			'due' => Carbon::now('Europe/Stockholm')->addDays($this->dueDays),
			'notes' => $this->notes
		]);

		return $invoice->save() ? $invoice : false;
	}

	/**
	 * Send out the invoice to the user.
	 * 
	 * @param  App\Invoice 	$invoice
	 * @return boolean
	 */
	protected function sendInvoice($invoice)
	{
		return "Sending invoice";
	}

}