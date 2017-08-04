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
    	'user_id', 'bid_on_service', 'comment_on_service', 'message_in_project', 'project_details_changed',
    	'other_party_accepted', 'project_started', 'leave_review', 'competing_bid', 'comment_reply'
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
