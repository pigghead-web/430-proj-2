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
  app.get('/login', controller.Account.loginPage);

  // Signup
  app.get('/getToken', controller.Account.getToken);
  app.post('/signup', mid.requiresLogout, controller.Account.signup);

  // getToken
  app.get('/getToken', mid.requiresSecure, controller.Account.getToken);
};

module.exports = router;
