<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class NewDeclinedBid extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * The service for the declined bid
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
        $this->queue = 'notifications';
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
                    ->subject('Ditt bud blev ej accepterat!')
                    ->greeting('Hej!')
                    ->line('Ett av dina bud för att få utföra en tjänst blev ej accepterat.')
                    ->line('Ett annat bud blev accepterat. Bättre lycka nästa gång!')
                    ->line('Det nekade budet var för tjänsten med titel:')
                    ->line($this->service->title);
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
            'image' => $this->service->user->avatar,
            'text' => "{$this->service->user->username} accepterade ett annat bud än ditt.",
            'link' => "/user/bids"
        ];
    }
}
