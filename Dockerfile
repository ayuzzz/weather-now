# Stage 1: Build stage
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire source code into the container
COPY . .

# Build the Next.js app for production
RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install only the production dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the build artifacts from the build stage
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public

# Expose port 3000 for the app
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]