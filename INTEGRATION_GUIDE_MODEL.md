# 🗄️ GUIDE D'INTÉGRATION - GROUPE 1 (MODÈLES & DONNÉES)

**Version du document :** 1.0
**Contexte :** Projet "Smart Attendance" - Fusion des groupes

---

## 1. Vue d'ensemble : Ce qui a été fait
Pour permettre le développement parallèle de l'interface (Groupe 2) et de la logique (Groupe 3), nous avons mis en place une **architecture socle** sur Laravel.

Ce projet contient déjà :
* Une structure de base de données fonctionnelle (Migrations).
* Des relations intelligentes entre les objets (Modèles Eloquent).
* Un jeu de fausses données pour tester l'application (Seeders).

**Pourquoi vos fichiers sont-ils déjà là ?**
Nous avions besoin de tables "physiques" pour construire l'API. Nous avons créé des versions minimalistes de vos modèles (`User`, `Module`, `Seance`, `Presence`). **C'est maintenant à vous de reprendre la main dessus.**

---

## 2. Votre Zone de Travail
Vous avez la responsabilité exclusive des dossiers suivants :

* 📂 **`database/migrations/`** : C'est ici que vous définissez la structure des tables.
* 📂 **`app/Models/`** : C'est ici que vous définissez les relations et les règles métier.
* 📂 **`database/seeders/`** : C'est ici que vous gérez les données de test.

---

## 3. Ce qui manque / Votre Mission

Votre objectif est de transformer ce "squelette" en une base de données robuste, conforme à votre conception UML finale.

### ✅ Liste des tâches à accomplir :
- [ ] **Audit des Migrations :** Ouvrez les fichiers dans `database/migrations`. Vérifiez les types de données (`string` vs `text`, `date` vs `datetime`). Ajoutez vos contraintes (ex: `nullable()`, `unique()`).
- [ ] **Audit des Modèles :** Ouvrez `app/Models`. Vérifiez que les relations (`hasMany`, `belongsTo`) correspondent bien à votre logique.
- [ ] **Enrichissement :** Si vous aviez prévu d'autres tables (ex: `Salles`, `Filieres`), créez-les maintenant :
    ```bash
    php artisan make:model NomDuModele -m
    ```
- [ ] **Données de test :** Améliorez le fichier `database/seeders/DatabaseSeeder.php` si vous voulez des scénarios plus complexes (ex: un cours avec 0 étudiants, un cours déjà validé, etc.).

---

## 4. ⚠️ ZONE DE DANGER (Lisez attentivement)

Le Groupe 3 (Contrôleurs) et le Groupe 2 (Interface) dépendent de certains noms de colonnes précis pour fonctionner.

**INTERDICTION DE RENOMMER OU SUPPRIMER ces colonnes sans concertation :**

| Table | Colonne Critique | Pourquoi ? |
| :--- | :--- | :--- |
| `users` | **`role`** | Sert à distinguer Prof vs Étudiant pour l'affichage. |
| `seances` | **`module_id`** | Lie le cours à sa matière. |
| `presences` | **`seance_id`** | Indispensable pour l'appel. |
| `presences` | **`student_id`** | Identifie l'élève (ne pas renommer en `id_etudiant`). |
| `presences` | **`est_present`** | Booléen (true/false) utilisé par les checkbox React. |

> **Note :** Vous pouvez *ajouter* autant de nouvelles colonnes que vous voulez. Mais ne touchez pas à celles-ci sous peine de casser l'application ("Erreur 500").

---

## 5. 🛠️ Protocole de Vérification (Comment tester votre travail ?)

À chaque fois que vous modifiez une migration ou un modèle, vous devez vérifier que le système tient le coup. Voici la procédure officielle :

**Étape 1 : Relancer la base de données**
Dans votre terminal, lancez cette commande qui "écrase et reconstruit" tout :
```bash
php artisan migrate:fresh --seed

```

* **Si c'est VERT** (Done) : Votre structure SQL est valide.
* **Si c'est ROUGE** : Lisez l'erreur, corrigez votre fichier de migration, et relancez.

**Étape 2 : Vérifier l'API (Le test ultime)**
Une fois la commande précédente réussie :

1. Lancez le serveur : `php artisan serve`
2. Ouvrez votre navigateur sur : `http://127.0.0.1:8000/api/seances/1`

* **Si vous voyez du code JSON (texte sur fond blanc/noir)** avec les détails du cours et la liste des étudiants : **BRAVO !** Vos modifications sont valides et compatibles avec le reste du projet.
* **Si vous voyez une "Erreur 500"** : Vous avez probablement renommé une colonne critique ou cassé une relation. Revenez en arrière.

---
## 6. 🏆 Conclusion
Vous avez maintenant les clés en main pour finaliser la base de données. Une fois votre travail terminé, informez le à Maelainine afin qu'ils puissent continuer le développement de l'API en toute sérénité.