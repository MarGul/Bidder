<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('user_id');
            $table->integer('project_id');
            $table->integer('payment_id');
            $table->string('hash');
            $table->float('total');
            $table->float('vat');
            $table->date('due');
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        DB::update('ALTER TABLE invoices AUTO_INCREMENT = 1000000');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invoices');
    }
}
