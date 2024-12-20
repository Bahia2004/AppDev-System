const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const patientRoutes = require('./routes/patientRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const historyRoutes = require('./routes/historyRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: '2024', // Change this to a strong secret
  resave: false,
  saveUninitialized: true,
}));

// Set view engine if you're using one (e.g., EJS, Pug)
app.set('view engine', 'ejs');

// Root route to render home page
app.get('/', (req, res) => {
  res.render('home'); // Render 'home' view directly
});

app.get('/', (req, res) => {
  if (req.session.adminId) {
    res.redirect('/dashboard'); // Redirect to a dashboard if already logged in
  } else {
    res.redirect('/admin/login'); // Redirect to login page if not logged in
  }
});

app.get('/dashboard', /*ensureAuthenticated,*/ (req, res) => {
  res.render('dashboard'); // Ensure a 'dashboard.ejs' view exists in the 'views' folder
});


//Admin 
app.get('/admin/login', (req, res) => {
    res.render('admin/login');
});

app.get('/admin/signup', (req, res) => {
    res.render('admin/signup');
});

function ensureAuthenticated(req, res, next) {
  if (req.session.adminId) {
    return next();
  }
  res.redirect('/admin/login'); // Redirect to login if not authenticated
}

//Inventory
app.get('/inventory/add', ensureAuthenticated, (req, res) => {
  res.render('inventory/add');
});

app.get('/inventory/edit', ensureAuthenticated, (req, res) => {
  res.render('inventory/edit');
});

app.get('/patient/add', ensureAuthenticated, (req, res) => {
  res.render('patient/add');
});

app.get('/patient/edit', ensureAuthenticated, (req, res) => {
  res.render('patient/edit');
});

app.get('/patient/history', (req, res) => {
  res.render('patient/history');
});

// Serve the report generation page
app.get('/generate-report', (req, res) => {
  res.render('generateReport');
});


// Routes
app.get('/home', (req, res) => {
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








// Routes
app.use('/admin', adminRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/report', reportRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/patient', patientRoutes);
app.use('/service', serviceRoutes);
app.use('/history', historyRoutes);
app.use('/appointment', appointmentRoutes);

// Start server
app.listen(3000, () => {
  console.log('Connected to http://localhost:3000');
});
