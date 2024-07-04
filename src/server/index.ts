import 'reflect-metadata';
import express from 'express';
import path from 'path';
import { remultExpress } from 'remult/remult-express';
import { api } from './api';
import helmet from "helmet"
import compression from "compression"

const app = express();

// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         'script-src-attr': ["'unsafe-inline'"],
//       },
//     },
//   })
// )
app.use(compression())

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, '../bee-track')));

// Set up Remult middleware
app.use(api);

// API routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../bee-track/index.html'));
});

const port = process.env['PORT'] || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
