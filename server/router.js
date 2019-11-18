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
  app.post('/login', mid.requiresLogout, mid.requiresSecure, controller.Account.login);

  // Signup
  app.get('/getToken', mid.requiresSecure, controller.Account.getToken);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controller.Account.signup);
  
  // Game
  app.get('/game', mid.requiresLogin, (req, res) => {
    res.render('./game.handlebars', { csrfToken: req.csrfToken() });
  });
  
  // Logout
  app.get('/logout', mid.requiresLogin, controller.Account.logout);
  
  // Construction
  // This will be a temporary path to reflect that this is still under construction
  app.get('/construction', controller.Account.constructionPage);
  
  app.get('/*', (req, res) => {
    res.render('./construction.handlebars', { csrfToken: req.csrfToken() });
  });
  
  //app.use((req, res))
};

module.exports = router;
