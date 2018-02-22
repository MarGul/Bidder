<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class UserRequestedInvoice extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;


    /**
     * The invoice that has been requested.
     * @var App\Invoice
     */
    public $invoice;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($invoice)
    {
        $this->queue = 'notifications';
        $this->invoice = $invoice;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('support@gobid.se')
                    ->subject('En användare begärde att få en faktura skickad.')
                    ->markdown('emails.userRequestedInvoice');
    }
}
