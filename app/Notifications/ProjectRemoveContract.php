<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\BroadcastMessage;

class ProjectRemoveContract extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * The project that has a notification.
     * @var App\Project
     */
    protected $project;
    /**
     * The project history
     * @var array
     */
    protected $history;
    /**
     * The users that should be set to not have accepted to project.
     * @var array
     */
    protected $usersNotAccepted;
    
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($project, $history, $usersNotAccepted)
    {
        $this->queue = 'notifications';
        $this->project = $project;
        $this->history = $history;
        $this->usersNotAccepted = $usersNotAccepted;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['broadcast'];
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
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the broadcastable representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return BroadcastMessage
     */
    public function toBroadcast()
    {
        return (new BroadcastMessage([
            'data' => [
                'project' => $this->project,
                'history' => $this->history,
                'usersNotAccepted' => $this->usersNotAccepted
            ]
        ]))->onQueue('real-time-events');
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
