require('dotenv').config();
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const server = require('./config/socketio')(app);
require('./config/passport');

const port = process.env.PORT;

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    });

app.use(cors({
    credentials: true,
    origin: process.env.ORIGIN
}));

const url = process.env.MONGO_URI;
let store = new MongoStore({
    mongoUrl: url,
    collection: "sessions"
});

app.use(session({
    secret: "super cat",
    resave: false,
    store: store,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const chatRoutes = require('./routes/chat');
app.use('/chat', chatRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

server.listen(port, () => console.log(`server runing on port ${port}`))

module.exports = app;