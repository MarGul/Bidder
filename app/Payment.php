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
        'invoice_id', 'user_id', 'payment_method', 'amount_paid', 'transaction_id'
    ];
    
    /**
     * A payment belongs to an invoice
     *
     * @return Eloquent Relationship
     */
    public function invoice()
    {
        return $this->belongsTo('App\Invoice');
    }

    /**
     * A payment belongs to an user.
     *
     * @return Eloquent Relationship
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

}
