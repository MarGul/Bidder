<?php

namespace App\Managers\Traits;

trait InvoiceTrait
{
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
     * Set the invoice that the manager should be working with.
     *
     * @param App\Invoice   $invoice
     * @return App\Managers\Traits\InvoiceTrait
     */
    public function forInvoice($invoice)
    {
        if ( !$invoice instanceof \App\Invoice ) {
			$this->setError('Invoice must be an instance of invoice.', 500);
		} else {
			$this->invoice = $invoice;
		}

		return $this;
    }
}