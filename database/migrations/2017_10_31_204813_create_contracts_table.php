<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContractsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('project_id');
            $table->string('client_name')->nullable();
            $table->string('client_identity')->nullable();
            $table->string('contractor_name')->nullable();
            $table->string('contractor_identity')->nullable();
            $table->text('project_description');
            $table->text('contractor_dissuasion')->nullable();
            $table->date('project_start');
            $table->date('project_end');
            $table->float('project_price');
            $table->text('project_price_specified')->nullable();
            $table->boolean('payment_full')->default(false);
            $table->boolean('payment_specified')->default(false);
            $table->text('other')->nullable();
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
        Schema::dropIfExists('contracts');
    }
}
