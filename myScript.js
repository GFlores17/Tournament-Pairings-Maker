function countTableRows() {
  var rowCount = 0;
  var table = document.getElementById("myTable");
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
  var table = document.getElementById("myTable");
  var rowCount = table.rows.length;
  table.deleteRow(rowCount - 1);
}

function addMatchToTable(player1Name, player2Name) {
  //Get table by ID and find how many rows it has.
  var table = document.getElementById("myTable");
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
  //Get table by ID and find how many rows it has.
  var table = document.getElementById("myTable");
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

function oddNumberPlayersShift(vec) {
  //Shift array of players as needed in the oddPlayerPairingsAlgorithm();
  var placeholder = vec[0];
  vec.shift();
  vec.push(placeholder);
}

function evenNumberPlayersShift(vec) {
  //Shift array of players as needed in the evenPlayerPairingsAlgorithm();
  var temp = vec[0];
  vec.shift();
  vec.splice(vec.length - 1, 0, temp);
}

function oddPlayerPairingsAlgorithm(vec) {
  var originalPivot = vec[Math.floor(vec.length / 2)].playerName;

  /*
  We repeatedly shift the player's vector to assign pairings until all players have been the current pivot at least once.
  This is checked by shifting the current pivot every round, and if the value of the current pivot matches the original pivot,
  this means every player has gotten 1 round with a bye.

  Example : Round 1 : [0 | 1 | (2) | 3 | 4 ];
  2 is current pivot (and originalPivot) because it is the middle index of the array. 2 gets the bye round.
  The array is shifted every round.

  Round 2 : [1 | (2) | 3 | 4 | 0];
  Current Pivot : 3
  3 != 2;

  Round 3: [(2) | 3 | 4 | 0 | 1];
  Current Pivot : 4
  4 != 2;

  Round 4: [3 | 4 | 0 | 1 | (2)];
  Current Pivot : 0
  0 != 2;

  Round 5: [4 | 0 | 1 | (2) | 3];
  Current Pivot : 1
  1 != 2;

  Round 6: [0 | 1 | (2) | 3 | 4];
  Current Pivot : 2
  2 == 2;
  break;

  The algorithm does not create round 6.
  The algorithm finishes and exits.
  */
  var currentPivot = (Math.floor(vec.length / 2));
  var increment = 1;

  var numberOfRounds = 0;
  addRound(numberOfRounds);

  while (1) {//Create 1st round.
    console.log(vec[(currentPivot - increment)].playerName + " vs " + vec[(currentPivot + increment)].playerName);
    addMatchToTable(vec[(currentPivot - increment)].playerName, (vec[(currentPivot + increment)].playerName));

    if ((currentPivot - increment) == 0) {
      //If all pairings for the first round are assigned.

      addMatchToTable(vec[currentPivot].playerName, "BYE");
      //Assign bye.

      oddNumberPlayersShift(vec);
      //Shift players to assign next rounds pairings.

      increment = 1;
      //Reset the increment.
      console.log(vec[currentPivot] + "ADDED");
      console.log("Increment ++");

      currentPivot = Math.floor(vec.length / 2);
      console.log("New Pivot : " + currentPivot);

      numberOfRounds++;
      addRound(numberOfRounds);
      break;
    }
    else {
      increment++;
    }
  }//end while loop

  while (vec[currentPivot].playerName != originalPivot) {//Create every additional round.
    addMatchToTable(vec[(currentPivot - increment)].playerName, (vec[(currentPivot + increment)].playerName));
    //Assign pairings.

    if ((Math.floor(vec.length / 2) - increment) == 0) {
      addMatchToTable(vec[currentPivot].playerName, "BYE");
      //Assign bye.

      oddNumberPlayersShift(vec);
      //Shift players to assign next rounds pairings.

      increment = 1;
      //Reset the increment.

      currentPivot = Math.floor(vec.length / 2);

      numberOfRounds++;
      addRound(numberOfRounds);
      //matches.push("NEW ROUND");
    }
    else {
      increment++;
    }
  }//end while
  
  deleteLastRowOfTable();
}//end evenPlayerPairings

function evenPlayerPairingsAlgorithm(vec) {

  printArrayOfStrings(vec);
  var originalTop = vec[0].playerName;
  console.log("Original Top : " + originalTop);

  var topIndex = 0;

  var center = [(vec.length - 1)];

  var increment = 0;
  var counter = 0;
  var numberOfRounds = 0;
  addRound(numberOfRounds);

  while (1) {
    console.log(vec[(topIndex + increment)].playerName + " vs " + vec[(center - increment)].playerName);
    addMatchToTable(vec[(topIndex + increment)].playerName, vec[(center - increment)].playerName);

    if (vec[topIndex + (increment + 1)] == vec[(center - increment)]) {
      evenNumberPlayersShift(vec);
      printArrayOfStrings(vec);
      increment = 0;


      topIndex = 0;
      console.log("NEW TOP : " + vec[topIndex].playerName);

      numberOfRounds++;
      addRound(numberOfRounds);
      console.log("LEAVING FIRST WHILE LOOP");
      break;
    }

    else {
      increment++;
      counter++;
      console.log("COUNTER: " + counter);
    }
  }//end while loop

  while (vec[topIndex].playerName != originalTop) {
    console.log("SECOND WHILE LOOP");
    console.log(vec[(topIndex + increment)].playerName + " vs " + vec[(center - increment)].playerName);
    addMatchToTable(vec[(topIndex + increment)].playerName, vec[(center - increment)].playerName);

    if (vec[topIndex + (increment + 1)] == vec[(center - increment)]) {
      console.log(vec[topIndex+(increment+1)].playerName + "==" + vec[center - increment].playerName);
      console.log("SHIFTING");
      evenNumberPlayersShift(vec);
      printArrayOfStrings(vec);
      increment = 0;


      topIndex = 0;
      console.log("NEW TOP INDEX : " + vec[topIndex].playerName);

      numberOfRounds++;
      addRound(numberOfRounds);
      
    }
    else {
      increment++;
      counter++;
      console.log("COUNTER: " + counter);
    }
  }//end while
  deleteLastRowOfTable();
}//end oddPlayerPairings

function generateRoundRobinPairings() {
  var counter;

  var numOfPlayers = prompt("Please enter number of players.");
  var isNum = isNumeric(numOfPlayers);
  while(isNum == false){
    numOfPlayers = prompt("Not a valid number, try again.");
    isNum = isNumeric(numOfPlayers);
  }
  var vec = [];
  var newText = "";

  for (var i = 0; i < numOfPlayers; i++) {
    var name = prompt("Player " + (i + 1) + " name?");
    var player = { playerName: name, ID: i };
    vec.push(player);
    newText = newText + vec[i].playerName + "/";
  }

  alert("VEC LENGTH: " + vec.length);
  alert(vec[0].playerName);
  printArrayOfStrings(vec);

  var counter;
  var players = vec.length;

  console.log("IF PLAYERS ODD:");

  if (players % 2 == 1) {
    oddPlayerPairingsAlgorithm(vec);
  }

  else {
    evenPlayerPairingsAlgorithm(vec);
  }

  //Current algorithm adds a "Round (n)" row before checking for exist condition. So that row is just deleted.  
}//end pairings()

function isNumeric(num){
  //Checks if number.
  console.log("NUMBER ? " + !isNaN(num));
  return !isNaN(num)
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