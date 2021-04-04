# Projet 7 - Openclassrooms - parcours [Développeur.se Web Fullstack](https://openclassrooms.com/fr/paths/185-developpeur-web)

📌  Créer un réseau social d'entreprise pour les employés de la société (fictive) Groupomania

## Scénario du projet

📌  Développement d'un réseau social d'entreprise.

Mon rôle est de développer les parties **frontend** et **backend** de l'application.

## Compétences évaluées

- Authentifier un utilisateur et maintenir sa session
- Implémenter un stockage de données sécurisé en utilisant SQL
- Gérer un stockage de données à l'aide de SQL
- Presonnaliser le contenu envoyé à un client web

## Progression

En attente de soutenance  🚀

## Visual Studio Code  🖥️

## Démarrage

### Les instructions suivantes vous permettrons d'installer le projet

- Afin de cloner le projet, entrez la ligne de commande suivante : 
```npm clone https://github.com/Helene-mb/OC-P7-SocialNetwork.git```
- Backend : 
```cd backend```
```npm install```
```nodemon server```
- Frontend : 
```cd frontend```
```npm install```
```npm run serve```

## Backend

- serveur **Node.js**
- base de données **MySQL**
- modélisation de la bdd avec **Workbench**
- framework **Express**
- **API REST**
- sécurité **RGPD** & **OSWAP**

## Frontend

- Design libre réalisé avec **TailwindCSS**
- **Vue.js**
- **Vue Router**
- **Vuex**
- **Axios**

## Sécurités mises en place

- hashage du mdp user avec **bcrypt**
- utlisation de variables d'environnement pour les données sensibles avec **dotenv**
- création d'un fichier **.env**  (voir .env.exemple) pour protéger les codes secrets et chemins vers la BDD MySQL
- authentification du user par token avec **jsonwentoken**
- sécurisation de l'application Express en définissant divers en-têtes HTTP avec **helmet** [équivaut à 11 protections](https://www.npmjs.com/package/helmet)
- création d'un schéma de vérification de mot de passe robuste avec **password-validator**
- prévention face aux attaques de force brute avec **Express Rate Limit**
