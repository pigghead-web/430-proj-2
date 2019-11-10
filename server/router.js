// - REQUIRE - 
// ./Controller and ./middleware
//const controller = require('./controller');
//const mid = require('./middleware')

// - CONNECTIONS - 
const router = (app) => {
  // / >> "Unexpected string" error
  app.get('/', (req, res) => {
    res.render('./login.handlebars');
  });
}

module.exports = router;