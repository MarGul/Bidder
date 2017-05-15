<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('service_user');
            $table->integer('bid_user');
            $table->boolean('service_user_accept')->default(false);
            $table->boolean('bid_user_accept')->default(false);
            $table->string('service_user_title')->nullable();
            $table->string('bid_user_title')->nullable();
            $table->date('finish');
            $table->boolean('active');
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
        Schema::dropIfExists('projects');
    }
}
