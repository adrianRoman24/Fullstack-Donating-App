var request = require("request");

var options = { method: 'POST',
  url: 'https://dev-sqqag002.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"cQhq7NskbxzTAIdaJSP5OW3nm0u0KBSk","client_secret":"LhutCZKsW9DX3CymGmYdjfgiWDVwdSUX-8-Dc2Si6sEfUGhi3goj29hbHvRchMZS","audience":"http://localhost:3000","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});