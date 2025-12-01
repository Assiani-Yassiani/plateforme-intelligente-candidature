# 🔍 Plateforme intelligente de candidature (stages & emplois)

Cette application web permet de **faciliter la recherche de stages et d’emplois** et d’améliorer le matching entre **candidats** et **entreprises** grâce à un module d’intelligence artificielle basé sur le **NLP**.

Elle est développée avec **Flask** côté backend et intègre un moteur de similarité pour classer automatiquement les candidatures en fonction du poste visé.

---

## 🎯 Objectif du projet

- Centraliser les **offres de stages et d’emplois**
- Permettre aux **candidats** de déposer et suivre leurs candidatures
- Offrir aux **recruteurs** un espace pour publier des offres et consulter les profils
- Intégrer un module **NLP** pour :
  - analyser le contenu des CV et lettres de motivation
  - comparer leur contenu avec les fiches de poste
  - **classer automatiquement** les candidatures par **pertinence**

---

## 👥 Rôles principaux

### 👤 Candidat
- Création de compte et connexion
- Gestion du profil et du CV (upload ou formulaire)
- Recherche d’offres de stage / emploi
- Candidature en ligne à une offre
- Consultation du statut de ses candidatures

### 🏢 Entreprise / Recruteur
- Création de compte entreprise
- Publication d’offres (stage / emploi)
- Consultation de la liste de candidatures pour chaque offre
- Visualisation d’un **classement automatique** des candidats selon l’adéquation au poste

---

## 🤖 Module d’IA (NLP)

Un module d’intelligence artificielle basé sur le **traitement automatique du langage (NLP)** est intégré pour :

- extraire les informations clés des CV / descriptions de poste (compétences, mots-clés, expériences…)
- représenter les textes sous forme de **vecteurs** (embeddings, TF-IDF, etc.)
- calculer une **similarité** entre :
  - le contenu du CV du candidat
  - la fiche de poste
- générer un **score de pertinence** et **trier** les candidatures du plus adapté au moins adapté.

Ce module aide le recruteur à identifier rapidement les profils les plus compatibles.

---

## 🛠️ Technologies utilisées

- **Backend :** Spring Boot, Flask (Python), PostgreSQL  
- **Frontend :** Angular 16+  
- **NLP / IA :** NLP (Python)  
- **DevOps & outils :** Docker, Git, GitLab


## 📌 Statut du projet

Application web démontrant :

- la conception d’une **plateforme de recrutement** (stages/emplois),
- l’intégration de **Flask** pour le backend,
- l’utilisation de techniques **NLP** pour le **classement intelligent des candidatures**.

