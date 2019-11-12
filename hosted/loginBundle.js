"use strict";

var handleLogin = function handleLogin(e) {
  // prevent refresh
  e.preventDefault(); // If there are missing fields

  if ($('#user').val() == '' || $('#pass') == '') {
    console.log("Both fields are required");
    return false;
  }

  console.log($('#input[name=_csrf]').val());
  sendAjax('POST', $('#loginForm').attr('action'), $('loginForm').serialize(), redirect);
  return false;
};

var LoginWindow = function LoginWindow(props) {
  return React.createElement("form", {
    id: "loginForm",
    name: "loginForm",
    onSubmit: handleLogin,
    action: "/login",
    method: "POST",
    className: "mainForm"
  }, React.createElement("input", {
    id: "user",
    type: "text",
    placeholder: "username"
  }), React.createElement("input", {
    id: "pass",
    type: "password",
    placeholder: "password"
  }), React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), React.createElement("input", {
    id: "loginFormSubmit",
    className: "formSubmit",
    type: "submit",
    value: "Sign In"
  }));
}; // Create windows


var createLoginWindow = function createLoginWindow(csrf) {
  ReactDOM.render(React.createElement(LoginWindow, {
    csrf: csrf
  }), document.querySelector('#content'));
};

var setup = function setup(csrf) {
  var loginButton = document.querySelector('#loginButton');
  var signupButton = document.querySelector('#signupButton');
  loginButton.addEventListener('submit', function (e) {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });
  createLoginWindow(csrf);
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      console.log(xhr.responseText);
    }
  });
};
