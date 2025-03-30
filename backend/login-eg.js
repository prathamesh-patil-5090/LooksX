const express = require('express');

const app = express();

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: '90bf65bfae75aeb42b08ddd99ecea72edc1906bca0a250a5084eaecbc69dbabb',
  baseURL: 'http://localhost:3000',
  clientID: 'cBo8C44vhqEVnj4zHAdYVXlM5FySWmlA',
  issuerBaseURL: 'https://prathamesh-patil-5090.us.auth0.com',
  response_type: 'code',
  response_mode: 'form_post'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Add port configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});


//getting user info/profile