<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
| Some authentication routes are handled directly by the server. The rest 
| we redirect to the index and let our VueJS Single Page Application
| handle all of the routing.
*/

Route::get('/test', function() {
	return view('test');
});

Route::post('/test')->uses('TestController@store');

Route::get('test2', function() {
	$manager = app(App\Managers\MediaManager2::class);

	$files = [
		['media_id' => 18, 'tmp_path' => storage_path('/tmp/phpyDzf9V')],
		['media_id' => 19, 'tmp_path' => storage_path('/tmp/phpFzIxXo')]
	];

	foreach ($files as $file) {
		$manager->uploadTempFile($file);
	}

	dd($manager->hasError(), $manager->errorMessage());
});

/**
 * Auth Routes
 * ===========
 */
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout');
Route::post('register', 'Auth\RegisterController@register');
Route::get('email-verify/{code}', 'Auth\EmailVerificationController@verify');
Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail');
Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
Route::post('password/reset', 'Auth\ResetPasswordController@reset')->name('password.request');
/**
 * Download Routes
 * ===============
 */
Route::get('download-invoice/{hash}', 'InvoiceController@index')->name('download.invoice');
Route::get('projects/{project}/download-contract', 'ProjectDownloadContractController@index')->name('download.contract');

Route::any('{all}', function () {
    return view('index');
})->where(['all' => '.*']);