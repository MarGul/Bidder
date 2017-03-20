<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Features\CommentManager;

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
    }
}
