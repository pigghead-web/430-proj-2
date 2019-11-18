// - REQUIRE -
// ./Controller and ./middleware
const controller = require('./controllers');
const mid = require('./middleware');

// - CONNECTIONS -
const router = (app) => {
  // /
  app.get('/', controller.Account.loginPage);

  // Login
  app.get('/login', controller.Account.loginPage);
  app.post('/login', controller.Account.login);

  // Signup
  app.get('/getToken', controller.Account.getToken);
  app.post('/signup', controller.Account.signup);

  // Game
  app.get('/game', mid.requiresLogin, (req, res) => {
    res.render('./game.handlebars');
  });

  // Logout
  app.get('/logout', controller.Account.logout);

  // Construction
  // This will be a temporary path to reflect that this is still under construction
  app.get('/construction', controller.Account.constructionPage);

  app.get('/*', (req, res) => {
    res.render('./construction.handlebars', { csrfToken: req.csrfToken() });
  });

  // app.use((req, res))
};

module.exports = router;
