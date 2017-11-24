var sorted_status = false;
//getting the place that will be modified
var block_collection = document.getElementById("assignmentBlockCollection")

//turning this html text into html object

function addInputBlock(name,days) {
  if(name==undefined||days==undefined){
    name = ""
    days = ""
  }
  var e = document.createElement("div");
  var input_block = "<div id='inputBlock'><h5 class='header center black-text'>Assignment</h5><div class='row center'><div class='input-field col s12'><input value='"+name+"' id='assignment' type='text' class='validate assignment' required><label for='assignment'>Assignment Name</label></div></div><br><br><br><br><br><div class='row center'><div class='input-field col s12'><input value='"+days+"' id='days-till-due' type='text' class='validate days-till-due' required><label for='days-till-due'>Days Till Due</label></div></div><br><br><br></div>";
  e.setAttribute("id", "inputBlock");
  e.innerHTML = input_block;

  block_collection.appendChild(e);
}

function arrayUnique(array) {
    var a = array.concat();
    var b = []
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
                b.push(j)
        }
    }
    return [a, b]
}

function loadInputInfo(){
  if(localStorage.getItem("data")!= null){
    for (var i=0; i<data.assignments.length; i++) {
      paired_data.push({
        assignment : data.assignments[i],
        days_till_due : data.days_till_due[i]
      });
    }

    sorted_status = false;

    while (sorted_status==false) {
      sorted_status = true;
      for (var i=0; i<paired_data.length; i++) {
        if (i+1!==paired_data.length) {
          if (paired_data[i].days_till_due>paired_data[i+1].days_till_due) {
            var d1 = paired_data[i];
            var d2 = paired_data[i+1];
            paired_data[i] = d2;
            paired_data[i+1] = d1;
            sorted_status = false;
          }
        }
      }
    }
  }
  for(var i = 0; i<paired_data.length; i++){
    console.log("" + paired_data[i].assignment);
    console.log(paired_data[i].days_till_due);
    addInputBlock("" + paired_data[i].assignment,paired_data[i].days_till_due);
  }
}

function saveInputInfo() {
  assignments_raw = document.getElementsByClassName("assignment")
  assignments = []
  for (var i=0; i<assignments_raw.length; i++) {
    assignments.push(assignments_raw[i].value)
  }

  days_till_due_raw = document.getElementsByClassName("days-till-due")
  days_till_due = []
  for (var i=0; i<days_till_due_raw.length; i++) {
    days_till_due.push(days_till_due_raw[i].value)
  }
  work_data = {}
  work_data.assignments = assignments
  work_data.days_till_due = days_till_due
  localStorage.setItem("data", JSON.stringify(work_data))
  console.log(JSON.stringify(work_data))
}
