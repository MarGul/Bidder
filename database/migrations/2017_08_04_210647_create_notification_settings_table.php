<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotificationSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notification_settings', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->index();
            $table->boolean('bid_on_service')->default(true);
            $table->boolean('comment_on_service')->default(true);
            $table->boolean('message_in_project')->default(true);
            $table->boolean('project_details_changed')->default(true);
            $table->boolean('other_party_accepted')->default(true);
            $table->boolean('project_started')->default(true);
            $table->boolean('leave_review')->default(true);
            $table->boolean('competing_bid')->default(true);
            $table->boolean('comment_reply')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notification_settings');
    }
}
