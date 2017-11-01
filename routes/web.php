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
	$user = \App\User::find(1);
	$project = \App\Project::find(1);
	
	$manager = app(App\Features\ContractManager::class);

	// Try and create the contract.
    $manager->byUser( $user )
			->forProject( $project )
			->create( [
	            'client_name' => 'Marcus',
	            'client_identity' => '872615-4455',
	            'contractor_name' => 'Bills Gun', 
	            'contractor_identity' => '554499-6622', 
	            'project_description' => 'This is suppose to be a test project.',
	            'contractor_dissuasion' => 'I dont advise you to do this stuff.', 
	            'project_start' => '2017-12-20', 
	            'project_end' => '2007-12-29', 
	            'project_price' => 1245,
	            'project_price_specified' => 'Its tallied up like this:',
	            'payment_full' => true, 
	            'payment_specified' => true, 
	            'other' => 'Other things we might agree on'
			] );


    dd($manager);
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

Route::any('{all}', function () {
    return view('index');
})->where(['all' => '.*']);