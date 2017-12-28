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
    	'user_id', 'project_id', 'payment_id', 'hash', 'total', 'vat', 'due', 'notes'
    ];

    /**
     * Attributes that are hidden when toArray
     *
     * @var array
     */
    protected $hidden = ['payment_id'];

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
     * An invoice has one payment
     * 
     * @return Eloquent Relationship
     */
    public function payment()
    {
        return $this->hasOne('App\Payment');
    }

}
