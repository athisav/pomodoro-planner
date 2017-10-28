//all of this is for the dynamic input modification
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

//all of this is for storing data
//used for maintaing a optimized list of assignments and dates
function arrayUnique(array) {
    var a = array.concat()
    var b = []
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1)
                b.push(j)
        }
    }
    return [a, b]
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
  existing_data = localStorage.getItem("data")
  var merger_data = arrayUnique(existing_data.assignments.concat(work_data.assignments))
  var final_data = []
  final_data.assignments = merger_data[0]
  final_data.dates = work_data.dates
  for (var i=0; i<merger_data[1].length; i++) {
    final_data.dates.splice(merger_data[1][i]--, 1)
  }
  localStorage.setItem("data", JSON.stringify(final_data))

function deleteData() {
  localStorage.setItem("data", " ")
}