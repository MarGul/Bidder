<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class NewCommentOnMyService extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * The new comment
     *
     * @var App\Comment
     */
    public $comment;
    
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($comment)
    {
        $this->queue = 'notifications';
        $this->comment = $comment;
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
                    ->subject('Du har fått en ny kommentar på en av dina tjänster!')
                    ->greeting('Hej!')
                    ->line('Någon har precis skapat en kommentar på en av dina tjänster.')
                    ->line('För tjänsten: ' . $this->comment->service->title)
                    ->action('Se den nya kommentaren', url('services/' . $this->comment->service_id));
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
            'image' => $this->comment->user->avatar,
            'text' => "{$this->comment->user->username} har lagt en kommentar på en av dina tjänster",
            'link' => "/services/{$this->comment->service_id}"
        ];
    }
}
