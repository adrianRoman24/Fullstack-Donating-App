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


function logoutButton(auth0) {
  auth0.logout({
    returnTo: "http://localhost:3000/views/homepage",
  });
}

function loginButton(auth0) {
  //console.log(auth0);
  const login = async () => {
    await auth0.loginWithRedirect({
      redirect_uri: "http://localhost:3000/views/dummy",
    });
    
  };
  login();
}

const viewMyOffers = async (auth0, mail) => { 
try {
  // Get the access token from the Auth0 client
  const token = await auth0.getTokenSilently();
  const response = await fetch("/api/offer/view?donorEmail=" + mail, {
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
};

const getProfileInfo = async (auth0, accType, mail) => { 
try {

  const token = await auth0.getTokenSilently();
  const response = await fetch("/api/"+accType+"/profile?accountType="+accType+"&email="+mail, {
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
};

const viewPendingRequests = async (auth0, mail) => { 
try {

  const token = await auth0.getTokenSilently();

  const response = await fetch("/api/request/viewPending?donorEmail=" + mail, {
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

const viewMyRequests = async (auth0, mail) => { 
try {
  const token = await auth0.getTokenSilently();

  const response = await fetch("/api/request/view?email=" + mail, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const responseData = await response.json();
  return responseData;

} catch (e) {
  // Display errors in the console
  console.error(e);
}
};

const viewOffers = async (auth0, offset) => { 
try {

  const token = await auth0.getTokenSilently();
  
  const response = await fetch("/api/offer/viewAll?offset=" + offset, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const responseData = await response.json();
  return responseData;

} catch (e) {
  // Display errors in the console
  console.error(e);
}
};


const acceptRequest = async (auth0, requestId) => {

try {
const token = await auth0.getTokenSilently();
console.log(token);

const response = await fetch("/api/request/update", {
  method: "put",
  body: JSON.stringify({
    requestId,
    accept: true,
  }),
  headers: {
    'Content-Type': `application/json`,
    Authorization: `Bearer ${token}`,
  },
});

const responseData = await response.json();
if(responseData.result.request.status == "accepted")
  confirm("Request accepted");
else 
  confirm("Something went wrong");
location.reload();
} catch (e) {
// Display errors in the console
console.error(e);
}
}



const rejectRequest = async (auth0, requestId) => {

  try {
  
  const token = await auth0.getTokenSilently();
  console.log(token);
  
  const response = await fetch("/api/request/update", {
    method: "PUT",
    body: JSON.stringify({
        requestId,
        accept: false,
    }),
    headers: {    
      'Content-Type': `application/json`,
      Authorization: `Bearer ${token}`,
    },
  });
  
  const responseData = await response.json();
  if(responseData.result.request.status == "rejected")
  confirm("Request rejected");
  else 
  confirm("Something went wrong");
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
  domain: "dev-sqqag002.us.auth0.com",
  client_id: "Riup2s3V38r2h62HymL4c3eKnhMndu52",
  audience: "Donating-App",};
}

const formSendOffer = async (auth0, data) => { 
  try {
    const token = await auth0.getTokenSilently();
    const response = await fetch("/api/offer/publish", {
      method: "post",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    // Fetch the JSON result
    const responseData = await response.json();
    if(responseData.result)
      confirm("Offer published");
    else 
      confirm("Something went wrong");
    location.href="/views/donor/homepage";
    console.log(responseData);
    return responseData;
  
  } catch (e) {
    // Display errors in the console
    console.error(e);
  }
  };

  
const formSendRequest = async (auth0, data) => { 
  try {
    
    const token = await auth0.getTokenSilently();
    const response = await fetch("/api/request/create", {
      method: "post",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    // Fetch the JSON result
    const responseData = await response.json();
    if(responseData.result)
      confirm("Request created");
    else 
      confirm("Something went wrong");
    location.href="/views/refugee/homepage";
    return responseData;
  
  } catch (e) {
    // Display errors in the console
    console.error(e);
  }
  };

  
const formSendUser = async (auth0, data) => { 
  try {
    var apiLink;
    const aType = document.getElementById( "accType" ).value;
    if (aType == "refugee")
      apiLink = "/api/refugee/register";
    else apiLink ="/api/donor/register"; 

    const token = await auth0.getTokenSilently();
    const response = await fetch(apiLink, {
      method: "post",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    const responseData = await response.json();
    location.href="/views/homepage";
    return responseData;
  
  } catch (e) {
    console.error(e);
  }
  };

  const getToken = async (auth0) => {
    console.log('111111111111111111111111111111')
    try {
      const token = await auth0.getTokenSilently();
      const response = await fetch("https://dev-sqqag002.us.auth0.com/oauth/token", {
        method: "post",
        body : JSON.stringify({
          grant_type: 'client_credentials',
          client_id: 'Riup2s3V38r2h62HymL4c3eKnhMndu52',
          client_secret: 'Flxs4aw0SlzEKUTKL27Cr_Ww9VsdxkWRFdI47OcllspvjtZXjp6tacEqFoYtRizx',
          audience: 'Donating-App'
        }),
        headers: {
          'Content-Type': 'application/json',
          'content-type': 'application/x-www-form-urlencoded'
        }
      });
    
      // Fetch the JSON result
      const responseData = await response.json();
      //console.log(responseData);
      return responseData;
    
    } catch (e) {
      // Display errors in the console
      console.error(e);
    }
};