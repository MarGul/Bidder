<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Managers\CategoryManager;

class CategoryController extends Controller
{
    
    /**
     * Manager
     * 
     * @var App\Managers\CategoryManager
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
        // Try to get the parent categories
        $this->manager->parents();

        if ( $this->manager->hasError() ) {
            return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
        }

        return response()->json([
            'message' => $this->manager->successMessage(),
            'data' => [
                'categories' => $this->manager->categories()
            ]
        ], $this->manager->successCode());
    }
}