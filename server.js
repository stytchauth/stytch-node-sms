const express = require("express");
const bodyParser = require("body-parser");
const url = require("url");
const stytch = require("stytch");

require("dotenv").config()

const app = express();
const port = process.env.PORT;
const path = `http://localhost:${port}`

// bodyParser allows us to access the body of the post request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// defines the directory where the static assets are so images & css render correctly
app.use(express.static('public'));
// defines the directory where the js files are so that external js scripts can be added
app.use(express.static('src'));
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

  // params are of type stytch.LoginOrCreateUserBySMSRequest
  const params = {
    phone_number: `${req.body.intlCode}${phoneNumber}`,
  };

  client.loginOrCreateUserBySMS(params)
    .then(resp => {
      res.render('authenticate', { phoneId: resp.phone_id, hasErrored: false });
    })
    .catch(err => {
      res.render('loginOrSignUp');
    });
});

app.post("/authenticate", function (req, res) {
  let code = '';
  for (let i = 1; i <= 6; i++) {
    code += req.body[`digit-${i}`];
  }

  // params are of type stytch.AuthenticateOTPRequest
  const params = {
    code,
    method_id: req.body.phoneId,
  };

  client.authenticateOTP(params)
    .then(resp => {
      res.render('loggedIn');
    }).catch(err => {
      console.log(err)
      res.render('authenticate', { phoneId: req.body.phoneId, hasErrored: true });
    });
});

// run the server
app.listen(port, () => {
  console.log(`Listening to requests on ${path}`);
});
