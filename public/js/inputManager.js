//getting the place that will be modified
var block_collection = document.getElementById("assignmentBlockCollection")

//turning this html text into html object
var input_block = "<h5 class='header center black-text'>Assignment Name</h5><div class='row center'><div class='input-field col s12'><input id='assignment' type='text' class='validate assignment'><label for='assignment'>Assignment</label></div></div><br><br><br><br><br><h5 class='header center black-text'>Due Date</h5><input type='date' class='datepicker date'><br><br><br>"

function addInputBlock() {
  var e = document.createElement("div")

  e.setAttribute("id", "inputBlock")

  e.innerHTML = input_block

  block_collection.appendChild(e)
}

function saveInputInfo() {
  assignments_raw = document.getElementsByClassName("assignment")
  assignments = []
  for (var i=0; i<assignments_raw.length; i++) {
    assignments.push(assignments_raw[i].value)
  }

  dates_raw = document.getElementsByClassName("date")
  dates = []
  for (var i=0; i<dates_raw.length; i++) {
    dates.push(dates_raw[i].value)
  }
  work_data = {}
  work_data.assignments = assignments
  work_data.dates = dates
  console.log(work_data)
}