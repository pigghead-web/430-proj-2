const handleLogin = (e) => {
  // prevent refresh
  e.preventDefault();
  
  // If there are missing fields
  if($('#user').val() == '' || $('#pass') == '') {
    console.log("Both fields are required");
    return false;
  }
  
  console.log($('#input[name=_csrf]').val());
  
  sendAjax('POST', $('#loginForm').attr('action'), $('loginForm').serialize(), redirect);
  
  return false;
}

const LoginWindow = (props) => {
  return (
    <form id="loginForm" name="loginForm"
          onSubmit={handleLogin}
          action="/login"
          method="POST"
          className="mainForm">
          
      <input id="user" type="text" placeholder="username" />
      
      <input id="pass" type="password" placeholder="password" />
      
      <input type="hidden" name="_csrf" value={props.csrf} />
      <input id="loginFormSubmit" className="formSubmit" type="submit" value="Sign In"/>
    </form>
  );
}

// Create windows
const createLoginWindow = (csrf) => {
  ReactDOM.render(
    <LoginWindow csrf={csrf} />,
    document.querySelector('#content')
  );
}; 

const setup = (csrf) => {
  const loginButton = document.querySelector('#loginButton');
  const signupButton = document.querySelector('#signupButton');
  
  loginButton.addEventListener('submit', (e) => {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });
  
  createLoginWindow(csrf);
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
});