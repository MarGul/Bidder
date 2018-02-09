<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class NewAcceptedBid extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * The accepted bid
     *
     * @var App\Bid
     */
    protected $bid;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($bid)
    {
        $this->queue = 'notifications';
        $this->bid = $bid;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        $channels = ['database'];

        if ( $notifiable->wantsMailForHis('bids') ) $channels[] = 'mail';

        return $channels;
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
                    ->subject('Ditt bud har blivit accepterat!')
                    ->greeting('Hej!')
                    ->line('Ett av dina bud för att få utföra en tjänst har blivit accepterat. Grattis!')
                    ->line('Vi har skapat ett projekt åt er som du hittar under "Mina Projekt"')
                    ->action('Se det accepterade budet', url('user/bids/' . $this->bid->id));
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
            'image' => $this->bid->service->user->avatar,
            'text' => "{$this->bid->service->user->username} har accepterat ditt bud.",
            'link' => "/user/bids/{$this->bid->id}"
        ];
    }
}
