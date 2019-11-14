"use strict";

// - VARIABLES & CONSTANTS -
//var speed = 1000;  // how fast the game will go
//
//// An object to store the elapsed time
//var gameTimeData = {
//  hour: 1,
//  day: 1,
//  month: 1,
//  year: 1
//}
//
//var gameTimer = setInterval(function() {
//  addHour();
//}, speed);
//
//const addHour = () => {
//  if (hour !== 24) {
//    gameTimeData.hour++;
//  } else {
//    gameTimeData.hour = 1;
//    addDay();
//  }
//  console.log("Hour is now: " + gameTimeData.hour);
//}
//
//const addDay = () => {
//  if(!monthEnd()) {
//    gameTimeData.day++;
//  } else {
//    gameTimeData.day = 1;
//    addMonth();
//  }
//  console.log("Day is now: " + gameTimeData.day);
//}
//
//const monthEnd = () => {
//  var endofMonth = false;
//  
//  switch (true) {
//      case(gameTimeData.month === 1)
//  }
//}
//
//const addMonth = () => {
//  
//}
var clicks = 0; // Total number of clicks; what will function as 'score'

var autoClicks = 0; // Automatically click this amount of times/second

var clickRate = 1000; // Time between auto clicks

var updateTotalClicks = function updateTotalClicks() {
  document.getElementById("total-clicks").innerHTML = clicks;
}; // - GAME SCREEN -


var GameScreen = function GameScreen(props) {
  return (// JSX return
    React.createElement("button", null, "Click!")
  );
}; // - SETUP -


var setup = function setup(csrf) {
  ReactDOM.render(React.createElement(GameScreen, {
    csrf: csrf
  }), document.querySelector('#content'));
}; // - RDY -


var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var redirect = function redirect(response) {
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      console.log(_error);
    }
  });
};
