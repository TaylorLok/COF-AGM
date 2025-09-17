<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('agm_registrations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('surname');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->enum('membership_status', ['member', 'visitor', 'guest']);
            $table->enum('attendance_type', ['in_person', 'virtual']);
            $table->text('special_requirements')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamp('registered_at');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['email', 'registered_at']);
            $table->index('attendance_type');
            $table->index('membership_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agm_registrations');
    }
};