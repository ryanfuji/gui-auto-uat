import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import databaseConfig from './config/database.conf';

mongoose.Promise = global.Promise;

// Connect to MongoDB Database
mongoose.connect(databaseConfig.database, {useMongoClient: true});

// On Connection
mongoose.connection.on('connected', () => {
    console.log(`Connected to database ${databaseConfig.database}`);
});

// On Connection Error
mongoose.connection.on('error', (err) => {
    console.log(`Database error ${err}`);
});

// Create Express App
const app = express();

// Import Routes
import featureRunner from './routes/feature-runner.route';
import projects from './routes/projects.route';
import suites from './routes/suites.route';
import features from './routes/features.route';
import scenarios from './routes/scenarios.route';
import steps from './routes/steps.route';

// Express App Port
const port = 3000;

// Cors Middleware
app.use(cors());

// Set Static Folder for Angular Front End that SPA will build to
app.use(express.static(path.join(__dirname, 'public')));

// Handle JSON Request Bodies
app.use(express.json());

// Set Routes
app.use('/feature-runner', featureRunner);
app.use('/projects', projects);
app.use('/suites', suites);
app.use('/features', features);
app.use('/scenarios', scenarios);
app.use('/steps', steps);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// Set Express App to begin listening on port 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
