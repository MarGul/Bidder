<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Broadcast;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Broadcast::routes();

        // Authorize if the user can listen into the project message channel.
        Broadcast::channel('project.{project}.messages', function ($user, \App\Project $project) {
            return in_array($user->id, [$project->bid_user, $project->service_user]);
        });
    }
}
