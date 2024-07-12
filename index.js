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


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

const routes = require('./routes/routes');

app.use('/api', routes)

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (request, response) => {
    readFile(path.join(__dirname, 'frontend', 'landingPage.html'), 'utf8', (err, html) => {
        if (err) {
            console.error('Error reading landingPage.html:', err);
            response.status(500).send('Sorry, something went wrong!');
            return;
        }
        response.send(html);
    });
});

console.log('App available on http://localhost:3000');