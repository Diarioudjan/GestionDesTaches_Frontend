# 🚀 Guide de Déploiement

Instructions complètes pour déployer l'application en production.

## 📋 Prérequis

- Compte GitHub
- Compte MongoDB Atlas
- Compte Render (backend)
- Compte Netlify ou Vercel (frontend)

## 🗄️ Base de Données - MongoDB Atlas

### 1. Créer un Cluster
1. Aller sur [MongoDB Atlas](https://cloud.mongodb.com)
2. Créer un compte / Se connecter
3. Cliquer **"Create a New Cluster"**
4. Choisir **"Shared"** (gratuit)
5. Sélectionner une région proche
6. Cliquer **"Create Cluster"**

### 2. Configuration Sécurité
1. **Database Access** :
   - Cliquer **"Add New Database User"**
   - Username : `taskmanager`
   - Password : Générer un mot de passe fort
   - Rôle : `Read and write to any database`

2. **Network Access** :
   - Cliquer **"Add IP Address"**
   - Choisir **"Allow Access from Anywhere"** (`0.0.0.0/0`)

### 3. Obtenir l'URL de Connexion
1. Cliquer **"Connect"** sur votre cluster
2. Choisir **"Connect your application"**
3. Copier l'URL de connexion
4. Remplacer `<password>` par votre mot de passe

```
mongodb+srv://taskmanager:<password>@cluster0.xxxxx.mongodb.net/gestion-taches?retryWrites=true&w=majority
```

## 🖥️ Backend - Render

### 1. Préparer le Repository
```bash
# Pousser le code sur GitHub
git add .
git commit -m "Prêt pour déploiement"
git push origin main
```

### 2. Déployer sur Render
1. Aller sur [Render](https://render.com)
2. Se connecter avec GitHub
3. Cliquer **"New +"** → **"Web Service"**
4. Connecter votre repository
5. Configuration :
   - **Name** : `gestion-taches-backend`
   - **Environment** : `Node`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
   - **Instance Type** : `Free`

### 3. Variables d'Environnement
Dans Render, aller dans **Environment** et ajouter :

```env
NODE_ENV=production
PORT=10000
MONGODB_URL=mongodb+srv://taskmanager:VOTRE_PASSWORD@cluster0.xxxxx.mongodb.net/gestion-taches
JWT_SECRET=votre_secret_jwt_production_tres_securise_64_caracteres_minimum
JWT_EXPIRES_IN=7d
```

### 4. Déploiement
1. Cliquer **"Create Web Service"**
2. Attendre le déploiement (5-10 minutes)
3. Noter l'URL : `https://votre-app.onrender.com`

## 🌐 Frontend - Netlify

### 1. Préparer le Build
```bash
cd frontend

# Configurer l'URL de production
echo "VITE_API_URL=https://votre-app.onrender.com/api" > .env.production

# Build de production
npm run build
```

### 2. Déployer sur Netlify
1. Aller sur [Netlify](https://netlify.com)
2. Se connecter avec GitHub
3. Cliquer **"Add new site"** → **"Import an existing project"**
4. Choisir GitHub et votre repository
5. Configuration :
   - **Base directory** : `frontend`
   - **Build command** : `npm run build`
   - **Publish directory** : `frontend/dist`

### 3. Variables d'Environnement
Dans Netlify, aller dans **Site settings** → **Environment variables** :

```env
VITE_API_URL=https://votre-app.onrender.com/api
```

### 4. Configuration Redirects
Créer `frontend/public/_redirects` :
```
/*    /index.html   200
```

## 🔧 Configuration CORS

Dans votre backend, mettre à jour la configuration CORS :

```javascript
// backend/src/app.js
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://votre-app.netlify.app',
    'https://votre-domaine.com'
  ],
  credentials: true
}
app.use(cors(corsOptions))
```

## ✅ Vérification du Déploiement

### 1. Tester l'API
```bash
curl https://votre-app.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'
```

### 2. Tester le Frontend
1. Ouvrir l'URL Netlify
2. Tester l'inscription/connexion
3. Vérifier les fonctionnalités

## 🔄 Déploiement Automatique

### GitHub Actions (Optionnel)
Créer `.github/workflows/deploy.yml` :

```yaml
name: Deploy
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      # Backend tests
      - name: Test Backend
        run: |
          cd backend
          npm install
          npm test
      
      # Frontend build
      - name: Build Frontend
        run: |
          cd frontend
          npm install
          npm run build
```

## 🌍 Domaine Personnalisé

### Netlify
1. **Site settings** → **Domain management**
2. Cliquer **"Add custom domain"**
3. Suivre les instructions DNS

### Render
1. **Settings** → **Custom Domains**
2. Ajouter votre domaine
3. Configurer les enregistrements DNS

## 📊 Monitoring

### Render
- **Logs** : Voir les logs en temps réel
- **Metrics** : CPU, mémoire, requêtes
- **Health checks** : Surveillance automatique

### Netlify
- **Analytics** : Trafic et performance
- **Functions** : Logs des fonctions
- **Deploy logs** : Historique des déploiements

## 🔒 Sécurité Production

### Variables Sensibles
- Utiliser des secrets forts (64+ caractères)
- Ne jamais commiter les fichiers `.env`
- Utiliser HTTPS uniquement

### Base de Données
- Activer l'authentification MongoDB
- Restreindre les IPs si possible
- Sauvegardes automatiques

### API
- Rate limiting activé
- CORS configuré correctement
- Headers de sécurité (Helmet)

## 🐛 Dépannage

### Backend ne démarre pas
1. Vérifier les logs Render
2. Vérifier les variables d'environnement
3. Tester la connexion MongoDB

### Frontend ne se connecte pas
1. Vérifier l'URL API dans .env.production
2. Tester l'API avec curl/Postman
3. Vérifier la console navigateur

### Erreurs CORS
1. Vérifier la configuration CORS backend
2. S'assurer que l'URL frontend est autorisée
3. Redéployer après modification

## 📈 Optimisations

### Performance
- Activer la compression gzip
- Utiliser un CDN pour les assets
- Optimiser les images

### SEO
- Ajouter les meta tags
- Configurer le sitemap
- Optimiser les performances

## 💰 Coûts

### Gratuit
- **MongoDB Atlas** : 512MB gratuit
- **Render** : 750h/mois gratuit
- **Netlify** : 100GB/mois gratuit

### Payant (si nécessaire)
- **MongoDB Atlas** : À partir de $9/mois
- **Render** : À partir de $7/mois
- **Netlify** : À partir de $19/mois

---

**Votre application est maintenant en production ! 🎉**

URLs finales :
- **Frontend** : https://votre-app.netlify.app
- **API** : https://votre-app.onrender.com/api