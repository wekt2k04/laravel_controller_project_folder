# 📘 ENSA Smart Attendance - Documentation Technique (Sprint 3)

## Message pour Leila :
  Salut Leila, c'est Wilfried. Dans le but de faciliter ta présentation du projet, essaie de parcourir cette documenntation qui explique la chronologie des fichiers utilisés pour parfaire le controleur. Il y a 2 actes:
> 1. Affichage de la séance (lecture)
> 2. Enregistrement de l'appel (écriture)

> **Architecture :** Monolithe Laravel 11 (API) + React (Frontend)

---

## 1. Contexte et Problématique
L'objectif est de remplacer la feuille d'appel papier par une interface web.
* **Le besoin :** Un professeur doit pouvoir visualiser une séance de cours et cocher les étudiants présents.
* **Le défi technique :** Connecter une interface React (Groupe 2) à une Base de Données SQL (Groupe 1) via une logique de contrôle (Groupe 3).

---

## 2. Implémentation du Diagramme de Séquence (Logique Métier)

Nous avons traduit le diagramme de séquence UML "Faire l'appel" en code PHP. Voici le détail fichier par fichier.

### 🟢 ACTE 1 : Affichage de la Séance (Lecture)
*Scenario : Le professeur clique sur un cours pour voir la liste des élèves.*

**1. Le Point d'Entrée (Route)**
* **Fichier :** `routes/api.php`
* **Code :** `Route::apiResource('seances', SeanceController::class);`
* **Pourquoi ?** Nous utilisons une route API REST standard. Cela permet à React d'appeler `GET /api/seances/{id}` pour récupérer les infos brutes (JSON) sans recharger la page.

**2. Le Traitement (Contrôleur)**
* **Fichier :** `app/Http/Controllers/Api/SeanceController.php`
* **Fonction :** `public function show($id)`
* **Logique implémentée :**
    1.  **Récupération de la séance :** Utilisation de `Seance::with('module')->findOrFail($id)`.
        * *Pourquoi `with('module')` ?* C'est de l'"Eager Loading". Cela permet de récupérer le titre du Module (ex: "Dev Web") en même temps que la séance, en une seule requête SQL optimisée.
    2.  **Récupération des étudiants :** `User::where('role', 'etudiant')->get()`.
        * *Pourquoi ?* Le frontend a besoin de la liste complète pour générer les cases à cocher.

**3. La Réponse**
* **Format :** `return response()->json(...)`
* **Pourquoi ?** React ne comprend pas le PHP/Blade. Nous devons lui envoyer un objet JavaScript (JSON) contenant deux clés : `seance` (infos du cours) et `students` (liste de classe).

---

### 🟠 ACTE 2 : Enregistrement de l'Appel (Écriture)
*Scenario : Le professeur valide sa sélection.*

**1. Le Point d'Entrée (Route)**
* **Fichier :** `routes/api.php`
* **Code :** `Route::post('/appel/save', [PresenceController::class, 'store']);`
* **Pourquoi ?** Nous utilisons le verbe `POST` car nous allons modifier la base de données.

**2. Le Traitement (Contrôleur)**
* **Fichier :** `app/Http/Controllers/Api/PresenceController.php`
* **Fonction :** `public function store(Request $request)`
* **Logique implémentée :**
    1.  **Réception :** On reçoit l'ID de la séance et un tableau d'IDs d'élèves présents (`[1, 5, 12]`).
    2.  **La Boucle de Traitement :** On parcourt tous les étudiants de la base.
    3.  **Mise à jour Intelligente :**
        * *Fonction clé :* `Presence::updateOrCreate(...)`
        * *Pourquoi ?* Cette fonction est cruciale pour l'UX. Si le prof valide une première fois, cela crée les lignes. S'il se corrige et valide à nouveau, cela **met à jour** les lignes existantes sans créer de doublons ni d'erreurs.
        * *Logique booléenne :* Si l'ID de l'étudiant est dans le tableau reçu -> `est_present = true`. Sinon -> `est_present = false`.

---

## 3. État Actuel du Projet

Le "Pont" est opérationnel.
* ✅ **Base de Données (Groupe 1) :** Les tables `modules`, `seances`, `users` et `presences` sont créées et peuplées via des Seeders.
* ✅ **Contrôleurs (Groupe 3) :** Les endpoints API répondent correctement aux requêtes du Diagramme de Séquence.
* ✅ **Frontend (Groupe 2) :** L'environnement React (Vite) est configuré et s'affiche sur la page d'accueil.

---

## 4. Instructions pour la suite

Chaque groupe doit maintenant intervenir sur ce socle commun :

**👉 Groupe 1 (Data)**
* Ne modifiez pas les noms des colonnes existantes (`seance_id`, `student_id`, `est_present`) sans prévenir, sinon le `PresenceController` plantera.

**👉 Groupe 2 (Frontend)**
* Migrez vos composants dans `resources/js/components`.
* Connectez vos formulaires :
    * Pour lire : `fetch('/api/seances/1')`
    * Pour écrire : `fetch('/api/appel/save', { method: 'POST', body: ... })`

**👉 Groupe 3 (Nous)**
* Nous assurons le support technique sur l'API et la gestion des erreurs (Codes HTTP 200, 404, 500).

---

> **Conclusion :** Le Backend est terminé et valide le Sprint 3. L'architecture respecte strictement la conception UML validée au début du projet.