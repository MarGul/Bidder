<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Use App\Project;


// Authorize if the user can listen into the project message channel.
Broadcast::channel('project.{project}.messages', function ($user, Project $project) {
    //return in_array($user->id, [$project->bid_user, $project->service_user]);
    return true;
});
