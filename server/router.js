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
  app.post('/signup', mid.requiresLogout, controller.Account.signup);

  // getToken
  app.get('/getToken', mid.requiresSecure, controller.Account.getToken);
  
  // Construction
  // This will be a temporary path to reflect that this is still under construction
  app.get('/construction', mid.requiresLogin);
};

module.exports = router;
