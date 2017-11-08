<?php

namespace App\Managers;

use App\NotificationSettings;
use Notification;
use App\User;
use App\Bid;
use App\Notifications\NewBidOnMyService;
use App\Notifications\CompetingBid;

class NotificationSettingsManager extends BaseManager
{

	protected $usersSettings;
	/**
	 * The notification settings that the manager is working on.
	 * @var App\NotificationSetting
	 */
	protected $notificationSettings;


	/**
	 * Return the notification settings that the manager has been working on.
	 * 
	 * @return Collection
	 */
	public function notificationSettings() { return $this->notificationSettings; }

	/**
	 * Get notification settings for a user.
	 * 
	 * @return boolean
	 */
	public function get()
	{
		if ( $this->hasError() ) return false;

		try {
			$this->notificationSettings = NotificationSettings::where('user_id', $this->user->id)->first();
		} catch (\Exception $e) {
			$this->setError('Could not fetch the users notification settings.', 500);
			return false;
		}

		$this->setSuccess('Listing the users notification settings.', 200);

		return true;
	}

	/**
	 * Update the notification settings for a user.
	 * 
	 * @param  array 		$data
	 * @return boolean
	 */
	public function update($data)
	{
		if ( $this->hasError() ) return false;

		if ( !$this->setData($data)->edit() ) return false;

		$this->setSuccess('Successfully updated the users notification settings.', 200);

		return true;
	}

	/**
	 * Edit the resource in storage.
	 * 
	 * @return boolean
	 */
	protected function edit()
	{
		try {
			$this->notificationSettings = NotificationSettings::where('user_id', $this->user->id)->first();

			$this->notificationSettings->update($this->data());
		} catch (\Exception $e) {
			$this->setError('Could not update the notification settings in storage.', 500);
			return false;
		}

		return true;
	}

	/**
	 * If the user that created the service has notifications on for when a new bid gets laid
	 * on his service, send out that notification.
	 * 
	 * @param void
	 */
	public function BidOnMyService($bid)
	{
		$this->usersSettings = $this->forUser($bid->service->user_id);

		if ( $this->notificationActive('bid_on_service') ) {
			$user = User::find($bid->service->user_id);
			Notification::send($user, new NewBidOnMyService($bid));
		}
	}

	/**
	 * Send out notifications for the users that said that wanted them when a competing bid occurs
	 * 
	 * @param  App\Bid 	$bid
	 * @return void
	 */
	public function forCompetingBid($bid)
	{
		$bids = Bid::with('user')
						->select('user_id')
						->where('service_id', $bid->service_id)
						->where('user_id', '<>', $bid->user_id)
						->groupBy('user_id')
						->get();

		if ( $bids->isNotEmpty() ) {
			foreach ($bids as $b) {
				if ( $b->user->notification_settings->competing_bid) {
					Notification::send($b->user, new CompetingBid($bid));
				}
			}
		}
	}

	protected function notificationActive($setting)
	{
		return $this->usersSettings[$setting];
	}

}
