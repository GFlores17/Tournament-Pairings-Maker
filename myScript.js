function countTableRows() {
  var rowCount = 0;
  var table = document.getElementById("RoundRobinTable");
  var rows = table.getElementsByTagName("tr");
  //Count how many rows (regardless if empty) there are.

  for (var i = 0; i < rows.length; i++) {
    if (rows[i].getElementsByTagName("td").length > 0) {
      //If a row has more than 0 cells of data in it, increment row count by 1.
      rowCount++;
    }
  }
  console.log("Total Row Count: " + rowCount);
  return rowCount;
}

function deleteLastRowOfTable() {
  var table = document.getElementById("RoundRobinTable");
  var rowCount = table.rows.length;
  table.deleteRow(rowCount - 1);
}


function addMatchToTable(player1Name, player2Name) {
  //Pass 2 player objects who are facing each other, and the method appends it to the table.

  //Get table by ID and find how many rows it has.
  var table = document.getElementById("RoundRobinTable");
  var rowCount = countTableRows() + 1;

  //Create a row and insert it into the table.
  var row = table.insertRow(rowCount);
  
  //Insert 3 cells into the created row.
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);


  //Assign values to the created cells.
  cell1.innerHTML = player1Name;
  cell2.innerHTML = "vs";
  cell3.innerHTML = player2Name;
}

function addRound(numberOfRounds) {
  //Adds a row indicating a new round has started.
  //Get table by ID and find how many rows it has.

  var table = document.getElementById("RoundRobinTable");
  var rowCount = countTableRows() + 1;

  //Create a row and insert it into the table.
  var row = table.insertRow(rowCount);

  //Insert 3 cells into the created row.
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  //Assign values to the created cells.
  cell1.innerHTML = "";
  cell2.innerHTML = "ROUND " + (numberOfRounds + 1);
  cell3.innerHTML = "";

  //Style the created row.
  row.style.backgroundColor = "green"; 
  row.style.color = "white";
}

function printArrayOfStrings(vec) {
  var output = "";
  for (var i = 0; i < vec.length; i++) {
    output = output + vec[i].playerName;
  }
  console.log("VECTOR : " + output);
}


function makeRoundRobinPairings() {

  var numOfPlayers = prompt("Please enter number of players.");
  var isNum = isNumeric(numOfPlayers);
  while(isNum == false){
    numOfPlayers = prompt("Not a valid number, try again.");
    isNum = isNumeric(numOfPlayers);
  }
  
  var players = [];

  for (var i = 0; i < numOfPlayers; i++) {
    var name = prompt("Player " + (i + 1) + " name?");
    var player = { playerName: name, ID: i };
    players.push(player);
  }

  if (players.length % 2 == 1) {
    var player = { playerName: "BYE", ID: 0 };
    players.push(player);
  }

  const playerCount = players.length;
  const rounds = playerCount - 1;
  const half = playerCount / 2;

  const tournamentPairings = [];

  const playerIndexes = players.map((_, i) => i).slice(1);

  for (let round = 0; round < rounds; round++) {
    const roundPairings = [];

    const newPlayerIndexes = [0].concat(playerIndexes);

    const firstHalf = newPlayerIndexes.slice(0, half);
    const secondHalf = newPlayerIndexes.slice(half, playerCount).reverse();
    addRound(round);

    for (let i = 0; i < firstHalf.length; i++) {
      addMatchToTable(players[firstHalf[i]].playerName, players[secondHalf[i]].playerName);
      roundPairings.push({
        white: players[firstHalf[i]],
        black: players[secondHalf[i]],
      });
    }

    // rotating the array
    playerIndexes.push(playerIndexes.shift());
    tournamentPairings.push(roundPairings);
  }
  return tournamentPairings;
}

function isNumeric(num){
  //Checks if number.
  console.log("NUMBER ? " + !isNaN(num));
  return !isNaN(num)
}

//All code below will be used to help implement single elimination tournament bracketing.

sessionStorage.setItem("numberOfPlayers", 0);
var int = parseInt(sessionStorage.getItem("numberOfPlayers"));
console.log(int);

