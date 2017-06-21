<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class EmailVerification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * User that needs to verify email
     * 
     * @var App\User
     */
    protected $user;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($user)
    {
        $this->user = $user;
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
                    ->subject('Välkommen till Bidder!')
                    ->greeting('Hej!')
                    ->line('Först och främst så vill vi hälsa dig hjärtligt välkommen till Bidder!')
                    ->line('Innan du börjar använda tjänsten så skulle vi be dig om att verifiera din email adress.')
                    ->action('Verifiera din email', url('/email-verify/'.$this->user->email_verification_code));
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
