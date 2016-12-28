<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::all();

        foreach ($categories as $category) {
            $category->view_category = [
                'href' => 'api/v1/categories/' . $category->id,
                'method' => 'GET'
            ];
        }

        return response()->json([
            'message' => 'Listing all categories.',
            'categories' => $categories
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        $category->view_categories = [
            'href' => 'api/v1/categories',
            'method' => 'GET'
        ];

        return response()->json([
            'message' => 'Viewing category data.',
            'category' => $category
        ], 200);
    }

}
