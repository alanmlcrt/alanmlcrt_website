import fs from 'node:fs';
import path from 'node:path';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi } */) {},
  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    strapi.log.info('--- BOOTSTRAP STARTING ---');

    try {
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' }
      });

      if (publicRole) {
        const actions = ['api::project.project.find', 'api::project.project.findOne', 'api::about.about.find'];
        for (const action of actions) {
          const hasPerm = await strapi.db.query('plugin::users-permissions.permission').findOne({
            where: { role: publicRole.id, action }
          });
          if (!hasPerm) {
            await strapi.db.query('plugin::users-permissions.permission').create({
              data: { role: publicRole.id, action }
            });
          }
        }
      }
      
      // 3. Seed Projects First
      const projectEntries = await strapi.documents('api::project.project').findMany();
      if (!projectEntries || projectEntries.length === 0) {
          strapi.log.info('Seeding Projects data via Document API...');
          const projects = [
            {
              title: "Application V'Lille Tracker",
              slug: "vlille-tracker",
              category: "Projet",
              date: "2024-03-01",
              content: `## Analyse des disponibilités V'Lille en temps réel\n\nCe projet repose sur une stack technique moderne (n8n, Supabase, React Native) pour prévoir la disponibilité des vélos en libre-service via l'historisation des flux.`
            },
            {
              title: "Bassin Acoustique Intelligent",
              slug: "bassin-acoustique",
              category: "Projet",
              date: "2024-06-15",
              content: `## Supervision IoT pour Infrastructures Acoustiques\n\nDéploiement d'une stack Docker/MQTT pour la supervision de capteurs environnementaux et alertes critiques via Home Assistant.`
            }
          ];

          for (const p of projects) {
            await strapi.documents('api::project.project').create({
              data: p as any,
              status: 'published'
            });
          }
      }

      // 4. Seed About
      const aboutEntries = await strapi.documents('api::about.about').findMany();
      if (!aboutEntries || aboutEntries.length === 0) {
          strapi.log.info('Seeding About data via Document API...');
          await strapi.documents('api::about.about').create({
              data: {
                  heroTitle: 'ALAN MOLCRETTE',
                  heroSubtitle: 'Industries Connectées // IoT // Data Supervision',
                  seoTitle: 'Alan Molcrette | Ingénieur IoT et Data Supervision',
                  seoDescription: 'Portfolio d\'Alan Molcrette, ingénieur en électronique, IoT et supervision de données.',
                  email: 'molcrette.alan@gmail.com',
                  linkedinUrl: 'https://www.linkedin.com/in/alan-molcrette/',
                  profileApproach: "Rigueur, curiosité et autonomie me permettent de m'adapter rapidement à de nouveaux environnements technologiques complexes.",
                  profileQuote: "Mon parcours est guidé par une volonté de comprendre les systèmes dans leur globalité. De l'électronique pure au déploiement logiciel, je vois chaque projet comme un puzzle complexe à optimiser pour l'utilisateur final.",
                  experiences: [
                    { title: "MAINTENANCE & DÉV. POWER BI", company: "ENEDIS", date: "FÉVRIER 2026 — AUJOURD'HUI", description: "Modernisation des processus métier via l'évolution d'outils digitaux. Gain de temps et amélioration de l'expérience utilisateur.", isCurrent: true },
                    { title: "AMÉLIORATION SOLUTION DATAVIZ", company: "RTE", date: "SEPT. 2025 — DÉC. 2025", description: "Déploiement national de l'outil développé en stage. Extension des gains d'efficacité à l'échelle nationale.", isCurrent: false },
                    { title: "STAGE DATAVIZ & ETL", company: "RTE", date: "FÉVRIER 2025 — AOÛT 2025", description: "Développement d'outils avec Power BI et Python. Création d'ETL SQL/Python automatisant le traitement des données.", isCurrent: false },
                    { title: "RESEARCH STAGE (PIXHAWK/LORA)", company: "UQAR (CANADA)", date: "MAI 2024 — JUILLET 2024", description: "Contrôle de vol autonome Pixhawk et réseau mesh LoRa. Analyse de signaux série entre Pixhawk et ESP32.", isCurrent: false }
                  ],
                  skills: [
                    { label: "ESP32 / PI\nIOT PROTOCOLS", icon: "memory" },
                    { label: "POWER BI\nSUPERVISION", icon: "analytics" },
                    { label: "SQL / MONGO\nSUPABASE", icon: "database" },
                    { label: "PYTHON\nAUTOMATISATION", icon: "terminal" },
                    { label: "DOCKER\nCI/CD", icon: "layers" },
                    { label: "MQTT / LORA\nZIGBEE", icon: "hub" }
                  ],
                  educations: [
                    { title: "Diplôme d'Ingénieur en Électronique et Numérique.", school: "JUNIA ISEN, Lille", date: "2022 — 2025", description: "Diplôme d'Ingénieur en Électronique et Numérique." },
                    { title: "CPGE MPSI/PSI", school: "Lycée Robespierre, Arras", date: "2020 — 2022", description: "CPGE MPSI/PSI (Physique et Sciences de l'Ingénieur)." }
                  ],
                  interests: [
                    { label: "ASTRONOMIE", icon: "flare" },
                    { label: "COURSE À PIED", icon: "directions_run" },
                    { label: "VÉLO", icon: "directions_bike" },
                    { label: "PHOTOGRAPHIE", icon: "photo_camera" }
                  ],
                  languages: [
                    { name: "ANGLAIS", fluencyText: "NIVEAU TECHNIQUE", level: "B2", percentage: 75 },
                    { name: "ALLEMAND", fluencyText: "CONNAISSANCES", level: "A2", percentage: 40 }
                  ]
              },
              status: 'published'
          });
      }
    } catch (error) {
       strapi.log.error('Error in bootstrap seeding: ' + error.message);
    }
    strapi.log.info('--- BOOTSTRAP FINISHED ---');
  },
};


