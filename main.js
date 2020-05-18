/*

todo

- Generate tabele [x]
- Generate numebers in table [x]
- Create button to start timer and generate table [x]
- Timer start/stop [x]
- Solving tabel functionality [x]
- Select table dimension [x]

*/

// variables

var html = '';
var newSchulte = [];
var randomNumber;
var counter = 1;
var timerStarter;
var msg = document.querySelector('.msg');

// get table dimensions
function getTableDimension() {
    return document.querySelector("#select_dimension").value;
 
} // get table dimensions

// random array funct generateCombination
function generateCombination(min, max) {
  resetGame();
  var cellWidth = 450 / getTableDimension();
  var cellHeight = 450 / getTableDimension();
  min = Math.ceil(min);
  max = Math.floor(max);
  while(newSchulte.length < max){
    randomNumber = Math.floor(Math.random() * ((max + 1) - min)) + min;

    if(newSchulte.indexOf(randomNumber) === -1) {
        newSchulte.push(randomNumber);
        html += '<button class="cell" style="width:' + cellWidth + ';height:' + cellHeight + '">' + randomNumber + '</button>';
        
    }

  }

} // END generateCombination

// function fill table
function generateNumbers() {
document.querySelector('#table_wrapper .row').innerHTML = html;
document.querySelectorAll('#table_wrapper .row .cell').forEach(function(element){

    element.addEventListener('click', function(event){

        if(event.target.textContent==counter){
            counter++;
            console.log(counter);
            event.target.classList.add ("cell_true", "disabled");
            event.target.disabled = true;
            setTimeout(function() {
                element.classList.remove('cell_true');
            }, (0.2*1000));
        } else {
            event.target.classList.add ("cell_false");
            setTimeout(function() {
                element.classList.remove('cell_false');
            }, (0.2*1000));

        }  
        if (counter === getTableDimension() * getTableDimension() + 1) {
            resetGame();
        }
    });
});
} //function fill table



// timer
function startTimer() {
    var minutesLabel = document.querySelector('#minutes');
    var secondsLabel = document.querySelector('#seconds');
    var totalSeconds = 0;
    timerStarter = setInterval(setTime, 1000);

    function setTime() {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds%60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
    }

    function pad(val) {
        var valString = val + "";
        if(valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }
} // END startTimer

// reset game
function resetGame() {
    clearInterval(timerStarter);
    newSchulte = [];
    html = '';
    counter = 1;
    msg.style.display = 'inline-block';
}    // END reset game

// startGame

function startGame() {
    generateCombination(1, getTableDimension() * getTableDimension());
    generateNumbers();
    msg.style.display = 'none';
    clearInterval(timerStarter);
    startTimer();
}

// click event on button for new game
document.querySelector("button#generate_table").addEventListener("click", startGame);