# stytch-node-sms

This example app uses the [Stytch API](https://stytch.com/docs/api) to send and authenticate
one-time passcodes (OTPs).

## Running the app

For name continuity, create a new project called "Tropica" and use it for these setup steps. That
way, the SMS message will say "Tropica verification code: xxxxxx", matching the app branding.

1. Fill in `STYTCH_PROJECT_ID` and `STYTCH_SECRET` in the `.env` file. Get your credentials from
   your [Stytch dashboard](https://stytch.com/dashboard/api-keys).
2. Run `npm install`
3. Run `npm start`
4. Visit `http://localhost:4567` and login by SMS passcode!
