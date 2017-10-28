//initalizing the data to build the correct objects

var block_collection = document.getElementById("assignmentBlockCollection")

var input_block = "<h5 class='header center black-text'>Assignment Name</h5><div class='row center'><div class='input-field col s12'><input id='assignment' type='text' class='validate assignment'><label for='assignment'>Assignment</label></div></div><br><br><br><br><br><h5 class='header center black-text'>Due Date</h5><input type='date' class='datepicker date'><br><br><br>"

function addInputBlock() {
  var el = document.createElement("div")

  el.setAttribute("id", "inputBlock")

  el.innerHTML = input_block

  block_collection.appendChild(el)
}


//getting the saved data
data = JSON.parse(localStorage.getItem("data"))

//building enough input blocks for that data
for (var i=1; i<dates.assignments.length; i++) {
  addInputBlock()
}

//filling the input blocks with the data for people to edit
assignments_raw = document.getElementsByClassName("assignment")
for (var i=0; i<assignments_raw.length; i++) {
  assignments_raw[i].value = data.assignments[i]
}

dates_raw = document.getElementsByClassName("date")
for (var i=0; i<dates_raw.length; i++) {
  dates_raw[i].value = data.dates[i]
  console.log("Done")
}