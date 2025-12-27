<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Création de la table Filieres
        Schema::create('filieres', function (Blueprint $table) {
            $table->id();
            $table->string('nom'); // Ex: G.INF, GTR
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // 2. Création de la table Annonces
        Schema::create('annonces', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('contenu');
            // Si filiere_id est NULL, c'est une annonce globale pour tout le monde
            $table->foreignId('filiere_id')->nullable()->constrained('filieres')->onDelete('cascade');
            $table->timestamps();
        });

        // 3. Mise à jour de la table Users (Lien vers Filière + Photo)
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('filiere_id')->nullable()->constrained('filieres')->onDelete('set null');
            $table->string('photo_url')->nullable();
        });

        // 4. Mise à jour de la table Modules (Lien vers Filière)
        Schema::table('modules', function (Blueprint $table) {
            $table->foreignId('filiere_id')->nullable()->constrained('filieres')->onDelete('cascade');
        });

        // 5. Mise à jour de la table Seances (Date de fin)
        Schema::table('seances', function (Blueprint $table) {
            $table->dateTime('date_fin')->nullable()->after('date_debut');
        });
    }

    public function down(): void
    {
        Schema::table('seances', function (Blueprint $table) {
            $table->dropColumn('date_fin');
        });

        Schema::table('modules', function (Blueprint $table) {
            $table->dropForeign(['filiere_id']);
            $table->dropColumn('filiere_id');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['filiere_id']);
            $table->dropColumn(['filiere_id', 'photo_url']);
        });

        Schema::dropIfExists('annonces');
        Schema::dropIfExists('filieres');
    }
};
