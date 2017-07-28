<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    
	/**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
    	'invoice_id'
    ];

    /**
     * A payment belongs to an invoice.
     * 
     * @return Eloquent Relationship
     */
    public function invoice()
    {
    	return $this->belongsTo('App\Invoice');
    }

}
