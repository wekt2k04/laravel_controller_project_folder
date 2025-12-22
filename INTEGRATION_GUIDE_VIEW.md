C'est parti. Voici la documentation taillée sur mesure pour le **Groupe 2 (Frontend / React)**.

Elle est conçue pour les guider dans la migration de leur code "Mock" (fictif) vers ton infrastructure réelle, en évitant les pièges classiques de l'intégration Laravel/React.

Tu peux copier-coller ce bloc directement.

---

```markdown
# 🎨 GUIDE D'INTÉGRATION - GROUPE 2 (INTERFACE REACT)

**Version du document :** 1.0
**Contexte :** Projet "Smart Attendance" - Fusion Backend/Frontend

---

## 1. Vue d'ensemble : L'Architecture
Nous sommes passés d'un développement séparé à une architecture unifiée (Monolithe).
* **Le Serveur :** Laravel 11 (géré par le Groupe 3).
* **Le Client :** React (votre partie), servi via Vite.
* **Le Lien :** Une API REST qui remplace vos données fictives.

**Ce qui est déjà prêt pour vous :**
* L'environnement Node.js/Vite est configuré.
* Le point d'entrée React est actif sur la page d'accueil.
* Les routes API sont ouvertes et attendent vos requêtes.

---

## 2. Votre Zone de Travail
Vous n'avez plus besoin de dossier `src` séparé. Votre nouveau "chez-vous" se trouve dans le dossier **`resources/js/`**.

| Votre ancien dossier | Nouveau chemin dans le projet |
| :--- | :--- |
| `src/components/` | 📂 **`resources/js/components/`** |
| `src/pages/` | 📂 **`resources/js/pages/`** |
| `src/App.jsx` | 📄 **`resources/js/app.jsx`** (Point d'entrée principal) |
| `src/index.css` | 📄 **`resources/css/app.css`** |

---

## 3. Votre Mission : La Migration

Votre objectif est de déplacer vos composants existants et de les "brancher" sur le vrai système.

### ✅ Étape A : Copie des fichiers
1.  Copiez vos composants et pages dans les dossiers correspondants (`resources/js/...`).
2.  Mettez à jour vos `import` si les chemins ont légèrement changé.
3.  Configurez votre Router dans `app.jsx` pour gérer la navigation (Accueil, Détail Séance, etc.).

### ✅ Étape B : Connexion à l'API (Le plus important)
Fini les `const data = [...]`. Vous devez récupérer les vraies données du Groupe 1 via les contrôleurs du Groupe 3.

**Pour lire la liste des cours (GET) :**
```javascript
// Exemple dans useEffect
fetch('/api/seances')
    .then(res => res.json())
    .then(data => {
        console.log(data); // Regardez la structure dans la console !
        setSeances(data);
    });

```

**Pour récupérer le détail d'un cours + les élèves (GET) :**

```javascript
// URL : /api/seances/{id}
fetch(`/api/seances/${id}`)
    .then(res => res.json())
    .then(data => {
        // L'API renvoie un objet avec 2 clés :
        setSeance(data.seance);   // Infos du cours (Titre, Date...)
        setStudents(data.students); // Liste des étudiants pour l'appel
    });

```

**Pour valider l'appel (POST) :**

```javascript
// Envoi des IDs cochés
fetch('/api/appel/save', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        seance_id: 1,      // ID de la séance
        presences: [5, 12, 45] // Tableau des IDs d'élèves présents
    })
})
.then(response => {
    if (response.ok) alert("Appel enregistré !");
});

```

---

## 4. ⚠️ ZONE DE DANGER (À ne pas toucher)

Pour que la magie opère, respectez ces limites :

1. **Ne touchez pas au fichier `resources/views/welcome.blade.php`.** C'est lui qui contient la `<div id="app">` indispensable à React.
2. **Ne modifiez pas `routes/api.php`.** Si vous avez besoin d'une nouvelle route, demandez au Groupe 3.
3. **Attention aux noms des clés JSON.** L'API vous envoie `titre`, `date_debut`, `name`, `id`. Si votre code React attendait `title` ou `nom_etudiant`, vous devez adapter votre code React (ou demander une adaptation, mais c'est plus long).

---

## 5. 🛠️ Protocole de Vérification

Comment savoir si votre intégration fonctionne ?

**1. Lancer les moteurs**
Il faut DEUX terminaux ouverts en parallèle :

* Terminal 1 : `php artisan serve` (Backend)
* Terminal 2 : `npm run dev` (Frontend - Vite)

**2. Le Test Visuel**
Allez sur `http://127.0.0.1:8000`.

* Si votre page s'affiche : ✅ La migration des fichiers est bonne.
* Si vous voyez une page blanche : ❌ Ouvrez la console (F12). Souvent une erreur d'import ou de chemin.

**3. Le Test des Données**
Ouvrez l'onglet **Réseau (Network)** de l'inspecteur (F12) et rafraîchissez.

* Cherchez les requêtes vers `seances`.
* Si elles sont en rouge (404/500) : ❌ Problème d'URL ou serveur éteint.
* Si elles sont en vert (200) et contiennent du JSON : ✅ BRAVO ! Vous êtes connectés à la base de données.

---
## 6. 🏆 Conclusion
Vous avez maintenant les clés en main pour finaliser la vue. Une fois votre travail terminé, informez le à Maelainine afin qu'ils puissent continuer le développement de l'API en toute sérénité.