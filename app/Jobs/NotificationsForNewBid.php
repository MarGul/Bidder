<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Features\NotificationSettingsManager;

class NotificationsForNewBid implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The new bid we are sending out notifications for
     * 
     * @var App\Bid;
     */
    public $bid;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($bid)
    {
        $this->bid = $bid;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $notificationsManager = app(NotificationSettingsManager::class);

        $notificationsManager->BidOnMyService($this->bid);

        $notificationsManager->forCompetingBid($this->bid);
    }
}
