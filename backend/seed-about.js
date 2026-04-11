// Seed script - run with: node seed-about.js
const Database = require('better-sqlite3');
const path = require('path');
const crypto = require('crypto');

const db = new Database(path.join(__dirname, '.tmp', 'data.db'));
const now = new Date().toISOString();
const docId = crypto.randomBytes(12).toString('hex');

db.prepare('BEGIN').run();

try {
  // --- 1. Insert the main "about" single type ---
  const about = db.prepare(`
    INSERT INTO abouts (document_id, hero_title, hero_subtitle, email, linkedin_url, profile_summary, profile_approach, profile_objective, profile_quote, created_at, updated_at, published_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    docId,
    'ALAN MOLCRETTE',
    'Industries Connectées // IoT // Data Supervision',
    'molcrette.alan@gmail.com',
    'https://www.linkedin.com/in/alan-molcrette/',
    "Ingénieur diplômé en électronique et informatique, spécialisé en IoT. Je souhaite mettre mes compétences au service de projets innovants au sein d'industries connectées pour optimiser les processus et valoriser la donnée.",
    "Rigueur, curiosité et autonomie me permettent de m'adapter rapidement à de nouveaux environnements technologiques complexes.",
    "Contribuer au déploiement de solutions robustes pour l'automatisation et la supervision de flux de données critiques.",
    "Mon parcours est guidé par une volonté de comprendre les systèmes dans leur globalité. De l'électronique pure au déploiement logiciel, je vois chaque projet comme un puzzle complexe à optimiser pour l'utilisateur final.",
    now, now, now
  );

  const aboutId = about.lastInsertRowid;
  console.log('✅ About record created with ID:', aboutId);

  // --- 2. Insert Experiences ---
  const experiences = [
    { title: "MAINTENANCE & DÉV. POWER BI", company: "ENEDIS", date: "FÉVRIER 2026 — AUJOURD'HUI", description: "Modernisation des processus métier via l'évolution d'outils digitaux. Gain de temps et amélioration de l'expérience utilisateur.", isCurrent: 1 },
    { title: "AMÉLIORATION SOLUTION DATAVIZ", company: "RTE", date: "SEPT. 2025 — DÉC. 2025", description: "Déploiement national de l'outil développé en stage. Extension des gains d'efficacité à l'échelle nationale.", isCurrent: 0 },
    { title: "STAGE DATAVIZ & ETL", company: "RTE", date: "FÉVRIER 2025 — AOÛT 2025", description: "Développement d'outils avec Power BI et Python. Création d'ETL SQL/Python automatisant le traitement des données.", isCurrent: 0 },
    { title: "RESEARCH STAGE (PIXHAWK/LORA)", company: "UQAR (CANADA)", date: "MAI 2024 — JUILLET 2024", description: "Contrôle de vol autonome Pixhawk et réseau mesh LoRa. Analyse de signaux série entre Pixhawk et ESP32.", isCurrent: 0 },
  ];

  for (let i = 0; i < experiences.length; i++) {
    const exp = experiences[i];
    const cmp = db.prepare(`INSERT INTO components_about_experiences (title, company, date, description, is_current) VALUES (?, ?, ?, ?, ?)`).run(exp.title, exp.company, exp.date, exp.description, exp.isCurrent);
    db.prepare(`INSERT INTO abouts_cmps (entity_id, cmp_id, component_type, field, "order") VALUES (?, ?, ?, ?, ?)`).run(aboutId, cmp.lastInsertRowid, 'about.experience', 'experiences', i + 1);
  }
  console.log('✅ Experiences inserted:', experiences.length);

  // --- 3. Insert Skills ---
  const skills = [
    { label: "ESP32 / PI\nIOT PROTOCOLS", icon: "memory" },
    { label: "POWER BI\nSUPERVISION", icon: "analytics" },
    { label: "SQL / MONGO\nSUPABASE", icon: "database" },
    { label: "PYTHON\nAUTOMATISATION", icon: "terminal" },
    { label: "DOCKER\nCI/CD", icon: "container" },
    { label: "MQTT / LORA\nZIGBEE", icon: "hub" },
  ];

  for (let i = 0; i < skills.length; i++) {
    const skill = skills[i];
    const cmp = db.prepare(`INSERT INTO components_about_skills (label, icon) VALUES (?, ?)`).run(skill.label, skill.icon);
    db.prepare(`INSERT INTO abouts_cmps (entity_id, cmp_id, component_type, field, "order") VALUES (?, ?, ?, ?, ?)`).run(aboutId, cmp.lastInsertRowid, 'about.skill', 'skills', i + 1);
  }
  console.log('✅ Skills inserted:', skills.length);

  // --- 4. Insert Educations ---
  const educations = [
    { title: "Diplôme d'Ingénieur en Électronique et Numérique.", school: "JUNIA ISEN, Lille", date: "2022 — 2025", description: "Diplôme d'Ingénieur en Électronique et Numérique." },
    { title: "CPGE MPSI/PSI", school: "Lycée Robespierre, Arras", date: "2020 — 2022", description: "CPGE MPSI/PSI (Physique et Sciences de l'Ingénieur)." },
  ];

  for (let i = 0; i < educations.length; i++) {
    const edu = educations[i];
    const cmp = db.prepare(`INSERT INTO components_about_educations (title, school, date, description) VALUES (?, ?, ?, ?)`).run(edu.title, edu.school, edu.date, edu.description);
    db.prepare(`INSERT INTO abouts_cmps (entity_id, cmp_id, component_type, field, "order") VALUES (?, ?, ?, ?, ?)`).run(aboutId, cmp.lastInsertRowid, 'about.education', 'educations', i + 1);
  }
  console.log('✅ Educations inserted:', educations.length);

  // --- 5. Insert Interests ---
  const interests = [
    { label: "ASTRONOMIE", icon: "flare" },
    { label: "COURSE À PIED", icon: "directions_run" },
    { label: "VÉLO", icon: "directions_bike" },
    { label: "PHOTOGRAPHIE", icon: "photo_camera" },
  ];

  for (let i = 0; i < interests.length; i++) {
    const interest = interests[i];
    const cmp = db.prepare(`INSERT INTO components_about_skills (label, icon) VALUES (?, ?)`).run(interest.label, interest.icon);
    db.prepare(`INSERT INTO abouts_cmps (entity_id, cmp_id, component_type, field, "order") VALUES (?, ?, ?, ?, ?)`).run(aboutId, cmp.lastInsertRowid, 'about.skill', 'interests', i + 1);
  }
  console.log('✅ Interests inserted:', interests.length);

  // --- 6. Insert Languages ---
  const languages = [
    { name: "ANGLAIS", fluencyText: "NIVEAU TECHNIQUE", level: "B2", percentage: 75 },
    { name: "ALLEMAND", fluencyText: "CONNAISSANCES", level: "A2", percentage: 40 },
  ];

  for (let i = 0; i < languages.length; i++) {
    const lang = languages[i];
    const cmp = db.prepare(`INSERT INTO components_about_languages (name, fluency_text, level, percentage) VALUES (?, ?, ?, ?)`).run(lang.name, lang.fluencyText, lang.level, lang.percentage);
    db.prepare(`INSERT INTO abouts_cmps (entity_id, cmp_id, component_type, field, "order") VALUES (?, ?, ?, ?, ?)`).run(aboutId, cmp.lastInsertRowid, 'about.language', 'languages', i + 1);
  }
  console.log('✅ Languages inserted:', languages.length);

  db.prepare('COMMIT').run();
  console.log('\n🎉 Seed complete! Restart Strapi to see the data in admin.');

} catch (err) {
  db.prepare('ROLLBACK').run();
  console.error('❌ Error seeding:', err.message);
}

db.close();
