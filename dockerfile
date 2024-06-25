# Stage 1: Build the Angular app
FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install

# Copy the Angular project files
COPY . .

# Build the Angular app
RUN npm run build

# Stage 2: Compile the server TypeScript files
FROM node:18 AS server-build

WORKDIR /app

# Copy the package files and install TypeScript globally
COPY package*.json ./
RUN npm install
RUN npm install -g typescript ts-node @types/node

# Copy the source files and tsconfig.server.json
COPY src src
COPY tsconfig.server.json ./

# Install server dependencies
RUN npm install remult express

# Compile the server TypeScript files
RUN tsc -p tsconfig.server.json

# Stage 3: Serve the app with Express
FROM node:18 AS runtime

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies for runtime
RUN npm install --only=production

# Copy the built Angular app and server files from the build stages
COPY --from=build /app/dist /app/dist
COPY --from=server-build /app/dist/server /app/dist

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "./dist/server/index.js"]
