# 📋 Gestion des Tâches - Documentation Complète

Application web moderne de gestion des tâches d'équipe avec authentification JWT, interface React et API REST.

## 🚀 Démo Live
- **Frontend** : [À déployer sur Netlify/Vercel]
- **API Backend** : https://gestiondestaches-backend-1.onrender.com/api

## 📁 Structure du Projet

```
Projet Gestion_Taches/
├── backend/                 # API Node.js/Express
│   ├── src/
│   │   ├── controllers/     # Logique métier
│   │   ├── models/         # Modèles MongoDB
│   │   ├── routes/         # Routes API
│   │   ├── middleware/     # Middlewares (auth, validation)
│   │   └── validators/     # Schémas de validation Joi
│   └── server.js           # Point d'entrée
└── frontend/               # Interface React
    ├── src/
    │   ├── components/     # Composants React
    │   ├── utils/         # Utilitaires (API)
    │   └── App.jsx        # Composant principal
    └── public/            # Fichiers statiques
```

## 🛠️ Technologies Utilisées

### Backend
- **Node.js** + **Express.js** - Serveur web
- **MongoDB** + **Mongoose** - Base de données
- **JWT** - Authentification
- **Joi** - Validation des données
- **bcrypt** - Hashage des mots de passe
- **CORS** + **Helmet** - Sécurité

### Frontend
- **React 18** + **Vite** - Interface utilisateur
- **Axios** - Client HTTP
- **CSS3** - Styles modernes
- **PWA** - Application web progressive

## 📊 Modèles de Données

### User (Authentification)
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string (unique)",
  "password": "string (hashé)",
  "role": "admin | member",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Member (Équipe)
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "role": "string",
  "password": "string (hashé)",
  "createdBy": "ObjectId (User)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Task (Tâches)
```json
{
  "_id": "ObjectId",
  "title": "string",
  "description": "string?",
  "priority": "faible | moyenne | elevée",
  "status": "A_faire | en_cours | terminée",
  "dueDate": "Date?",
  "assignee": "ObjectId (Member)?",
  "createdBy": "ObjectId (User)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## 🔐 Authentification & Autorisation

### Rôles Utilisateurs
- **Admin** : Gestion complète (tâches + membres)
- **Member** : Gestion des tâches uniquement

### Workflow d'Authentification
1. **Inscription** → Crée un User (membre par défaut)
2. **Connexion** → Retourne un JWT token
3. **Accès** → Token requis pour toutes les routes protégées

## 🌐 API Endpoints

### Authentication
```http
POST /api/auth/register    # Inscription
POST /api/auth/login       # Connexion
GET  /api/auth/me          # Profil utilisateur
```

### Members (Admin uniquement)
```http
GET    /api/members        # Liste des membres
POST   /api/members        # Créer un membre
GET    /api/members/:id    # Détails d'un membre
PUT    /api/members/:id    # Modifier un membre
DELETE /api/members/:id    # Supprimer un membre
```

### Tasks
```http
GET    /api/tasks          # Liste des tâches
POST   /api/tasks          # Créer une tâche
GET    /api/tasks/:id      # Détails d'une tâche
PUT    /api/tasks/:id      # Modifier une tâche
DELETE /api/tasks/:id      # Supprimer une tâche
```

### Filtres & Pagination
```http
GET /api/tasks?status=A_faire&priority=elevée&page=1&limit=10&sort=-createdAt
GET /api/members?search=john&page=1&limit=10
```

## 🚀 Installation & Démarrage

### Prérequis
- Node.js 18+
- MongoDB (local ou Atlas)
- Git

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configurer les variables d'environnement
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Variables d'Environnement

#### Backend (.env)
```env
PORT=5000
MONGODB_URL=mongodb://localhost:27017/gestion-taches
JWT_SECRET=votre_secret_jwt_tres_securise
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📱 Guide d'Utilisation

### 1. Première Connexion
1. Ouvrir l'application
2. Cliquer sur "Inscription"
3. Remplir le formulaire (premier utilisateur = admin automatique)
4. Se connecter avec les identifiants

### 2. Gestion des Membres (Admin)
1. Aller dans l'onglet "Membres"
2. Cliquer "Nouveau Membre"
3. Remplir : nom, email, rôle, mot de passe
4. Sauvegarder

### 3. Gestion des Tâches
1. Aller dans l'onglet "Tâches"
2. Cliquer "Nouvelle Tâche"
3. Remplir les informations
4. Assigner à un membre
5. Définir priorité et échéance

### 4. Tableau de Bord
- Vue d'ensemble des statistiques
- Taux de completion
- Répartition par statut/priorité

## 🎨 Fonctionnalités Interface

### Composants Principaux
- **Dashboard** : Statistiques et métriques
- **TaskList** : Liste des tâches avec filtres
- **MemberList** : Gestion des membres d'équipe
- **Modales** : Formulaires de création/édition
- **Toast** : Notifications en temps réel

### Fonctionnalités UX
- ✅ Interface responsive (mobile/desktop)
- ✅ Notifications toast
- ✅ Modales de confirmation
- ✅ États de chargement
- ✅ Filtres en temps réel
- ✅ Pagination automatique

## 🔧 Déploiement

### Backend (Render)
1. Connecter le repository GitHub
2. Configurer les variables d'environnement
3. Déployer automatiquement

### Frontend (Netlify/Vercel)
```bash
npm run build
# Déployer le dossier dist/
```

### Configuration Production
```env
# Backend
NODE_ENV=production
MONGODB_URL=mongodb+srv://...
JWT_SECRET=secret_production_securise

# Frontend
VITE_API_URL=https://votre-api.onrender.com/api
```

## 🧪 Tests & Debug

### Test API
Ouvrir `frontend/debug.html` pour tester la connexion API.

### Logs Backend
```bash
# Développement
npm run dev

# Production
npm start
```

### Debug Frontend
```bash
# Console navigateur (F12)
# Vérifier les requêtes réseau
# Inspecter le localStorage pour le token JWT
```

## 🔒 Sécurité

### Mesures Implémentées
- ✅ Hashage bcrypt des mots de passe
- ✅ Tokens JWT avec expiration
- ✅ Validation Joi côté serveur
- ✅ CORS configuré
- ✅ Helmet pour les headers sécurisés
- ✅ Gestion des rôles et permissions

### Bonnes Pratiques
- Mots de passe forts requis
- Tokens stockés en localStorage (HTTPS requis)
- Validation côté client et serveur
- Gestion d'erreurs centralisée

## 📈 Performances

### Optimisations
- Pagination des listes
- Filtres côté serveur
- Lazy loading des composants
- Compression des réponses
- Cache des requêtes

## 🐛 Dépannage

### Problèmes Courants

#### "Rien ne s'affiche"
- Vérifier la console (F12)
- Tester l'API avec debug.html
- Vider le localStorage : `localStorage.clear()`

#### "Impossible de se connecter"
- Vérifier l'URL de l'API dans .env
- S'assurer que l'API Render est active
- Tester avec Postman/Insomnia

#### "Erreur CORS"
- Vérifier la configuration CORS backend
- S'assurer que l'origine frontend est autorisée

## 📞 Support

### Ressources
- **Documentation API** : Voir les endpoints ci-dessus
- **Code Source** : Repository GitHub
- **Issues** : Signaler les bugs via GitHub Issues

### Contact
- **Développeur** : [Votre nom]
- **Email** : [Votre email]
- **GitHub** : [Votre profil]

## 📄 Licence

MIT License - Libre d'utilisation pour projets personnels et commerciaux.

---

**Version** : 1.0.0  
**Dernière mise à jour** : Décembre 2024