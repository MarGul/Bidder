<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Comment extends Model
{
    
    /**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
    	'service_id', 'user_id', 'body', 'parent'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];

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
     * A comment can have many replies.
     * 
     * @return Eloquent Relationship
     */
    public function replies() {
        return $this->hasMany(self::class, 'parent', 'id');
    }

}
