<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
| We redirect everything to the index and let our VueJS single Page application
| handle all of the routing.
*/

Route::any('{all}', function () {
    return view('index');
})->where(['all' => '.*']);
