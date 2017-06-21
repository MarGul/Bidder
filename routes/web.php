<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
| We redirect everything to the index and let our VueJS Single Page Application
| handle all of the routing.
*/

Route::get('test', 'TestController@index');

Route::post('register', 'Auth\RegisterController@register');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout');

Route::any('{all}', function () {
    return view('index');
})->where(['all' => '.*']);
