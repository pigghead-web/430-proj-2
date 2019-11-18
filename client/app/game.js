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
var clicks = 0;  // Total number of clicks; what will function as 'score'
var autoClicks = 0;  // Automatically click this amount of times/second
var clickRate = 1000;  // Time between auto clicks

// update clicks to the
const updateTotalClicks = () => {
  document.getElementById("totalClicks").innerHTML = clicks;
}

const handleReset = (e) => {
  // prevent refresh
  e.preventDefault();
  
  // if values are missing
  if($('#newPass').val() == "" || $('#newPass2') == "") {
    console.log("ERROR::FIELDS_MISSING");
    return false;
  }
  
  // if values don't match
  if($('#newPass').val() != $('#newPass2').val) {
    console.log("ERROR::PASSWORDS_DO_NOT_MATCH");
    return false;
  }
  
  sendAjax('POST', $('#resetForm')).attr('action'), $('#resetForm').serialize(), redirect)
  
  return false;
}

// - GAME SCREEN -
const GameScreen = (props) => {
  return (  // JSX return
    <div id="gameAreaWrapper">
      <h2 id="totalClicks" className="totalClicks">0</h2>
      <button id="clickForScore" className="btn btn-default">click</button>
    </div>
  );
}

// reset password
const ResetScreen = (props) => {
  return (
    <form id="resetForm" name="resetForm"
          onSubmit={handleReset}
          action="/login"
          method="POST"
          className="mainForm">
          
      <input id="newPass" type="text" name="username" placeholder="new password" />
      
      <input id="newPass2" type="password" name="pass" placeholder="re-type new password" />
      
      <input type="hidden" name="_csrf" value={props.csrf} />
      <input id="resetFormSubmit" className="formSubmit" type="submit" value="reset password" />
    </form>
  );
}

const LeaderboardScreen = (props) => {
  return (
    // CREDIT TO https://www.tablesgenerator.com/html_tables#
    <table class="tg">
      <tr>
        <th class="tg-lx26">name</th>
        <th class="tg-lx26">total clicks</th>
      </tr>
      <tr>
        <td class="tg-a79m">example name</td>
        <td class="tg-a79m">example score</td>
      </tr>
    </table>
  );
}

// - SETUP -
const createGameScreen = (csrf) => {
  ReactDOM.render(
    <GameScreen csrf={csrf} />,
    document.querySelector('#content')
  );
}

const createResetScreen = (csrf) => {
  ReactDOM.render(
    <ResetScreen csrf={csrf} />,
    document.querySelector('#content')
  );
}

const createLeaderboardScreen = (csrf) => {
  
}

// - RDY -
const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
});
