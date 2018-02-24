<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class Feedback extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * The Feedback
     * @var App\Feedback
     */
    public $feedback;
    
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($feedback)
    {
        $this->queue = 'notifications';
        $this->feedback = $feedback;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('support@gobid.se')
                    ->subject('Ny feedback från GoBid')
                    ->markdown('emails.feedback');
    }
}
