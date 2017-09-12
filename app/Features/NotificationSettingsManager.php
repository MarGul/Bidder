<?php

namespace App\Features;

use App\NotificationSettings;
use Notification;
use App\User;
use App\Bid;
use App\Notifications\NewBidOnMyService;
use App\Notifications\CompetingBid;

class NotificationSettingsManager
{

	protected $usersSettings;

	/**
	 * Get the notification settings for a user.
	 * 
	 * @param  App\User 	$user
	 * @return collection
	 */
	public function forUser($user)
	{
		$userId = is_object($user) ? $user->id : $user;

		$settings = NotificationSettings::where('user_id', $userId)->first();

		return $settings;
	}

	/**
	 * Update the notification settings for a user.
	 * 
	 * @param  App\User 	$user
	 * @param  array 		$data
	 * @return boolean
	 */
	public function update($user, $data)
	{
		$settings = NotificationSettings::where('user_id', $user->id)->first();

		if ( !$settings->update($data) ) return false;

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
