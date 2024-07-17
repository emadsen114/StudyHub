require('dotenv').config();
const cookieParser = require("cookie-parser");
const { adminAuth, userAuth } = require("./backend/middleware/auth.js");

const express = require('express');
const app = express();
const PORT = 3000

// server listening 
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})

const connectDB = require("./backend/config/database");

//Connecting the Database
connectDB();

app.set("view engine", "ejs")

/*
const server = app.listen(PORT, () =>
    console.log(`Server Connected to port ${PORT}`)
  )

  // Handling Error
  process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
  })
    */

const mongoose = require('mongoose');
const { readFile } = require('fs');
const path = require('path');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.static(path.join(__dirname, 'backend')));
app.use("/api/auth", require("./backend/Auth/route"))
app.use(cookieParser());

app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userAuth, (req, res) => res.send("User Route"));
//app.get("/", (req, res) => res.render("home"))
app.get("/register", (req, res) => res.render("register"))
app.get("/login", (req, res) => res.render("login"))
app.get("/admin", adminAuth, (req, res) => res.render("admin"))
app.get("/basic", userAuth, (req, res) => res.render("user"))

/*
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
    */

const routes = require('./backend/routes/routes');

app.use('/api', routes)

// Serve static files from the 'frontend/views' directory
app.use(express.static(path.join(__dirname, 'frontend', 'views')));

// Serve static files from the 'frontend/public' directory
app.use(express.static(path.join(__dirname, 'frontend', 'public')));


// Loads the landing page at http://127.0.0.1:3000/
app.get('/', (request, response) => {
    readFile(path.join(__dirname, 'frontend', 'views', 'landingPage.html'), 'utf8', (err, html) => {
        if (err) {
            console.error('Error reading landingPage.html:', err);
            response.status(500).send('Sorry, something went wrong!');
            return;
        }
        response.send(html);
    });
});

// Loads the index.html page at http://127.0.0.1:3000/index.html
app.get('/index.html', (request, response) => {
    readFile(path.join(__dirname, 'frontend', 'views', 'index.html'), 'utf8', (err, html) => {
        if (err) {
            console.error('Error reading landingPage.html:', err);
            response.status(500).send('Sorry, something went wrong!');
            return;
        }
        response.send(html);
    });
});

// Loads the Rich Text Editor page at http://127.0.0.1:3000/rte.html
app.get('/rte.html', (request, response) => {
    readFile(path.join(__dirname, 'frontend', 'views', 'rte.html'), 'utf8', (err, html) => {
        if (err) {
            console.error('Error reading landingPage.html:', err);
            response.status(500).send('Sorry, something went wrong!');
            return;
        }
        response.send(html);
    });
});



app.get('/aboutPage.html', (request, response) => {
    readFile(path.join(__dirname, 'frontend', 'views', 'aboutPage.html'), 'utf8', (err, html) => {
        if (err) {
            console.error('Error reading aboutPage.html:', err);
            response.status(500).send('Sorry, something went wrong!');
            return;
        }
        response.send(html);
    });
});


console.log('App available on http://localhost:3000');


