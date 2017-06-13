<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
| We redirect everything to the index and let our VueJS Single Page Application
| handle all of the routing.
*/

Route::get('test', function() {
	$service = App\Service::find(1);

	$man = new App\Features\SubscriptionManager;
	$man->sendNotifications($service);
});

Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout');

Route::any('{all}', function () {
    return view('index');
})->where(['all' => '.*']);
