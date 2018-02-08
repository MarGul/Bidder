<?php

namespace App\Managers;

use App\NotificationSettings;

class NotificationSettingsManager extends BaseManager
{

	/**
	 * The notification settings that the manager is working with.
	 * @var App\NotificationSettings;
	 */
	protected $notificationSettings;
	
	/**
	 * The notification settings that the manager has been working
	 * @return App\NotificationSettings
	 */
	public function notificationSettings() { return $this->notificationSettings; }
	
	
	/**
	 * Create the users notifications settings entry.
	 *
	 * @return boolean
	 */
	public function create()
	{
		if ( $this->hasError() ) return false;

		$this->notificationSettings = NotificationSettings::create(['user_id' => $this->user->id]);

		return true;
	}

	/**
	 * Get the notification settings for a user.
	 *
	 * @return boolean
	 */
	public function get()
	{
		if ( $this->hasError() ) return false;

		try {
			$this->notificationSettings = $this->user->notification_settings;
		} catch ( \Exception $e ) {
			$this->setError('Could not fetch the users notification settings from storage.', 500);
			return false;
		}

		$this->setSuccess('Displaying the users notification settings.', 200);

		return true;
	}

	/**
	 * Update the users notification settings
	 *
	 * @param 	array $data
	 * @return 	boolean
	 */
	public function update($data) {
		if ( $this->hasError() ) return false;

		if ( !$this->setData($data)->edit() ) return false;

		$this->setSuccess('Successfully updated the users notification settings.', 200);

		return true;
	}

	/**
	 * Edit the notification settings for a user in storage.
	 *
	 * @return boolean
	 */
	protected function edit() {
		try {
			$this->notificationSettings = $this->user->notification_settings->update($this->data());
		} catch ( \Exception $e ) {
			$this->setError('Could not update the notification settings.', 500);
			return false;
		}

		return true;
	}

}