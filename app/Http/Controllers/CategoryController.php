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
        return response()->json([
            'message' => 'Not implemented at the time.'
        ], 200);
    }

}