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
// update clicks to the

var updateTotalClicks = function updateTotalClicks() {
  document.getElementById("totalClicks").innerHTML = clicks;
};

var handleReset = function handleReset(e) {
  // prevent refresh
  e.preventDefault(); // if values are missing

  if ($('#newPass').val() == "" || $('#newPass2') == "") {
    console.log("ERROR::FIELDS_MISSING");
    return false;
  } // if values don't match


  if ($('#newPass').val() != $('#newPass2').val) {
    console.log("ERROR::PASSWORDS_DO_NOT_MATCH");
    return false;
  }

  sendAjax('POST', $('#resetForm').attr('action'), $('#resetForm').serialize(), redirect);
  return false;
}; // - GAME SCREEN -
//const GameScreen = (props) => {
//  return (  // JSX return
//    <div id="gameAreaWrapper">
//      <h2 id="totalClicks" className="totalClicks">0</h2>
//      <button id="clickForScore" className="btn btn-default">click</button>
//      <input type="hidden" name="_csrf" value={props.csrf}/>
//    </div>
//  );
//}
// Make the game page and retrieve the ClickModel associated with each player


var gamePage = function gamePage(res, req) {
  ClickModel.ClickModel.findByOwner(req.session._id, function (err, docs) {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "ERROR"
      });
    }

    return res.render('game', {
      score: docs
    });
  });
}; // reset password


var ResetScreen = function ResetScreen(props) {
  return React.createElement("form", {
    id: "resetForm",
    name: "resetForm",
    onSubmit: handleReset,
    action: "/login",
    method: "POST",
    className: "mainForm"
  }, React.createElement("input", {
    id: "newPass",
    type: "text",
    name: "username",
    placeholder: "new password"
  }), React.createElement("input", {
    id: "newPass2",
    type: "password",
    name: "pass",
    placeholder: "re-type new password"
  }), React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), React.createElement("input", {
    id: "resetFormSubmit",
    className: "formSubmit",
    type: "submit",
    value: "reset password"
  }));
};

var LeaderboardScreen = function LeaderboardScreen(props) {
  return (// CREDIT TO https://www.tablesgenerator.com/html_tables#
    React.createElement("table", {
      "class": "tg"
    }, React.createElement("tr", null, React.createElement("th", {
      "class": "tg-lx26"
    }, "name"), React.createElement("th", {
      "class": "tg-lx26"
    }, "total clicks")), React.createElement("tr", null, React.createElement("td", {
      "class": "tg-a79m"
    }, "example name"), React.createElement("td", {
      "class": "tg-a79m"
    }, "example score")))
  );
}; // - SETUP -


var createGameScreen = function createGameScreen(csrf) {
  ReactDOM.render(React.createElement(GameScreen, {
    csrf: csrf
  }), document.querySelector('#content'));
};

var createResetScreen = function createResetScreen(csrf) {
  ReactDOM.render(React.createElement(ResetScreen, {
    csrf: csrf
  }), document.querySelector('#content'));
};

var createLeaderboardScreen = function createLeaderboardScreen(csrf) {
  ReactDOM.render(React.createElement(LeaderboardScreen, {
    csrf: csrf
  }), document.querySelector('#content'));
};

var setup = function setup(csrf) {
  //const accountButton = document.querySelector('#');
  //createGameScreen(csrf);
  console.log("setup initiated");
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
  //debugger;
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
