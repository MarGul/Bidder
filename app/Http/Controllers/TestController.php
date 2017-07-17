<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;
use App\Features\InvoiceManager;

class TestController extends Controller
{
    
	public function index()
	{
		app(InvoiceManager::class)->create(Project::find(1));
	}

}
