<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    
    /**
     * Properties that are mass-assignable.
     * @var array
     */
    protected $fillable = ['subject' , 'email', 'feedback'];
    /**
     * Hidden from toArray
     * @var array
     */
    protected $hidden = ['email'];

}
