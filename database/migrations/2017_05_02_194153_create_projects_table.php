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
            $table->integer('service_id');
            $table->integer('bid_id');
            $table->double('service_price');
            $table->date('service_start');
            $table->date('service_end');
            $table->integer('service_hours')->nullable();
            $table->datetime('accept_ends');
            $table->boolean('use_contract')->default(false);
            $table->boolean('started')->default(false);
            $table->boolean('cancelled')->default(false);
            $table->boolean('completed')->default(false);
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
