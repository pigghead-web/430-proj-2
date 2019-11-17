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

const updateTotalClicks = () => {
  document.getElementById("total-clicks").innerHTML = clicks;
}

// - GAME SCREEN -
const GameScreen = (props) => {
  return (  // JSX return
    <div id="gameAreaWrapper"></div>
  );
}

// - SETUP -
const setup = (csrf) => {
  ReactDOM.render(
    <GameScreen csrf={csrf} />,
    document.querySelector('#content')
  );
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
