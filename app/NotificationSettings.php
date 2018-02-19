<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NotificationSettings extends Model
{
    
    /**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
    	'user_id', 'for_my_services', 'for_my_bids', 'for_my_projects'
	];
	
	/**
	 * Attributes that are hidden when toArray
	 *
	 * @var array
	 */
	protected $hidden = [
		'id', 'user_id', 'created_at', 'updated_at'
	];

	/**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'for_my_services' => 'boolean',
        'for_my_bids' => 'boolean',
        'for_my_projects' => 'boolean',
    ];

   	/**
   	 * A notification settings belongs to a user.
   	 * 
   	 * @return Eloquent Relationship
   	 */
   	public function user()
   	{
   		return $this->belongsTo('App\User');
   	}
}
