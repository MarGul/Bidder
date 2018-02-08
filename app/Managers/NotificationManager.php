<?php

namespace App\Managers;

class NotificationManager extends BaseManager
{

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

}