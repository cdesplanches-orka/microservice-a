# Base image légère
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer dépendances strictement (reproductible)
RUN npm ci --only=production

# Copier tout le code
COPY . .

# Exposer le port du service
EXPOSE 3000 50051

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1

# Lancer le service
CMD ["node", "index.js"]
