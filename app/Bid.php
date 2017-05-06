<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Bid extends Model
{
    
    /**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
        'service_id', 'user_id', 'description', 'start', 'end', 'hours', 'price', 'accepted'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'user_id'
    ];

	/**
	 * A bid belongs to a service.
	 * 
	 * @return Eloquent Relationship
	 */
    public function service() {
    	return $this->belongsTo('App\Service');
    }

    /**
     * A bid belongs to a user.
     * 
     * @return Eloquent Relationship
     */
    public function user() {
        return $this->belongsTo('App\User');
    }

    /**
     * Add a global scope to this model to always sort by created_at DESC
     * 
     * @return void
     */
    protected static function boot() {
        parent::boot();
        static::addGlobalScope('order', function (Builder $builder) {
            $builder->orderBy('created_at', 'desc');
        });
    }

}
