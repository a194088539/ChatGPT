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
        Schema::create('card', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code', 255)->default('')->comment('兑换码');
            $table->decimal('balance', 10,2)->comment('余额');
            $table->string('vip_level', 255)->default('')->comment('会员ID');
            $table->tinyInteger('is_used')->default(new \Illuminate\Database\Query\Expression('0'))->comment('是否使用');
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
        Schema::dropIfExists('card');
    }
};
