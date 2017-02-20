<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
| We redirect everything to the index and let our VueJS Single Page Application
| handle all of the routing.
*/

Route::any('{all}', function () {
    return view('index');
})->where(['all' => '.*']);
