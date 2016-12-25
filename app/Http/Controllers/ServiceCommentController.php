<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;

class ServiceCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($service_id)
    {
        if ( !$comments = Comment::getCommentsService($service_id) ) {
            return response()->json(['message' => 'Could not fetch comments.'], 500);
        }

        return response()->json([
            'message' => 'Listing all comments.',
            'comments' => $comments,
            'create_comment' => [
                'href' => 'api/v1/services/' . $service_id . '/comments',
                'method' => 'POST',
                'params' => ['body']
            ]
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $service_id)
    {
        $this->validate($request, [
            'body' => 'required'
        ]);
        
        if ( !$comment = Comment::createComment($service_id, ['body' => $request->input('body')]) ) {
            return response()->json(['message' => 'Could not create the comment.'], 500);
        }

        return response()->json([
            'message' => 'Successfully created the comment.',
            'comment' => $comment
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $service_id, $comment_id)
    {
        $this->validate($request, [
            'body' => 'required'
        ]);

        if ( !$comment = Comment::updateComment($comment_id, ['body' => $request->input('body')]) ) {
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($service_id, $comment_id)
    {
        if ( !$comment = Comment::deleteComment($comment_id) ) {
            return response()->json(['message' => 'Could not delete comment.'], 500);
        }

        return response()->json([
            'message' => 'Successfully deleted the comment.',
            'comment' => $comment
        ], 200);
    }
}
