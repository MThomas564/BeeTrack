import 'reflect-metadata';
import express from 'express';
import path from 'path';
import { remultExpress } from 'remult/remult-express';
import { api } from './api';

const app = express();
const dbHost = process.env['POSTGRES_HOST']
const dbPort = process.env['POSTGRES_PORT']
const dbUser = process.env['POSTGRES_USER']
const dbPass = process.env['POSTGRES_PASSWORD']
const dbName = process.env['POSTGRES_DB']

const conString = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;
console.log(conString);
// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, '../apiary-management')));

// Set up Remult middleware
app.use(api);

// API routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../apiary-management/index.html'));
});

const port = process.env['PORT'] || 3000;
app.listen(port, () => {
  console.log(conString);
  console.log(`Server is running on port ${port}`);
});
