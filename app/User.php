<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Notifications\ResetPassword;


class User extends Authenticatable
{
	use HasApiTokens, Notifiable;
    
	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'username', 'password', 'company',  'name', 'bio', 'avatar', 'email_verified', 'email_verification_code'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'email', 'remember_token', 'email_verification_code', 'updated_at'
    ];

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPassword($token));
    }

    /**
     * The channels the user receives notification broadcasts on.
     *
     * @return string
     */
    public function receivesBroadcastNotificationsOn()
    {
        return 'users.'.$this->id;
    }

    /**
     * A user may have many services.
     * 
     * @return Eloquent Relationship
     */
    public function services() 
    {
    	return $this->hasMany('App\Service');
    }

    /**
     * A user may have many comments.
     * 
     * @return Eloquent Relationship
     */
    public function comments() 
    {
    	return $this->hasMany('App\Comment');
    }

    /**
     * A user may have many bids.
     * 
     * @return Eloquent Relationship
     */
    public function bids() 
    {
    	return $this->hasMany('App\Bid');
    }

    /**
     * A user may have many projects.
     * 
     * @return Eloquent Relationship
     */
    public function projects()
    {
        return $this->belongsToMany('App\Project')->withPivot('role', 'title');
    }

    /**
     * A user may have many reviews.
     * 
     * @return Eloquent Relationship
     */
    public function reviews()
    {
        return $this->hasMany('App\Review');
    }

    /**
     * Relationship to get the rating count and average.
     * 
     * @return Eloquent Relationship
     */
    public function rating()
    {
        return $this->hasOne('App\Review')
                    ->selectRaw('user_id, count(*) as count, avg(would_recommend) as avg, avg(communication) as communication, avg(as_described) as as_described')
                    ->groupBy('user_id');
    }

    /**
     * A user may have many invoices.
     * 
     * @return Eloquent Relationship
     */
    public function invoices()
    {
        return $this->hasMany('App\Invoice');
    }

    /**
     * A user has one notification settings.
     * 
     * @return Eloquent Relationship
     */
    public function notification_settings()
    {
        return $this->hasOne('App\NotificationSettings');
    }

}
