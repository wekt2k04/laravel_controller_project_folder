# 🎨 Documentation Groupe VUE (View)

Ce document détaille l'interface utilisateur et la logique de présentation. Votre responsabilité est d'afficher les données et de capturer les actions utilisateur, sans vous soucier de la logique métier complexe ou du stockage.

## 📂 Fichiers Clés

### 1. Pages (`resources/js/pages/`)
Les écrans principaux de l'application.
*   **`Login.jsx` / `Register.jsx`** : Formulaires d'authentification.
*   **`Dashboard*.jsx`** : Tableaux de bord spécifiques par rôle (Étudiant, Prof, Admin).
*   **`Seances.jsx`** : Affichage de l'emploi du temps (récupéré via API).
*   **`Statistiques.jsx`** : Visualisation des graphiques (données calculées par le backend).
*   **`Annonces.jsx`, `Modules.jsx`, `Presence.jsx`** : Listes de données.

### 2. Composants (`resources/js/components/`)
*   **`Sidebar.jsx`** : Navigation latérale. S'adapte dynamiquement (affiche "Déconnexion", change les liens selon le rôle).
*   **`Layout.jsx`** : Structure commune (Sidebar + Zone de contenu).
*   **`ProtectedRoute`** (dans `Main.jsx`) : Sécurise l'accès aux pages (redirige si non connecté).

### 3. Configuration
*   **`Main.jsx`** : Point d'entrée, gestion du Routing (React Router).
*   **`axios`** : Librairie utilisée pour toutes les requêtes HTTP.

## 🖥️ Architecture Frontend

L'application est une **SPA (Single Page Application)**.
*   Le navigateur ne recharge jamais la page complète.
*   React gère le DOM virtuel pour des mises à jour rapides.
*   Les données sont stockées temporairement dans le `state` (useState) ou le `localStorage` (pour le token).

## 🤝 Interactions (Interface)

**Votre rôle :**
1.  **Demander** : Vous envoyez des requêtes HTTP (GET, POST) aux endpoints API fournis par le Contrôleur.
    *   *Exemple* : `axios.get('/api/seances')`
2.  **Afficher** : Vous recevez du JSON et vous le transformez en composants visuels (Tableaux, Cartes, Graphiques).
3.  **Envoyer** : Vous capturez les saisies (Formulaires) et les envoyez au Contrôleur.
    *   *Exemple* : `axios.post('/api/login', { email, password })`

**Ce que vous ignorez (Boîte Noire) :**
*   **La Base de Données** : Vous ne savez pas que c'est du SQLite ou du MySQL. Vous ne faites jamais de requêtes SQL.
*   **La Logique Métier** : Vous ne calculez pas les statistiques d'absence, vous affichez juste le chiffre que l'API vous donne.
