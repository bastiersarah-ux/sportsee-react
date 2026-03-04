# SportSee – Dashboard de suivi sportif

💡 **Important**
Le serveur à utiliser **n’est pas** l’URL suivante :

```
https://github.com/OpenClassrooms-Student-Center/P6JS/
```

Un **fork** du projet a été créé afin de corriger certains problèmes liés aux données. Utilisez donc ce dépôt comme backend :

👉 `https://github.com/bastiersarah-ux/P6JS`

## 🚀 Présentation

Ce dépôt contient l’application frontend développée avec **React + TypeScript**. Elle s’appuie sur React Router pour la navigation et interagit avec le backend mentionné ci-dessus pour récupérer les profils utilisateurs et leurs statistiques.

## 📦 Installation

1. Cloner ce dépôt :
   ```bash
   git clone https://github.com/bastiersarah-ux/sportsee-react.git
   cd sportsee-react
   ```
2. Installer les dépendances :
   ```bash
   npm install
   ```

## 🔧 Développement

Lancer le serveur de développement avec HMR :

```bash
npm run dev
```

L’application est disponible sur : `http://localhost:4000`.

> **N’oubliez pas** de démarrer également le backend depuis le fork mentionné ci‑dessus.

### Utiliser une API mockée

Pour les tests ou le développement sans serveur réel, un mock des données peut être utilisé. Contrôlez l’URL de l’API via les fichiers d’environnement :

- `.env.development` : `VITE_API_URL` pointe par défaut vers `http://localhost:8000` (backend réel).
- `.env.test` : laissez vide ou mettez l’URL du service de mock (avec Postman par exemple).

Un script est également prévu pour lancer le projet en mode test :

```bash
npm run dev:test
```

Cela démarre Vite en mode `test` et active l’API mock (assurez-vous de configurer la variable d’environnement avant de lancer).

Vous pouvez basculer rapidement entre le backend réel et le mock en éditant ces fichiers ou en ajoutant une nouvelle configuration si nécessaire.

## 📦 Build de production

Pour générer les fichiers de production :

```bash
npm run build
```

Récupérez ensuite les dossiers `build/client` et `build/server` pour déployer.

## 🐳 Docker (optionnel)

Construire et lancer le conteneur :

```bash
docker build -t sportsee-react .
docker run -p 3000:3000 sportsee-react
```

Utilisable sur n’importe quelle plateforme supportant Docker.

## 🎨 Styling

Le projet est configuré avec **[Tailwind CSS](https://tailwindcss.com/)** et **[DaisyUI](https://daisyui.com/)**.

---

✨ Bonne continuation avec le dashboard SportSee !
