<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class NewBidOnMyService extends Notification implements ShouldQueue
{
    use Queueable;

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
        $channels = [];

        if ( $notifiable->wantsMailForHis('services') ) $channels[] = 'mail';

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
                    ->subject('Du har fått ett nytt bud på en av dina tjänster!')
                    ->greeting('Hej!')
                    ->line('Någon har precis lagt ett nytt bud på att få utföra din tjänst.')
                    ->line('För tjänsten: ' . $this->bid->service->title)
                    ->action('Se det nya budet', url('services/' . $this->bid->service_id . '/bids'));
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
