const axios = require("axios");

async function test() {
    var options = {
        method: 'POST',
        url: 'https://dev-sqqag002.us.auth0.com/oauth/token',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: {
          grant_type: 'client_credentials',
          client_id: 'UZcKEK1vr9Ql5BXPLk0lVmP3NgvNeGRY',
          client_secret: "9BpbVdgOJZ87qe0kYjXuDr9-if6-wFP50j8Qc0oYhbEqKUprIJp3jmk_A3fPRU-A",
          audience: 'http://localhost:3000'
        }
      };
      
      axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
}

test();
