require('dotenv').config()
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./db');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();

const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;
const DB_URL = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`


// Add helmet to enhance API security
app.use(helmet());

// Enable CORS
app.use(cors());

// Add Morgan to log HTTP requests
app.use(morgan('combined'));

// Defining endpoints to return all ads
app.get('/', (req, res) => {
    res.send(ads)
});

// Start the server
mongoose
	.connect(DB_URL, { useNewUrlParser: true })
	.then(() => {
		const app = express()
        // Read JSONs
        app.use(express.json());
        // API Routes
		app.use("/api", routes)

		app.listen(process.env.PORT, () => {
            console.log('Listening on http://localhost:' + process.env.PORT);
        })
    });