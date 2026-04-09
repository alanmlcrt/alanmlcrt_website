import type { Core } from '@strapi/strapi';

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', 'images.unsplash.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', 'images.unsplash.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: [process.env.FRONTEND_URL || 'http://localhost:3000'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formLimit: '256kb',
      jsonLimit: '256kb',
      textLimit: '256kb',
      formidable: {
        maxFileSize: 10 * 1024 * 1024, // 10mb limit for uploads
      },
    },
  },
  'strapi::session',
  {
    name: 'strapi::favicon',
    config: {},
  },
  'strapi::public',
  'strapi::compression',
];

export default config;
