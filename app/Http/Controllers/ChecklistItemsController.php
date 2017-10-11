<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Features\CategoryManager;

class ChecklistItemsController extends Controller
{
    
    /**
     * Manager
     * 
     * @var App\Features\CategoryManager
     */
    private $manager;

    public function __construct(CategoryManager $manager) {
        //$this->middleware('auth:api');
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
            'message' => 'Displaying checklist items for categories.',
            'checklistItems' => $this->manager->checklistItems()
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }
}
