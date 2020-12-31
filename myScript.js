
function addRow(player1Name, player2Name) {
  var table = document.getElementById("myTable");
  var rowCount = CountRows() + 1;
  var row = table.insertRow(rowCount);
  
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.innerHTML = player1Name;
  cell2.innerHTML = "vs";
  cell3.innerHTML = player2Name;
}

function CountRows() {
  var totalRowCount = 0;
  var rowCount = 0;
  var table = document.getElementById("myTable");
  var rows = table.getElementsByTagName("tr")
  for (var i = 0; i < rows.length; i++) {
    totalRowCount++;
    if (rows[i].getElementsByTagName("td").length > 0) {
      rowCount++;
    }
  }
  var message = "Total Row Count: " + rowCount;
  //message += "\nRow Count: " + rowCount;
  //alert(message);
  return rowCount;
}

function print(vec) {
  for (var i = 0; i < vec.length; i++) {
    cout << vec.at(i) << n;
  }
}

function addRound(numberOfRounds) {
  var table = document.getElementById("myTable");
  var rowCount = CountRows() + 1;
  var row = table.insertRow(rowCount);

  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  cell1.innerHTML = "";
  cell2.innerHTML = "ROUND " + (numberOfRounds + 1);
  cell3.innerHTML = "";

  row.style.backgroundColor = "green"; 
  row.style.color = "white";
}

function tableCreate(){
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
  body.appendChild(tbl);
  return tbl.id;
}

function shiftVectorLeftOneIndex(vec) {
  var placeholder = vec[0];
  vec.shift();
  vec.push(placeholder);
}

function print(vec) {
  var output = "";
  for (var i = 0; i < vec.length; i++) {
    output = output + vec[i].playerName;
  }
  console.log("VECTOR : " + output);
}

function deleteLastRow() {
  var table = document.getElementById("myTable");
  var rowCount = table.rows.length;
  table.deleteRow(rowCount - 1);
}

function evenNumberPlayersShift(vec) {
  var temp = vec[0];
  vec.shift();
  vec.splice(vec.length - 1, 0, temp);
}

function oddPlayerPairingsAlgorithm(vec) {
  //alert(Math.floor(vec.length/2));
  var originalPivot = vec[Math.floor(vec.length / 2)].playerName;
  // alert(originalPivot);
  var currentPivot = (Math.floor(vec.length / 2));
  var increment = 1;
  var counter = 0;
  var numberOfRounds = 0;
  addRound(numberOfRounds);

  while (1) {
    console.log(vec[(currentPivot - increment)].playerName + " vs " + vec[(currentPivot + increment)].playerName);
    addRow(vec[(currentPivot - increment)].playerName, (vec[(currentPivot + increment)].playerName));

    if ((currentPivot - increment) == 0) {
      addRow(vec[currentPivot].playerName, "BYE");
      shiftVectorLeftOneIndex(vec);
      increment = 1;
      console.log(vec[currentPivot] + "ADDED");
      console.log("Increment ++");

      currentPivot = Math.floor(vec.length / 2);
      console.log("New Pivot : " + currentPivot);


      numberOfRounds++;
      addRound(numberOfRounds);
      //cout << "BREAKING" << n;
      //matches.push("NEW ROUND");
      break;
    }
    else {
      increment++;
      counter++;
      console.log("COUNTER: " + counter);
    }
  }//end while loop

  while (vec[currentPivot].playerName != originalPivot) {
    addRow(vec[(currentPivot - increment)].playerName, (vec[(currentPivot + increment)].playerName));

    if ((Math.floor(vec.length / 2) - increment) == 0) {
      addRow(vec[currentPivot].playerName, "BYE");
      shiftVectorLeftOneIndex(vec);
      increment = 1;

      currentPivot = Math.floor(vec.length / 2);

      numberOfRounds++;
      addRound(numberOfRounds);
      //matches.push("NEW ROUND");
    }
    else {
      increment++;
    }
  }//end while
  counter++;
  alert(counter);
}//end evenPlayerPairings

function evenPlayerPairingsAlgorithm(vec) {
  //alert(Math.floor(vec.length/2));
  print(vec);
  var originalTop = vec[0].playerName;
  console.log("Original Top : " + originalTop);

  var topIndex = 0;
  var topValue = vec[topIndex];

  var center = [(vec.length - 1)];
  // alert(originalPivot);

  var increment = 0;
  var counter = 0;
  var numberOfRounds = 0;
  addRound(numberOfRounds);

  while (1) {
    console.log(vec[(topIndex + increment)].playerName + " vs " + vec[(center - increment)].playerName);
    addRow(vec[(topIndex + increment)].playerName, vec[(center - increment)].playerName);

    if (vec[topIndex + (increment + 1)] == vec[(center - increment)]) {
      evenNumberPlayersShift(vec);
      print(vec);
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
    addRow(vec[(topIndex + increment)].playerName, vec[(center - increment)].playerName);

    if (vec[topIndex + (increment + 1)] == vec[(center - increment)]) {
      console.log(vec[topIndex+(increment+1)].playerName + "==" + vec[center - increment].playerName);
      console.log("SHIFTING");
      evenNumberPlayersShift(vec);
      print(vec);
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
  counter++;
  alert(counter);

}//end oddPlayerPairings

function pairings() {
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
  print(vec);

  var counter;
  var players = vec.length;

  //print(vec);
  //shiftVectorLeftOneIndex(vec);
  //print(vec);

  console.log("IF PLAYERS ODD:");


  if (players % 2 == 1) {
    oddPlayerPairingsAlgorithm(vec);
  }//end if odd number of players
  else {
    evenPlayerPairingsAlgorithm(vec);
  }


  //print(matches);
  deleteLastRow();
}//end pairings()

function isNumeric(num){
  console.log("NUMBER ? " + !isNaN(num));
  return !isNaN(num)
}