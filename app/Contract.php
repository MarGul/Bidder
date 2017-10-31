<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    
	/**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
    	'client_name', 'client_identity', 'contractor_name', 'contractor_identity', 'project_description',
        'contractor_dissuasion', 'project_start', 'project_end', 'project_price', 'project_price_specified',
        'payment_full', 'payment_specified', 'other'
    ];

    /**
     * Each contract belongs to a project.
     * 
     * @return Eloquent Relationship
     */
    public function project()
    {
    	return $this->belongsTo('App\Project');
    }
}
