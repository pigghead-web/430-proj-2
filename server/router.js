// - REQUIRE -
// ./Controller and ./middleware
const controller = require('./controllers');
const mid = require('./middleware');

// - CONNECTIONS -
const router = (app) => {
  // /
  app.get('/', (req, res) => {
    res.render('./login.handlebars');
  });

  // Login
  app.get('/login', (req, res) => {
    res.render('./login.handlebars');
  });

  // Signup

  // getToken
  app.get('/getToken', mid.requiresSecure, controller.Account.getToken);
};

module.exports = router;
