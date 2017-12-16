<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class AcceptedProject implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * The queue that the broadcast will be added on.
     *
     * @var string
     */
    public $broadcastQueue = 'real-time-events';
    
    protected $project;
    protected $userAcceptedId;
    protected $history;
    
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($project, $userAcceptedId, $history)
    {
        $this->project = $project;
        $this->userAcceptedId = $userAcceptedId;
        $this->history = $history;

        $this->dontBroadcastToCurrentUser();
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('project.'.$this->project->id);
    }

    /**
     * The data to broadcast
     * 
     * @return array
     */
    public function broadcastWith()
    {
        return [
            'started' => $this->project->started,
            'userAcceptedId' => $this->userAcceptedId,
            'history' => $this->history
        ];
    }
}
