<?php

namespace App\Features;

use App\Message;
use App\Events\NewMessage;

class MessageManager
{
	
	/**
	 * Create a new message for a project.
	 * 
	 * @param  App\User 	$user
	 * @param  array 		$data
	 * @return App\Message
	 */
	public function create($user, $data)
	{
		$message = Message::create([
			'project_id' => $data['projectId'],
			'user_id' => $user->id,
			'message' => $data['message']
		]);

		// Attach the user as well
		$message->user = $user;
		// Broadcast that there is a new message that has been created.
		event(new NewMessage($message));

		return $message;
	}

}