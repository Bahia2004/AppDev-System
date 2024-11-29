const express = require('express');
const path = require('path');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/features', (req, res) => {
    res.render('features');
});

app.get('/services', (req, res) => {
    res.render('services');
});

// Start server
app.listen(3000, () => {
    console.log('Connected to http://localhost:3000');
  });