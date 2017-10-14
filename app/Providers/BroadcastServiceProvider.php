<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Gate;

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
            return Gate::allows('in-project', $project);
        });
    }
}
