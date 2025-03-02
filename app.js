require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./server/config/db");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

// Static files
app.use(express.static("public"));

// Templating Engine
app.use(expressLayouts);
app.set("layout", './layouts/main');
app.set("view engine", "ejs");

// Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }), // Store sessions in MongoDB
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());



// Routes
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));

app.get('*', function (req, res) {
    res.status(404).send('404');
});

app.listen(port, () => console.log(`App listening on port ${port}`));