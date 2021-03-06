<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServicesTable extends Migration
{
    
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('services', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('category_id');
            $table->integer('region_id')->nullable();
            $table->integer('city_id')->nullable();
            $table->string('title');
            $table->text('description');
            $table->date('start');
            $table->date('end');
            $table->dateTime('bid_start');
            $table->dateTime('bid_stop');
            $table->boolean('has_accepted_bid')->default(false);
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
        Schema::dropIfExists('services');
    }
}
