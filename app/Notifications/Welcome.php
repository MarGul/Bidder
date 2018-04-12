<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class Welcome extends Notification implements ShouldQueue
{
    use Queueable;


    /**
     * The user to welcome
     *
     * @var App\User
     */
    private $user;
    
    
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($user)
    {
        $this->queue = 'notifications';
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
                    ->subject('Välkommen till GoBid')
                    ->greeting('Hej ' . $this->user->username .  ' och varmt välkommen till GoBid!')
                    ->line('GoBid är en plattform där säljare och köpare av tjänster på ett enkelt sätt kan mötas.')
                    ->line('Du kommer att få ett seperat email där vi kommer att be dig att verifiera din email.')
                    ->line('På vår välkomstsida kommer du att hitta allt du behöver för att komma igång med GoBid.')
                    ->line(
                        '
                        Vi uppmanar dig att gå igenom dem 4 stegen på välkomstsidan. Vi vill gärna ha din feedback
                        på vad vi kan göra bättre. På välkomstsidan så hittar du information om hur du kan kontakta oss.
                        '
                    )
                    ->action('Till välkomstsidan', url('/welcome'));
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
