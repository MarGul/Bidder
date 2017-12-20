<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class SendInvoice extends Notification implements ShouldQueue
{
    use Queueable;

    protected $invoice;


    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($invoice)
    {
        $this->invoice = $invoice;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('Faktura #'. ($this->invoice->id))
                    ->greeting('Hej!')
                    ->line('Tack så mycket för att du har låtit oss förmedla en tjänst åt dig!')
                    ->line('Du kan betala online och ladda ner fakturan nedan.')
                    ->action('Betala fakturan', url('user/invoices/' . ($this->invoice->id + 1000000)))
                    ->line('Vi hoppas att har märkt hur enkelt det kan vara och skaffa mer jobb.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
