<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service;

class CategoryServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($category_id)
    {
        if ( !$services = Service::getServices(['category_id' => $category_id]) ) {
            return response()->json(['message' => 'Could not list services based on category.'], 500);
        }

        return response()->json([
            'message' => 'Listing services based on category.',
            'services' => $services
        ], 200);
    }

}
