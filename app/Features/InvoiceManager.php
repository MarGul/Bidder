<?php

namespace App\Features;

use App\Project;

class InvoiceManager
{
	protected $vatPct = 25;

	protected $project;

	protected $subTotal;

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

		$this->store();

		$this->sendInvoice();
	}

	protected function calculateCosts()
	{
		$this->subTotal = $this->calculateSubTotal();

		$this->vat = $this->calculateVat();

		return $this;
	}

}