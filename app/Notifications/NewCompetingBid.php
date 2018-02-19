<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class NewCompetingBid extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * The new bid
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
                    ->subject('Du har ett tävlande bud.')
                    ->greeting('Hej!')
                    ->line('Någon har precis lagt ett nytt bud på en tjänst som du också har lagt ett bud på.')
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
            'image' => $this->bid->user->avatar,
            'text' => "{$this->bid->user->username} har lagt ett tävlande bud på en tjänst du också lagt ett bud på.",
            'link' => "/user/services/{$this->bid->service_id}"
        ];
    }
}
