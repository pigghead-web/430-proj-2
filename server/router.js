// - REQUIRE -
// ./Controller and ./middleware
const controller = require('./controllers');
const mid = require('./middleware');

// - CONNECTIONS -
const router = (app) => {
  // /
  app.get('/', controller.Account.loginPage);

  // Login
  app.get('/login', mid.requiresLogout, controller.Account.loginPage);
  app.post('/login', controller.Account.login);

  // Signup
  app.get('/getToken', controller.Account.getToken);
  app.post('/signup', controller.Account.signup);

  // getToken
  app.get('/getToken', mid.requiresSecure, controller.Account.getToken);
  
  // Game
  app.get('/game', (req, res) => {
    res.render('./app.handlebars', { csrfToken: req.csrfToken() });
  });
  
  // Logout
  app.get('/logout', mid.requiresLogin, controller.Account.logout);
  
  // Construction
  // This will be a temporary path to reflect that this is still under construction
  app.get('/construction', mid.requiresLogin);
};

module.exports = router;
