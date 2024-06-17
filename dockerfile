# Stage 1: Build the Angular app
FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the Angular project files
COPY . .

# Build the Angular app
RUN npm run build --prod

# Stage 2: Serve the app with Express
FROM node:18 AS runtime

WORKDIR /app

# Install serve and express
RUN npm install -g serve
RUN npm install express

# Copy the built Angular app from the previous stage
COPY --from=build /app/dist/apiary-management /app/dist/apiary-management

# Copy the Express server file
COPY server.js .

# Expose port
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]