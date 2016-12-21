<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes Bidder - Version 1
|--------------------------------------------------------------------------
*/

Route::group(['prefix' => 'v1'], function() {

	Route::resource('services', 'ServiceController', [
		'except' => ['create', 'edit']
	]);

});