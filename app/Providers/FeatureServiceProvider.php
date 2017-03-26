<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Features\CommentManager;
use App\Features\ServiceManager;
use App\Features\BidManager;

class FeatureServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(CommentManager::class, function($app) {
            return new CommentManager;
        });

        $this->app->bind(ServiceManager::class, function($app) {
            return new ServiceManager;
        });

        $this->app->bind(BidManager::class, function($app) {
            return new BidManager;
        });

    }
}
