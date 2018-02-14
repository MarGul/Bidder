<?php

namespace App\Managers;

class NotificationManager extends BaseManager
{

    /**
     * The single notification that the manager is working with
     * @var mixed
     */
    protected $notification;
    /**
     * The notifications that the manager is working with.
     * @var mixed
     */
    protected $notifications;

    /**
     * The notifications that the manager has been working with.
     * @return mixed
     */
    public function notifications() { return $this->notifications; }
    
    
    /**
     * Get the users notifications
     *
     * @param   integer $page
     * @return  boolean
     */
    public function get($page)
    {
        if ( $this->hasError() ) return false;

        try {
            $this->notifications = $this->user->notifications()->simplePaginate(20, ['*'], 'page', $page);
        } catch ( \Exception $e ) {
            $this->setError('Could not fetch the users notifications.', 500);
            return false;
        }

        $this->setSuccess('Displaying the users notifications', 200);

        return true;
    }

    /**
     * Mark a single users notification as read.
     *
     * @param   mixed $notification
     * @return  boolean
     */
    public function markAsRead($notification)
    {
        if ( $this->hasError() ) return false;
        
        try {
            $this->notification = $this->user->unreadNotifications()->findOrFail($notification);
            $this->notification->markAsRead();  
        } catch ( \Exception $e ) {
            $this->setError('Could not mark the notification as read.', 500);
            return false;
        }

        $this->setSuccess('Successfully marked the notification as read.', 200);
        
        return true;
    }

    /**
     * Mark the users notifications as read.
     *
     * @return boolean
     */
    public function markAllAsRead()
    {
        if ( $this->hasError() ) return false;
        
        try {
            $this->user->unreadNotifications->markAsRead();  
        } catch ( \Exception $e ) {
            $this->setError('Could not mark the users notifications as read.', 500);
            return false;
        }

        $this->setSuccess('Successfully marked the users notifications as read.', 200);
        
        return true;
    }

}