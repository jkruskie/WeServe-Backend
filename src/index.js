require('dotenv').config()
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./db');
const mongoose = require('mongoose');

const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

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

// Defining endpoints to return landing
// app.get('/', (req, res) => {
//     res.send(ads)
// });

// Start the server
mongoose
	.connect(DB_URL, { useNewUrlParser: true })
	.then(() => {
		const app = express()
        // Read JSONs
        app.use(express.json());

        // Initialize routes
		app.use("/api/users", userRoutes);
        app.use("/api/events", eventRoutes);
        app.use("/api/auth", authRoutes);

		app.listen(process.env.PORT, () => {
            console.log('Listening on http://localhost:' + process.env.PORT);
        })
    });