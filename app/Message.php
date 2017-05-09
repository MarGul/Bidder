<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    /**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
    	'project_id', 'user_id', 'message'
    ];

    /**
     * A message belongs to a user.
     * 
     * @return Eloquent Relationship
     */
    public function user() {
    	return $this->belongsTo('App\User');
    }
}
