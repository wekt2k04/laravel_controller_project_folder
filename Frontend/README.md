# 📘 Projet – Application de Gestion Académique

## 🧩 Présentation générale

Ce projet consiste à développer une **application web de gestion académique** destinée à trois types d’utilisateurs :

* **Étudiant**
* **Enseignant**
* **Administrateur**

L’application vise à centraliser plusieurs services académiques dans une seule plateforme moderne et intuitive (modules, séances, présence, documents, annonces, statistiques).

---

## 🎯 Objectif du (Front-End)


* Mettre en place l’environnement de développement
* Structurer le projet React
* Créer les pages principales (UI statique)
* Mettre en place la navigation
* Préparer les maquettes UI/UX (Figma – étape à venir)

⚠️ Aucun Back-End ni logique métier n’est intégré à ce stade.

---

## 🛠️ Technologies utilisées

* **React** (avec Vite)
* **Tailwind CSS** (design et mise en forme)
* **React Router DOM** (navigation)
* **Git & GitHub** (gestion de versions et collaboration)

---

## 📁 Structure du projet

```text
src/
 ├─ assets/            # Images et ressources
 ├─ components/        # Composants réutilisables
 │   ├─ Sidebar.jsx
 │   ├─ Header.jsx
 │   └─ Layout.jsx
 ├─ pages/             # Pages principales
 │   ├─ Login.jsx
 │   ├─ DashboardEtudiant.jsx
 │   ├─ DashboardEnseignant.jsx
 │   ├─ DashboardAdmin.jsx
 │   ├─ Modules.jsx
 │   ├─ Seances.jsx
 │   ├─ Presence.jsx
 │   ├─ Documents.jsx
 │   ├─ Annonces.jsx
 │   └─ Statistiques.jsx
 ├─ styles/
 │   └─ index.css
 ├─ App.jsx
 └─ main.jsx
```

Cette structure permet une bonne maintenabilité et une évolution facile du projet.

---

## 🧱 Layout général

Un **Layout global** a été mis en place afin d’unifier l’interface :

* **Sidebar** : navigation latérale
* **Header** : barre supérieure
* **Zone de contenu** : affichage des pages

Toutes les pages héritent de ce layout pour garantir une cohérence visuelle.

---

## 📄 Pages réalisées (UI statique)

Les pages suivantes ont été créées côté Front-End (sans logique métier) :

* Page Login
* Dashboard Étudiant
* Dashboard Enseignant
* Dashboard Administrateur
* Page Modules
* Page Séances
* Page Présence
* Page Documents
* Page Annonces
* Page Statistiques (enseignant)

Ces pages contiennent uniquement des éléments visuels (cards, tableaux, boutons).

---

## 🔀 Navigation (Routing)

La navigation est gérée avec **React Router DOM**.

Exemples de routes :

* `/login`
* `/etudiant`
* `/enseignant`
* `/admin`
* `/modules`
* `/seances`
* `/presence`
* `/documents`
* `/annonces`
* `/statistiques`

Le routing permet de simuler le parcours utilisateur selon le rôle.

---

## 🎨 Maquettes UI/UX (Figma – à venir)

Les maquettes Figma ne sont pas encore réalisées.

Cette étape consistera à :

* Créer les maquettes de toutes les pages
* Définir la palette de couleurs
* Choisir la typographie
* Préparer le design responsive (desktop / mobile)

Cette phase servira de référence visuelle pour améliorer l’interface.

---

## 📌 État actuel du projet

* ✅ Environnement React opérationnel
* ✅ Structure du projet mise en place
* ✅ Layout global fonctionnel
* ✅ Pages Front-End créées (UI statique)
* ⏳ Maquettes Figma en attente

---

## 🚀 Prochaines étapes (Sprint 2)

* Finalisation des maquettes UI/UX (Figma)
* Amélioration du design
* Intégration de l’authentification
* Connexion au Back-End (API, base de données)

---

📌 *Ce projet est développé de manière progressive selon une approche agile (Scrum).*