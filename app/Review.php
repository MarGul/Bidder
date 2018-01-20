<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    
	/**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
    	'user_id', 'project_id', 'user_id_reviewer', 'communication', 'as_described', 'would_recommend', 'review'
    ];

    /**
     * The user that left the review
     * 
     * @return Eloquent Relationship
     */
    public function reviewer()
    {
    	return $this->hasOne('App\User', 'id', 'user_id_reviewer')->select(['username', 'avatar', 'id']);
    }

}
