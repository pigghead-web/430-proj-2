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
