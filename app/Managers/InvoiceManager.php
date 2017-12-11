<?php

namespace App\Managers;

use App\Invoice;
use App\Managers\Traits\ProjectTrait;
use Carbon\Carbon;
use Notification;
use App\Notifications\SendInvoice;
use PDF;

class InvoiceManager extends BaseManager
{
	use ProjectTrait;

	/**
	 * The percentage fee that the application takes.
	 * @var integer
	 */
	protected $feePct = 5;
	/**
	 * The value added tax percentage.
	 * @var integer
	 */
	protected $vatPct = 25;
	/**
	 * Amount of days since the invoice was sent until it's due.
	 * @var integer
	 */
	protected $dueDays = 30;	
	/**
	 * The invoice that the manager is working with.
	 * @var App\Invoice
	 */
	protected $invoice;
	/**
	 * The invoices that the manager has been working with.
	 * @var Collection
	 */
	protected $invoices;
	/**
	 * Data structure for holding the costs for the invoice the manager is creating.
	 * @var array
	 */
	protected $invoiceCosts;


	/**
	 * Return the invoice that the manager has been working on.
	 * @return App\Invoice
	 */
	public function invoice() { return $this->invoice; }
	/**
	 * Return the invoices that the manager has been working on.
	 * @return Collection
	 */
	public function invoices() { return $this->invoices; }

	/**
	 * Get a users invoices.
	 * 
	 * @return Boolean
	 */
	public function get()
	{
		if ( $this->hasError() ) return false;

		try {
			$this->invoices = $this->user->invoices;
		} catch (\Exception $e) {
			$this->setError('Could not fetch the users invoices.', 500);
			return false;
		}

		$this->setSuccess('Listing the users invoices.', 200);

		return true;
	}

	/**
	 * Create a new invoice.
	 * 
	 * @param  array  $data
	 * @return boolean
	 */
	public function create($data = [])
	{
		if ( $this->hasError() ) return false;

		if ( !$this->setData($data)->calculateCosts()->insert() ) return false;

		$this->sendInvoice();

		$this->setSuccess('Successfully insert eh invoice into storage.', 201);

		return true;
	}

	/**
	 * Calculate the costs for the Invoice.
	 * 
	 * @return App\Managers\InvoiceManager
	 */
	protected function calculateCosts()
	{
		$this->invoiceCosts = [
			'total' => $this->calculateTotal(),
			'vat' => $this->calculateVat()
		];

		return $this;
	}

	/**
	 * Calculate the total cost for the invoice.
	 * 
	 * @return float
	 */
	protected function calculateTotal()
	{
		return (float) ($this->project->service_price * $this->feePct) / 100;
	}

	/**
	 * Calculate the value added tax for the invoice.
	 * 
	 * @return float
	 */
	protected function calculateVat()
	{
		return (float) ($this->calculateTotal() * $this->vatPct) / 100;
	}

	/**
	 * Insert the new invoice into storage.
	 * 
	 * @return Boolean
	 */
	protected function insert()
	{
		try {
			$this->invoice = Invoice::create([
				'user_id' => $this->project->users()->where('role', 'bid')->first()->id,
				'project_id' => $this->project->id,
				'hash' => str_random(45),
				'total' => $this->invoiceCosts['total'],
				'vat' => $this->invoiceCosts['vat'],
				'due' => Carbon::now('Europe/Stockholm')->addDays($this->dueDays),
				'notes' => $this->data('notes')
			]);
		} catch (\Exception $e) {
			dd($e);
			$this->setError('Could not insert the invoice into storage.', 500);
			return false;
		}

		return true;
	}

	/**
	 * Generate a PDF for the invoice
	 * 
	 * @param  string 		$hash
	 * @return boolean
	 */
	public function downloadInvoice($hash)
	{
		$this->invoice = Invoice::where('hash', $hash)->firstOrFail();
		
		return PDF::loadView('pdf.invoice', $this->invoicePDFData())->download("Faktura_" . $this->invoice->id . '.pdf');
	}

	/**
	 * Fetch the data needed for the invoice.
	 * 
	 * @return array
	 */
	protected function invoicePDFData()
	{
		return [
			'title' => 'Faktura #' . $this->invoice->id,
			'invoice_id' => $this->invoice->id,
			'created' => Carbon::parse($this->invoice->created_at)->formatLocalized('%d %B, %Y'),
			'due' => Carbon::parse($this->invoice->due)->formatLocalized('%d %B, %Y'),
			'user' => $this->invoice->user,
			'project' => $this->invoice->project,
			'notes' => $this->invoice->notes,
			'sub_total' => number_format((float)($this->invoice->total - $this->invoice->vat), 2, ',', '.'),
			'vat' => number_format($this->invoice->vat, 2, ',', '.'),
			'total' => number_format($this->invoice->total, 2, ',', '.')
		];
	}

	/**
	 * Send out the invoice to the user.
	 * 
	 * @return boolean
	 */
	protected function sendInvoice()
	{		
		Notification::send($this->invoice->user, new SendInvoice($this->invoice));
	}

}