# stytch-node-sms
##### 1. Set ENV vars
Set your project ID and secret in the `.env` file. For continuity, you can create a new project called Tropica and use this project's project ID and secret. This way, when the sms passcode is sent the message will say `Tropica verification code: xxxxxx`

##### 2. Run the Server

Run `node server.js`

##### 3. Login

Visit `http://localhost:4567` and login with your email.
Then check for the Stytch email and click the sign in button.
You should be signed in!
