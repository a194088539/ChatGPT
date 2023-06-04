<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invite_set', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('invite_c');
            $table->decimal('invite_amount', 10,2)->default(new \Illuminate\Database\Query\Expression('0.00'));
            $table->integer('invite_vip_id');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invite_set');
    }
};
