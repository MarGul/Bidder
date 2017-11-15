<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreComment;
use App\Comment;
use App\Service;
use App\Managers\CommentManager;

class ServiceCommentController extends Controller
{
    /**
     * Class to manage comments
     * 
     * @var App\Managers\CommentManager
     */
    protected $manager;

    public function __construct(CommentManager $manager) {
        $this->middleware('auth:api', ['only' => ['store', 'update', 'destroy']]);
        $this->manager = $manager;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function index(Service $service)
    {
        // Try and fetch the comments.
        $this->manager->forService($service)
                      ->get();

        if ( $this->manager->hasError() ) {
            return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
        }

        return response()->json([
            'message' => $this->manager->successMessage(),
            'data' => [
                'comments' => $this->manager->comments()
            ]
        ], $this->manager->successCode());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  App\Service               $service
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Service $service)
    {
        $this->validate($request, [
            'body' => 'required'
        ]);

        // Try and insert the comment
        $this->manager->byUser($request->user())
                      ->forService($service)
                      ->create($request->only(['body']));

        if ( $this->manager->hasError() ) {
            return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
        }

        return response()->json([
            'message' => $this->manager->successMessage(),
            'data' => [
                'comment' => $this->manager->comment()
            ]
        ], $this->manager->successCode());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  App\Service               $service
     * @param  App\Comment               $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Service $service, Comment $comment)
    {
        return ['message' => 'Not implemented.'];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  App\Service  $service
     * @param  App\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Service $service, Comment $comment)
    {
        return ['message' => 'Not implemented.'];
    }
}
