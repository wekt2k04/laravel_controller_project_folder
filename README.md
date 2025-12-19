# 🎓 ENSA Smart Attendance - Socle Technique Unifié

> **Version :** Sprint 3 (Finalisation Backend & Architecture)
> **Stack :** Laravel 11 (API) + React (Frontend) + MySQL

---

## 1. La Problématique
Le projet vise à digitaliser la gestion de présence à l'ENSA.
**Le défi technique :** Nous avions trois groupes travaillant séparément sur des briques différentes (Base de données, Interface React, Logique Métier).
**La solution :** Ce dépôt est le **Monolithe** qui réunit tout le monde. Il sert d'API REST pour le Backend et d'hôte pour l'application React (via Vite).

---

## 2. L'Architecture : Qui a fait quoi ?

### 🧱 Groupe 1 : La Fondation (Modèle & Data)
Ils ont structuré la mémoire de l'application.
* **Tables :** `Users` (avec distinction Prof/Étudiant), `Modules`, `Seances`, `Presences`.
* **Données :** Création de Seeders pour générer 50 étudiants fictifs et des cours de test afin de ne pas développer "à l'aveugle".

### 🎨 Groupe 2 : Le Visage (Vue)
Ils ont conçu l'expérience utilisateur.
* **Tech :** React.js avec Tailwind CSS.
* **Structure :** Une "Single Page Application" (SPA) fluide.
* **Intégration :** Au lieu d'être un projet à part, leur code vit désormais dans `resources/js` pour être compilé par Laravel Vite.

### 🧠 Groupe 3 : Le Chef d'Orchestre (Contrôleur)
C'est le cœur de ce dépôt. Nous avons construit le "Pont" entre la base de données et React.
* **Transformation :** Abandon des vues `Blade` classiques au profit d'une **API REST**.
* **Logique :** Réception des requêtes React -> Interrogation de la BDD -> Réponse en JSON.

---

## 3. Focus Technique : La Logique du Groupe 3 (Ce qui a été fait)

Pour que le système fonctionne, nous avons implémenté une logique stricte dans le dossier `app/Http/Controllers/Api`.

### 🔗 Le Routage (`routes/api.php`)
Nous avons ouvert des portes d'entrée spécifiques pour le Frontend :
* `GET /api/seances` : Pour le tableau de bord.
* `GET /api/seances/{id}` : Pour la page d'appel.
* `POST /api/appel/save` : Pour enregistrer les présences.

### 📡 SeanceController (Lecture)
C'est le distributeur d'informations.
* **Problème résolu :** Le Frontend a besoin d'afficher le module associé à une séance, et la liste des élèves pour les cases à cocher.
* **Solution :** Utilisation de l'Eager Loading Eloquent (`with('module')`) pour éviter de faire 50 requêtes SQL.
* **Rendu :** Envoie un objet JSON complet contenant les détails du cours ET la liste des étudiants triés.

### 💾 PresenceController (Écriture)
C'est le garant des données.
* **Problème résolu :** Gérer l'enregistrement de masse (une classe entière) et la modification (si le prof se trompe).
* **Logique :**
    1.  Reçoit un tableau d'IDs (`presences: [1, 5, 12]`).
    2.  Parcourt tous les étudiants de la base.
    3.  Utilise `updateOrCreate` : Si l'étudiant est dans la liste reçue -> Présent. Sinon -> Absent.
    4.  Renvoie des statistiques immédiates (ex: "45 présents, 5 absents").

---

## 4. Rendu Final & État Actuel

À la fin de ce Sprint 3, le projet est **pleinement fonctionnel** techniquement :
1.  ✅ **Base de données :** Connectée, migrée et peuplée.
2.  ✅ **API Backend :** Testée et opérationnelle (envoie/reçoit du JSON).
3.  ✅ **Environnement Frontend :** React est installé, configuré avec Vite, et s'affiche sur la page d'accueil.

---

## 5. Next Steps : Ce que chaque groupe doit faire

Maintenant que le squelette est solide, chacun doit venir y greffer ses muscles.

### 👉 Pour le Groupe 1
* **Action :** Vérifiez les fichiers dans `database/migrations`.
* **Attention :** Si vous changez le nom d'une colonne maintenant, vous casserez l'API du Groupe 3. Concertation obligatoire !

### 👉 Pour le Groupe 2
* **Action :** Migrez vos composants React.
    * Copiez vos fichiers de `src/components` vers `resources/js/components`.
    * Copiez vos pages vers `resources/js/pages`.
* **Connexion :** Remplacez vos données fictives (mock) par des appels `fetch('/api/seances')`.

### 👉 Pour le Groupe 3 (Nous)
* **Action :** Support technique.
* **Mission :** Aider le Groupe 2 à debugger les appels API et surveiller les logs du serveur.

---

## 🏆 Conclusion

Le **Sprint 3 est validé**.
Nous sommes passés de trois entités séparées à une architecture unifiée **Laravel API + React**. La logique de contrôle est en place, les données circulent. Il ne reste plus qu'à habiller le tout avec l'interface finale du Groupe 2.

*Prêt pour la démo finale.*