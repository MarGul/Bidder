<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use App\Events\CommentCreated;

class TestController extends Controller
{
    
	public function index()
	{
		$comment = Comment::find(2);
		event(new CommentCreated($comment));
	}

}
