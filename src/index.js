require('dotenv').config()
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./config/db');
const mongoose = require('mongoose');
const io = require('socket.io');

const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/users');
const organizationRoutes = require('./routes/organization');
const authRoutes = require('./routes/auth');
const chatRoomRoutes = require('./routes/chatRoom');

const app = express();
const http = require('http').Server(app);

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

// Automatically switch all http requests to uncapitalized
app.use(require('express-uncapitalize')());


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
        app.use(express.static(__dirname + '/public'));
		app.use("/api/users", userRoutes);
		app.use("/api/organizations", organizationRoutes);
        app.use("/api/events", eventRoutes);
        app.use("/api/auth", authRoutes);
        app.use("/room", chatRoomRoutes);

        /** Create socket connection */
        const socket = io(http);
        //create an event listener
        
        //To listen to messages
        socket.on('connection', (socket)=>{
            console.log('user connected');
            socket.on("disconnect", ()=>{
                console.log("Disconnected")
            })
        });
        
		app.listen(process.env.PORT, () => {
            console.log('Listening on http://localhost:' + process.env.PORT);
        })
    });