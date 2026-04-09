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
    // 1. Database is already seeded. Seeding logic has been removed to prevent duplicate slug crashes.

    // 2. Setup Permissions
    try {
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' }
      });

      if (publicRole) {
        const actions = ['api::project.project.find', 'api::project.project.findOne'];
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

        // 2b. Explicitly remove sensitive permissions from public for safety
        const sensitiveActions = [
          'plugin::users-permissions.auth.register', 
          'plugin::users-permissions.auth.callback'
        ];
        for (const action of sensitiveActions) {
           await strapi.db.query('plugin::users-permissions.permission').delete({
             where: { role: publicRole.id, action }
           });
        }
      }
    } catch (error) {
       strapi.log.error('Error setting permissions: ' + error.message);
    }
    strapi.log.info('--- BOOTSTRAP FINISHED ---');
  },
};
