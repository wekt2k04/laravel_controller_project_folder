<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('seances', function (Blueprint $table) {
            $table->id(); // Unique ID
            $table->string('titre'); // Short text for the class name
            $table->dateTime('date_debut'); // Date and Time of the class

            // This links the session to a Module (Foreign Key)
            $table->foreignId('module_id')
                ->constrained('modules')
                ->onDelete('cascade'); // If module is deleted, delete its sessions too

            $table->timestamps(); // Creates created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seances');
    }
};
