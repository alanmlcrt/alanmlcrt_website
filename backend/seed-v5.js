// backend/seed-v5.js
const { createStrapi } = require('@strapi/strapi');

async function seed() {
  console.log('--- Lancement du kernel Strapi pour seeding v5 ---');
  const instance = await createStrapi().load();

  try {
    const projects = [
      {
        title: "Application V'Lille Tracker",
        slug: "vlille-tracker",
        category: "Projet",
        date: "2024-03-01",
        content: `## Analyse des disponibilités V'Lille en temps réel

Ce projet repose sur une stack technique moderne pour répondre à une problématique de mobilité urbaine : **comment prévoir la disponibilité des vélos en libre-service ?**

### Architecture Technique

L'outil s'appuie sur trois piliers technologiques :
*   **n8n** : Automatisation de la récupération périodique des données via l'API Open Data de la MEL.
*   **Supabase** : Stockage persistant et historisation des données en temps réel.
*   **React Native** : Interface mobile pour la visualisation des stations et des prédictions.

### Objectifs et Résultats

L'objectif principal est l'**historisation des flux**. En accumulant des mois de données, le système permet d'identifier des patterns (heures de pointe, stations saturées) pour anticiper les besoins des usagers. 

C'est un projet qui lie les problématiques de **Data Engineering** (ETL) et d'**UX Design**.`
      },
      {
        title: "Bassin Acoustique Intelligent",
        slug: "bassin-acoustique",
        category: "Projet",
        date: "2024-06-15",
        content: `## Supervision IoT pour Infrastructures Acoustiques

Dans le cadre de projets critiques, la surveillance des constantes environnementales est primordiale. Ce projet déploie une infrastructure de supervision robuste pour des bassins de test acoustique.

### Stack IoT & Supervision

Le déploiement est entièrement conteneurisé pour assurer une portabilité maximale :
*   **Docker** : Orchestration des différents services (Mosquitto, Home Assistant, InfluxDB).
*   **MQTT** : Protocole de communication ultra-léger pour la remontée des capteurs IoT.
*   **Home Assistant** : Dashboard centralisé pour la visualisation et l'alerte en cas de dépassement de seuils.

### Apports du Projet

Grâce à cette infrastructure, les opérateurs peuvent suivre en temps réel la température, l'humidité et les niveaux sonores. Le système de notification automatique permet une réactivité immédiate sur des installations où la précision est un facteur clé de réussite.`
      }
    ];

    for (const data of projects) {
        // Find existing by slug
        const existing = await instance.documents('api::project.project').findMany({
            filters: { slug: data.slug },
            status: 'published'
        });

        if (existing && existing.length > 0) {
            console.log(`⚠️ Projet déjà existant : ${data.title}`);
            continue;
        }

        const project = await instance.documents('api::project.project').create({
            data: data,
            status: 'published'
        });
        console.log(`✅ Projet créé via Document Service : ${project.title} (${project.documentId})`);
    }

    console.log('\n🎉 Seeding terminé avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors du seeding :', error);
  } finally {
    await instance.destroy();
    process.exit(0);
  }
}

seed();
