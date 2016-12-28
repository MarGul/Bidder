<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service;
use App\Category;

class CategoryServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  App\Category     $category
     * @return \Illuminate\Http\Response
     */
    public function index(Category $category)
    {
        if ( !$services = Service::getServices(['category_id' => $category->id, 'status' => 'active']) ) {
            return response()->json(['message' => 'Could not list services based on category.'], 500);
        }

        return response()->json([
            'message' => 'Listing services based on category.',
            'services' => $services
        ], 200);
    }

}
