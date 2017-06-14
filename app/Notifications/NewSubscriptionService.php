<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class NewSubscriptionService extends Notification implements ShouldQueue
{
    use Queueable;

    
    /**
     * The service that we will notifify about
     * 
     * @var App\Service
     */
    protected $service;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($service)
    {
        $this->service = $service;
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
                    ->subject('En ny tjänst som passar dig har lagts ut!')
                    ->greeting('Hej!')
                    ->line('Det har lagts ut en ny tjänst som passar dig. Klicka på länken nedan för att gå till tjänsten och lägg ett bud.')
                    ->line('Tänk på att det bara kostar dig något ifall du skulle vinna budningen så du har inget att förlora!')
                    ->action('Se tjänsten', url('/services/'.$this->service->id))
                    ->line('Tack så mycket för att du använder Bidder.');
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
