function toggleRead(arg1) {
    var dots = document.getElementById("dots" + arg1);
    var dotsName = document.getElementById("dotsName" +arg1);
    var moreText = document.getElementById("more" +arg1);
    var btnText = document.getElementById("myBtn" +arg1);
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      dotsName.style.display="inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      dotsName.style.display="none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
  }
  function updateAccordion() {
    var accordion = (function(){
    
      var $accordion = $('.js-accordion');
      var $accordion_header = $accordion.find('.js-accordion-header');
      var $accordion_item = $('.js-accordion-item');
    
      // default settings 
      var settings = {
        // animation speed
        speed: 400,
        
        // close all other accordion items if true
        oneOpen: false
      };
        
      return {
        // pass configurable object literal
        init: function($settings) {
          $accordion_header.on('click', function() {
            accordion.toggle($(this));
          });
          
          $.extend(settings, $settings); 
          
          // ensure only one accordion is active if oneOpen is true
          if(settings.oneOpen && $('.js-accordion-item.active').length > 1) {
            $('.js-accordion-item.active:not(:first)').removeClass('active');
          }
          
          // reveal the active accordion bodies
          $('.js-accordion-item.active').find('> .js-accordion-body').show();
        },
        toggle: function($this) {
                
          if(settings.oneOpen && $this[0] != $this.closest('.js-accordion').find('> .js-accordion-item.active > .js-accordion-header')[0]) {
            $this.closest('.js-accordion')
                  .find('> .js-accordion-item') 
                  .removeClass('active')
                  .find('.js-accordion-body')
                  .slideUp()
          }
          
          // show/hide the clicked accordion item
          $this.closest('.js-accordion-item').toggleClass('active');
          $this.next().stop().slideToggle(settings.speed);
        }
      }
    })();
  
      accordion.init({ speed: 300, oneOpen: true });
  }


  function hartie() {
    console.log("e");
  }

  function logoutButton(auth0) {
    auth0.logout({
      returnTo: "http://localhost:3000/views/homepage" });
      
  }
  function loginButton(auth0) {
    const login = async () => {
      await auth0.loginWithRedirect({
        redirect_uri: "http://localhost:3000/views/donor/homepage"
      });
    };
    login();
}

const viewMyOffers = async (auth0) => { 
  try {

    // Get the access token from the Auth0 client
    const token = await auth0.getTokenSilently();
    console.log(token);
    // Make the call to the API, setting the token
    // in the Authorization header
    const response = await fetch("/api/offer/view?donorEmail=mihai@yahoo.com", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Fetch the JSON result
    const responseData = await response.json();
    return responseData;
    // Display the result in the output element
    //const responseElement = document.getElementById("api-call-result");

    //responseElement.innerText = JSON.stringify(responseData, {}, 2);

    console.log(responseData);

} catch (e) {
    // Display errors in the console
    console.error(e);
  }
};

const getProfileInfo = async (auth0) => { 
  try {

    // Get the access token from the Auth0 client
    const token = await auth0.getTokenSilently();
    console.log(token);
    // Make the call to the API, setting the token
    // in the Authorization header
    const response = await fetch("/api/donor/profile?accountType=donor&email=mihai@yahoo.com", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Fetch the JSON result
    const responseData = await response.json();
    return responseData;
    // Display the result in the output element
    //const responseElement = document.getElementById("api-call-result");

    //responseElement.innerText = JSON.stringify(responseData, {}, 2);

    console.log(responseData);

} catch (e) {
    // Display errors in the console
    console.error(e);
  }
};

const viewPendingRequests = async (auth0) => { 
  try {

    // Get the access token from the Auth0 client
    const token = await auth0.getTokenSilently();
    console.log(token);
    // Make the call to the API, setting the token
    // in the Authorization header
    const response = await fetch("/api/request/viewPending?donorEmail=mihai@yahoo.com", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Fetch the JSON result
    const responseData = await response.json();
    return responseData;
    // Display the result in the output element
    //const responseElement = document.getElementById("api-call-result");

    //responseElement.innerText = JSON.stringify(responseData, {}, 2);

    console.log(responseData);

} catch (e) {
    // Display errors in the console
    console.error(e);
  }
};

const viewMyRequests = async (auth0) => { 
  try {

    // Get the access token from the Auth0 client
    const token = await auth0.getTokenSilently();
    console.log(token);
    // Make the call to the API, setting the token
    // in the Authorization header
    const response = await fetch("/api/request/view?email=alex@yahoo.com", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Fetch the JSON result
    const responseData = await response.json();
    return responseData;
    // Display the result in the output element
    //const responseElement = document.getElementById("api-call-result");

    //responseElement.innerText = JSON.stringify(responseData, {}, 2);

    console.log(responseData);

} catch (e) {
    // Display errors in the console
    console.error(e);
  }
};

const viewOffers = async (auth0) => { 
  try {

    // Get the access token from the Auth0 client
    const token = await auth0.getTokenSilently();
    console.log(token);
    // Make the call to the API, setting the token
    // in the Authorization header
    const response = await fetch("/api/offer/viewAll?offset=0", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Fetch the JSON result
    const responseData = await response.json();
    return responseData;
    // Display the result in the output element
    //const responseElement = document.getElementById("api-call-result");

    //responseElement.innerText = JSON.stringify(responseData, {}, 2);

    console.log(responseData);

} catch (e) {
    // Display errors in the console
    console.error(e);
  }
};

const acceptRequest = async (auth0, requestId) => {
  
  try {

  const token = await auth0.getTokenSilently();
  console.log(token);
  // Make the call to the API, setting the token
  // in the Authorization header
  const response = await fetch("/api/request/update?requestId=" + requestId + "&accept=true", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  // Fetch the JSON result
  const responseData = await response.json();
  location.reload();
} catch (e) {
  // Display errors in the console
  console.error(e);
}
}

const viewHistory = async (auth0, mail, type) => {
  
  try {

  const token = await auth0.getTokenSilently();
  console.log(token);
  // Make the call to the API, setting the token
  // in the Authorization header
  const response = await fetch("/api/interaction/history?email=" + mail +"&accountType=" + type, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  // Fetch the JSON result
  const responseData = await response.json();
  return responseData;
} catch (e) {
  // Display errors in the console
  console.error(e);
}
}

function fetchCredentials() {
  return {
    domain: "dev-b9s90wxq.us.auth0.com",
    client_id: "4UeZo7p9CcBC1xzAX3yqLmRTNLn0igu7"
    };
}