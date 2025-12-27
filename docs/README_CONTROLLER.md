# ⚙️ Documentation Groupe CONTRÔLEUR (Controller)

Ce document détaille la logique de contrôle et l'API. Votre responsabilité est d'orchestrer les échanges : vous recevez les demandes de la Vue, interrogez le Modèle, et renvoyez une réponse formatée.

## 📂 Fichiers Clés

### 1. Contrôleurs API (`app/Http/Controllers/Api/`)
Le "cerveau" qui traite les requêtes.
*   **`AuthController.php`** :
    *   Gère `login`, `register`, `logout`.
    *   Utilise **Laravel Sanctum** pour générer/révoquer les tokens de sécurité.
*   **`SeanceController.php`** :
    *   CRUD pour les séances.
    *   Renvoie les données formatées (avec relations `module`, `filiere`).
*   **`StatistiqueController.php`** :
    *   *Logique complexe* : Calcule les taux d'absences et d'avancement en agrégeant les données des modèles `Presence` et `Seance`.
*   **`FiliereController.php`, `AnnonceController.php`** :
    *   Endpoints de lecture pour alimenter les listes du Frontend.

### 2. Routage (`routes/api.php`)
La "tour de contrôle" qui dirige les requêtes HTTP vers le bon contrôleur.
*   Définit les endpoints publics (`/login`, `/register`).
*   Définit les endpoints protégés (`middleware('auth:sanctum')`).

## 🧠 Logique de Traitement

1.  **Réception** : Une requête HTTP arrive (ex: `POST /api/login`).
2.  **Validation** : Le contrôleur vérifie les données entrantes (ex: l'email est-il valide ?).
3.  **Exécution** :
    *   Appelle le Modèle pour chercher/modifier des données (ex: `User::where('email', ...)`).
    *   Effectue des calculs ou de la logique métier.
4.  **Réponse** : Renvoie une réponse JSON standardisée (Code 200 + Données, ou Code 401 + Erreur).

## 🤝 Interactions (Interface)

**Votre rôle :**
*   Être le point d'entrée unique pour la Vue.
*   Garantir que seules les données valides atteignent le Modèle.
*   Protéger l'accès aux données (Authentification).

**Ce que vous ignorez (Boîte Noire) :**
*   **L'Interface Utilisateur** : Vous ne savez pas si la Vue est une appli React, Mobile ou un script curl. Vous renvoyez juste du JSON.
*   **Le Stockage Physique** : Vous utilisez Eloquent sans vous soucier de comment la base de données stocke les fichiers sur le disque.
