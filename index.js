require('dotenv').config();

const express = require('express');
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
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'frontend')));


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

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