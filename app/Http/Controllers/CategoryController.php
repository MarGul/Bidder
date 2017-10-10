<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Features\CategoryManager;

class CategoryController extends Controller
{
    
    /**
     * Manager
     * 
     * @var App\Features\CategoryManager
     */
    private $manager;

    public function __construct(CategoryManager $manager) {
        $this->manager = $manager;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'message' => 'Listing all categories.',
            'categories' => $this->manager->getActive()
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