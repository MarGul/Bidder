<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    
    /**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
    	'service_id', 'user_id', 'body'
    ];

    /**
     *  A comment belongs to a service.
     * 
     * @return Eloquent Relationship
     */
    public function service() {
    	return $this->belongsTo('App\Service');
    }

    /**
     * A comment belongs to a user.
     * 
     * @return Eloquent Relationship
     */
    public function user() {
        return $this->belongsTo('App\User');
    }

	/**
	 * Get the comments for a service
	 * 
	 * @param  Integer $service_id 
	 * @return Boolean|comments       [False on fail, comment objects on success]
	 */
	public static function getCommentsService($service_id) {
		if ( !$comments = Comment::where('service_id', $service_id)->get() ) {
			return false;
		}

		return $comments;
	}

    /**
     * Create a comment for a service
     * 
     * @param  Integer $service_id [The id of the service entity]
     * @param  Array   $data       [Array of data to store]
     * @return Boolean|Comment     [Return false if could not create otherwise the comment.]
     */
    public static function createComment($service_id, $data) {
    	
    	$comment = new Comment;
    	$comment->service_id = $service_id;
    	$comment->user_id = 1337;
    	$comment->body = $data['body'];

    	if( !$comment->save() ) {
    		return false;
    	}

    	$comment->view_comments = [
    		'href' => 'api/v1/services/' . $service_id . '/comments',
    		'method' => 'GET'
    	];

    	return $comment;
    }

    /**
     * Update a comment.
     * 
     * @param  Integer $comment_id [Id of the comment]
     * @param  Array   $data       [Data to update the comment to]
     * @return Boolean|Comment     [False on failure, comment object on success.]
     */
    public static function updateComment($comment_id, $data) {

    	$comment = Comment::findOrFail((int)$comment_id);
    	$comment->body = $data['body'];

    	if ( !$comment->update() ) {
    		return false;
    	}

    	$comment->view_comments = [
    		'href' => 'api/v1/services/' . $comment->service_id . '/comments',
    		'method' => 'GET'
    	];

    	return $comment;
    }

    /**
     * Delete a comment
     * 
     * @param  Integer $comment_id [The comment ID]
     * @return Boolean|Comment     [False on fail, the comment object on success]
     */
    public static function deleteComment($comment_id) {
    	$comment = Comment::findOrFail((int)$comment_id);

    	if( !$comment->delete() ) {
    		return false;
    	}

    	$comment->create_comment = [
    		'href' => 'api/v1/services/' . $comment->service_id . '/comments',
    		'method' => 'POST',
    		'params' => ['body']
    	];

    	return $comment;
    }
}
