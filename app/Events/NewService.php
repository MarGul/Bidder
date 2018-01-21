<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class NewService implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * The queue that the broadcast will be added on.
     * @var string
     */
    public $broadcastQueue = 'real-time-events';
    /**
     * The new service created
     * @var App\Service;
     */
    public $service;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($service)
    {
        $this->service = $service;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('services');
    }

    /**
     * The data to broadcast
     * 
     * @return array
     */
    public function broadcastWith()
    {
        $this->service->load('bid_count', 'comment_count');

        return ['service' => $this->service];
    }
}
