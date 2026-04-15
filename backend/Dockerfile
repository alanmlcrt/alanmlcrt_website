FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
WORKDIR /opt/
COPY package.json package-lock.json ./
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install

# Rebuild the source code only when needed
FROM base AS builder
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
WORKDIR /opt/
COPY --from=deps /opt/node_modules ./node_modules
WORKDIR /opt/app
COPY . .
ENV NODE_ENV=production
RUN npm run build

# Production image, copy all the files and run strapi
FROM base AS runner
RUN apk add --no-cache vips-dev
WORKDIR /opt/
COPY --from=deps /opt/node_modules ./node_modules
WORKDIR /opt/app
COPY --from=builder /opt/app ./
ENV PATH /opt/node_modules/.bin:$PATH

RUN mkdir -p /opt/app/.tmp && chmod -R 777 /opt/app/.tmp
USER node

EXPOSE 1337
CMD ["npm", "run", "start"]
