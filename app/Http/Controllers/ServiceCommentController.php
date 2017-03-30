<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreComment;
use App\Comment;
use App\Service;
use App\Features\CommentManager;

class ServiceCommentController extends Controller
{
    /**
     * Class to manage comments
     * 
     * @var App\Features\CommentManager
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
        return $this->manager->all($service);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  App\Service               $service
     * @return \Illuminate\Http\Response
     */
    public function store(StoreComment $request, Service $service)
    {
        return $this->manager->create($request, $service);
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
        return $this->manager->update($request, $comment);
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
        return $this->manager->destroy($comment);
    }
}
