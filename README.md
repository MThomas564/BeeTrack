# BeeTrack
BeeTrack is a web application designed to assist apiary managers in efficiently managing their apiaries, keeping track of hives and inspections seamlessly.


## Features
Hive Management: Maintain a comprehensive list of hives within your apiary.
Inspection Tracking: Record and review inspections performed on each hive.


## Technologies Used
Frontend: Angular

Backend: Node.js, Express.js

Database Integration: Utilises Remult for API operations

Database: Uses Postgresql for data storage, or local json files for local development

## Installation
To install BeeTrack locally, follow these steps:

1. Clone the repository from GitHub:

```
git clone https://github.com/your/repository.git
cd BeeTrack
```

2. Install dependencies for both frontend and backend:
```
npm install
```
3. Start the application:
Requires two terminal sessions:
```
# Start the frontend (Angular)
npm run dev
# Start the backend (Node.js with Express.js)

npm run dev-node
```
Open your browser and navigate to http://localhost:4200 to use BeeTrack locally.