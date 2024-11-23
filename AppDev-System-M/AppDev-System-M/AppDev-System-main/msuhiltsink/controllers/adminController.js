const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

// Display login form
exports.loginForm = (req, res) => {
  res.render('admin/login', { error: null }); // Render login with no error message initially
};

// Handle login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Validate inputs
  if (!username || !password) {
    return res.render('admin/login', { error: 'Username and password are required' });
  }

  try {
    const admin = await Admin.getAdminByUsername(username);
    if (admin && await bcrypt.compare(password, admin.password)) {
      // Set session admin ID
      req.session.adminId = admin.admin_id;
      res.redirect('/dashboard'); // Redirect to a secure page
    } else {
      res.render('admin/login', { error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Error during login');
  }
};

// Display signup form
exports.signupForm = (req, res) => {
  res.render('admin/signup', { error: null });
};

// Handle signup
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate inputs
  if (!username || !email || !password) {
    return res.render('admin/signup', { error: 'All fields are required' });
  }

  try {
    await Admin.createAdmin(username, password, email);
    res.redirect('/admin/login'); // Redirect to login after successful signup
  } catch (error) {
    console.error('Error during signup:', error);
    res.render('admin/signup', { error: error.message }); // Display specific error to the user
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).send('Error during logout');
    }
    res.redirect('/admin/login');
  });
};
