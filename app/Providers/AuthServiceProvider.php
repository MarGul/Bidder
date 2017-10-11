<?php

namespace App\Providers;

use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();

        // Is the resource the authenticated users?
        Gate::define('my-resource', function($user, $resource) { return $user->id === $resource->user_id; });
        // Is a user part of a project?
        Gate::define('in-project', function($user, $project) { return in_array($user->id, [$project->service_user, $project->bid_user]); });
    }
}
