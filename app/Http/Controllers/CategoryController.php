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
        // Eager load with sub_categories relationship
        $categories = Category::with('sub_categories')->get();
        // Reject all categories that's not a root category
        $categories = $categories->reject(function($category) {
            return $category->sub_categories->isEmpty();
        })->flatten();

        Category::parseCategories($categories);

        return response()->json([
            'message' => 'Listing all categories.',
            'categories' => $categories
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  Integer|String  $identifier  [Slug or Id to identify a category]
     * @return \Illuminate\Http\Response
     */
    public function show($identifier)
    {
        // If integer look for category with that ID. Otherwise look for category with slug of $identifier
        if ( is_numeric($identifier) ) {
            $category = Category::with('sub_categories')->findOrFail((int)$identifier);
        } else {
            $category = Category::with('sub_categories')->where('slug', $identifier)->firstOrFail();
        }

        Category::parseCategory($category);

        return response()->json([
            'message' => 'Viewing category data.',
            'category' => $category
        ], 200);
    }

}