<?php

namespace App\Features;

use App\Project;
use App\Invoice;
use Carbon\Carbon;

class InvoiceManager
{
	protected $feePct = 5;

	protected $vatPct = 25;

	protected $dueDays = 30;

	protected $project;

	protected $total;

	protected $vat;

	/**
	 * Create an invoice for a project.
	 * 
	 * @param  Project $project 
	 * @return boolean
	 */
	public function create(Project $project)
	{
		$this->project = $project;
		
		$this->calculateCosts();

		if ( !$invoice = $this->store() ) return false;

		dd($this->sendInvoice($invoice));
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
	 * Store the new invoice in the database.
	 * 
	 * @return [type] [description]
	 */
	protected function store()
	{
		$invoice = new Invoice([
			'user_id' => $this->project->bid_user,
			'project_id' => $this->project->id,
			'total' => $this->total,
			'vat' => $this->vat,
			'due' => Carbon::now('Europe/Stockholm')->addDays($this->dueDays)
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