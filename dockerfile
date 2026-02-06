# Base image
FROM node:20-alpine

# Working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start service
CMD ["node", "index.js"]
