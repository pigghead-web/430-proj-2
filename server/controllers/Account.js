// - REQUIRE -
// * Pull in models, as this is where data will be fed
const models = require('../models');

// - VARIABLES, CONSTANTS -
// pull in the account model
const { Account } = models;

// - RENDER FUNCTIONS -
const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const constructionPage = (req, res) => {
  res.render('construction', { csrfToken: req.csrfToken() });
};

// When logging out, redirect us to the main page
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (req, res) => {
  const request = req;
  const response = res;

  // console.log(request.body.username);
  // request.body.username and .pass are both contained in post request when clicking login
  const username = `${request.body.username}`;
  const password = `${request.body.pass}`;

  // make sure both the username and password were received
  if (!username || !password) {
    return response.status(400).json({ error: 'All fields are required' });
  }

  // authenticate
  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return response.status(401).json({ error: 'Incorrect username or password' });
    }

    // Attach account to our session
    req.session.account = Account.AccountModel.toAPI(account);

    return response.json({ redirect: '/game' });
  });
};

const signup = (req, res) => {
  const request = req;
  const response = res;

  request.body.username = `${request.body.username}`;
  request.body.pass = `${request.body.pass}`;
  request.body.pass2 = `${request.body.pass2}`;

  // check for all fields
  if (!request.body.username || !request.body.pass || !request.body.pass2) {
    return response.status(400).json({ error: 'All fields are required' });
  }

  // check both passwords
  if (request.body.pass !== request.body.pass2) {
    return response.status(400).json({ error: 'Passwords do not match' });
  }

  // new encryption
  return Account.AccountModel.generateHash(request.body.pass, (salt, hash) => {
    const accountData = {
      username: request.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      request.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({ redirect: '/game' });
    });

    // If there is a problem with our Promise
    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) { // same username
        return response.status(400).json({ error: 'Username already taken' });
      }

      return response.status(400).json({ error: 'An unknown error occured' });
    });
  });
};

const getToken = (req, res) => {
  const request = req;
  const response = res;

  const csrfToken = {
    csrfToken: request.csrfToken(),
  };

  response.json(csrfToken);
};

// - EXPORTS -
module.exports.loginPage = loginPage;
module.exports.constructionPage = constructionPage;
module.exports.logout = logout;
module.exports.login = login;
module.exports.signup = signup;
module.exports.getToken = getToken;
