<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class CancelledProject implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * The queue that the broadcast will be added on.
     *
     * @var string
     */
    public $broadcastQueue = 'real-time-events';
    
    protected $project;
    protected $userCancelledId;
    protected $history;
    
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($project, $userCancelledId, $history)
    {
        $this->project = $project;
        $this->userCancelledId = $userCancelledId;
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
            'userCancelledId' => $this->userCancelledId,
            'history' => $this->history
        ];
    }
}
