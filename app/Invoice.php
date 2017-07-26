<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    
	/**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
    	'user_id', 'project_id', 'hash', 'total', 'vat', 'due', 'notes'
    ];

    /**
     * An invoice belongs to a user.
     * 
     * @return Eloquent Relationship
     */
    public function user()
    {
    	return $this->belongsTo('App\User');
    }

    /**
     * An invoice belongs to a project.
     * 
     * @return Eloquent Relationship
     */
    public function project()
    {
    	return $this->belongsTo('App\Project');
    }

    /**
     * An invoice may have many payments (mostly one)
     * 
     * @return Eloquent Relationship
     */
    public function payments()
    {
        return $this->hasMany('App\Payment');
    }

}
