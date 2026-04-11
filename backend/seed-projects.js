const Database = require('better-sqlite3');
const path = require('path');
const crypto = require('crypto');

const db = new Database(path.join(__dirname, '.tmp', 'data.db'));
const now = Date.now();

db.prepare('BEGIN').run();

try {
  // Clear existing to avoid ID/Slug conflicts and use clean timestamps
  db.prepare('DELETE FROM projects').run();
  console.log('🧹 Projects table cleared.');

  const projects = [
    {
      title: "Application V'Lille Tracker",
      slug: "vlille-tracker",
      category: "Projet",
      date: "2024-03-01",
      content: `## Analyse des disponibilités V'Lille en temps réel...`
    },
    {
      title: "Bassin Acoustique Intelligent",
      slug: "bassin-acoustique",
      category: "Projet",
      date: "2024-06-15",
      content: `## Supervision IoT pour Infrastructures Acoustiques...`
    }
  ];

  for (const proj of projects) {
    const docId = crypto.randomBytes(12).toString('hex');
    
    db.prepare(`
      INSERT INTO projects (document_id, title, slug, category, date, content, created_at, updated_at, published_at, locale)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      docId,
      proj.title,
      proj.slug,
      proj.category,
      proj.date,
      proj.content,
      now, now, now, 'en'
    );
    console.log(`✅ Project created: ${proj.title} (DocID: ${docId})`);
  }

  db.prepare('COMMIT').run();
  console.log('\n🎉 Project seeding complete! IMPORTANT: Please restart your terminal/Strapi to refresh.');

} catch (err) {
  db.prepare('ROLLBACK').run();
  console.error('❌ Error seeding:', err.message);
}

db.close();