function createCheckbox(player, tableIndex) { //add checkbox to page

  var int = parseInt(sessionStorage.getItem("numberOfPlayers"));
  var table = document.getElementById("SingleElimTable");
  var rowCount = countTableRows() + 1;
    
  // creating checkbox element 
  var checkbox = document.createElement('input'); 
    
  // Assigning the attributes 
  // to created checkbox 
  checkbox.type = "checkbox"; 
  checkbox.name = player.playerName; 
  checkbox.value = "value"; 
  checkbox.id = player.playerName; 
  console.log(checkbox.id);
    
  // creating label for checkbox 
  var label = document.createElement('label'); 
    
  // assigning attributes for  
  // the created label tag  
  label.htmlFor = "id"; 
    
  // appending the created text to  
  // the created label tag  
  label.appendChild(document.createTextNode(player.playerName)); 
    
  // appending the checkbox 
  // and label to div 
  table.appendChild(checkbox); 
  table.appendChild(label); 

  int++;
  sessionStorage.setItem("Players", int);
} 

function isCheckboxChecked(){//check if checkbox checked
  var x = document.getElementById("checkbox2").checked;
  if(x == true){
    console.log("IT WORKS");
  }
  else{
    console.log("NO");
  }
}

function tableCreate(){
  //This is intended to be used later. We will create separate tables per round down the line.
  var body = document.body,
  tbl  = document.createElement('table');
  tbl.style.width  = '100px';
  tbl.style.border = '1px solid black';
  tbl.id = "newRound";

  for(var i = 0; i < 1; i++){
      var tr = tbl.insertRow();
      for(var j = 0; j < 3; j++){
        var td = tr.insertCell();
        td.appendChild(document.createTextNode(''));
        td.style.border = '1px solid black';
        if(i == 0 && j == 1){
          td.innerHTML = "NEW ROUND";
        }  
      }
  }
  myDiv = document.getElementById("myDiv");
  myDiv.appendChild(tbl);
  return tbl.id;
}

function registerPlayers(){
  var numOfPlayers = prompt("Please enter number of players.");
  var isNum = isNumeric(numOfPlayers);

  while(isNum == false){
    numOfPlayers = prompt("Not a valid number, try again.");
    isNum = isNumeric(numOfPlayers);
  }
  
  var players = [];

  for (var i = 0; i < numOfPlayers; i++) {
    var name = prompt("Player " + (i + 1) + " name?");
    var player = { playerName: name, ID: i };
    players.push(player);
  }

  if (players.length % 2 == 1) {
    var player = { playerName: "BYE", ID: 0 };
    players.push(player);
  }
  return players;
}

function addSingleElimMatch(player1Name){
  //Pass 2 player objects who are facing each other, and the method appends it to the table.

  //Get table by ID and find how many rows it has.
  var table = document.getElementById("SingleElimTable");
  var rowCount = countTableRows() + 1;

  //Create a row and insert it into the table.
  var row = table.insertRow(rowCount);
  
  //Insert 3 cells into the created row.
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);

  row.style.backgroundColor = "wheat"; 
  row.style.color = "black";
  //var cell3 = row.insertCell(2);


  //Assign values to the created cells.

  var tBox = document.createElement('input');
  tBox.setAttribute('type', 'checkbox');

  cell1.appendChild(tBox);
  cell2.innerHTML = player1Name;
}

function addSpace(){
  //Pass 2 player objects who are facing each other, and the method appends it to the table.

  //Get table by ID and find how many rows it has.
  var table = document.getElementById("SingleElimTable");
  var rowCount = countTableRows() + 1;

  //Create a row and insert it into the table.
  var row = table.insertRow(rowCount);
  
  //Insert 3 cells into the created row.
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);

  row.style.backgroundColor = "green"; 
  row.style.color = "white";

  //Assign values to the created cells.

  var tBox = document.createElement('input');
  tBox.setAttribute('type', 'checkbox');

  //cell1.appendChild(tBox);
  cell2.innerHTML = "       ";
}

function makeSingleElimPairings(){
  var playersArray = registerPlayers();

  var counter = 0;
  for(var i = 0; i < playersArray.length; i++){

    if(counter == 2){
      counter = 0;

      //Space the list
      //var player = {playerName: "----------", ID: "0"};
      //addSingleElimMatch(player.playerName);
      addSpace();
    }

    addSingleElimMatch(playersArray[i].playerName);
    counter++;
  }

  
}
