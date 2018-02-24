<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Managers\FeedbackManager;

class FeedbackController extends Controller
{
    
    /**
     * The manager to handle feedback
     * @var App\Managers\FeedbackManager
     */
    protected $manager;


    public function __construct(FeedBackManager $manager)
    {
        $this->manager = $manager;
    }


    /**
     * Store a new resource in storage.
     *
     * @param   Request $request
     * @return  Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $this->validate($request, [
            'subject' => 'required',
            'email' => 'required|email',
            'feedback' => 'required'
        ]);

        // Try to store the feedback
        $this->manager->create($data);


        if ( $this->manager->hasError() ) {
            return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
        }

        return response()->json(['message' => $this->manager->successMessage()], $this->manager->successCode());
    }

}
