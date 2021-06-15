const express = require("express");
const bodyParser = require("body-parser");
const url = require('url');
const stytch = require("stytch")

require('dotenv').config()

const app = express();
const port = process.env.PORT;
const path = `http://localhost:${port}`

// bodyParser allows us to access the body of the post request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// defines the directory where the static assets are so images & css render correctly
app.use(express.static('public'));
// set app to use ejs so we can use html templates
app.set('view engine', 'ejs');

const client = new stytch.Client({
  project_id: process.env.STYTCH_PROJECT_ID,
  secret: process.env.STYTCH_SECRET,
  env: stytch.envs.test,
}
);

// define the homepage route
app.get("/", (req, res) => {
  res.render('loginOrSignUp');
});

app.post("/login_or_create_user", function (req, res) {
  const phoneNumber = req.body.phoneNumber.replace(/\D/g, '');
  const params = stytch.LoginOrCreateUserBySMSRequest = {
    phone_number: `${req.body.intlCode}${phoneNumber}`,
  };

  client.loginOrCreateUserBySMS(params)
    .then(resp => {
      res.render('authenticatePasscode', { phoneId: resp.phone_id, phoneNumber: phoneNumber, intlCode: req.body.intlCode, hasErrored: false });
    })
    .catch(err => {
      res.render('loginOrSignUp');
    });
});

app.post("/authenticate", function (req, res) {
  let passcode = '';
  for (let i = 1; i <= 6; i++) {
    passcode += req.body[`digit-${i}`];
  }

  const params = stytch.LoginOrCreateUserBySMSRequest = {
    method_id: req.body.phoneId,
    code: passcode,
  };

  client.authenticateOTP(params)
    .then(resp => {
      res.render('loggedIn');
    })
    .catch(err => {
      console.log(err)
      res.render('authenticatePasscode', { phoneId: req.body.phoneId, phoneNumber: req.body.phoneNumber, intlCode: req.body.intlCode, hasErrored: true });
    });
});

// run the server
app.listen(port, () => {
  console.log(`Listening to requests on ${path}`);
});
