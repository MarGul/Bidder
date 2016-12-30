<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use App\Service;

class ServiceCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function index(Service $service)
    {
        if ( !$comments = Comment::getCommentsService($service->id) ) {
            return response()->json(['message' => 'Could not fetch comments.'], 500);
        }

        return response()->json([
            'message' => 'Listing all comments.',
            'comments' => $comments,
            'create_comment' => [
                'href' => 'api/v1/services/' . $service->id . '/comments',
                'method' => 'POST',
                'params' => ['body']
            ]
        ], 200);
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
        
        if ( !$comment = Comment::createComment($service->id, ['body' => $request->input('body')]) ) {
            return response()->json(['message' => 'Could not create the comment.'], 500);
        }

        return response()->json([
            'message' => 'Successfully created the comment.',
            'comment' => $comment
        ], 201);
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
        $this->validate($request, [
            'body' => 'required'
        ]);

        if ( !$comment = Comment::updateComment($comment->id, ['body' => $request->input('body')]) ) {
            return response()->json(['message' => 'Could not update comment.'], 500);
        }

        return response()->json([
            'message' => 'Successfully updated comment.',
            'comment' => $comment
        ], 200);
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
        if ( !$comment = Comment::deleteComment($comment->id) ) {
            return response()->json(['message' => 'Could not delete comment.'], 500);
        }

        return response()->json([
            'message' => 'Successfully deleted the comment.',
            'comment' => $comment
        ], 200);
    }
}
