# Project Monorepo

This repository contains both the frontend and the backend of the application.

## Structure

- **frontend/**: Next.js application.
- **backend/**: Strapi CMS application.

## Deployment on Render

To deploy this project on Render:

1. Create a **Web Service** for the backend:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build` (or your specific command)
   - **Start Command**: `npm run start`

2. Create a **Web Service** or **Static Site** for the frontend:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `out` or `.next` (depending on your build)

Remember to set the environment variables (like `STRAPI_URL` for the front and database credentials for the back) in the Render dashboard for each service.
