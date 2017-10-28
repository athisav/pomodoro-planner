var running=true

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function timer(elementName, minutes, seconds) {

  var element, endTime, hours, mins, msLeft, time

  function twoDigits(n) {
    return (n <= 9 ? "0" + n : n)
  }

  function updateTimer() {
    msLeft = endTime - (+new Date)
    if (msLeft < 1000) {
      element.innerHTML = "Count down is done!"
    } else {
    time = new Date( msLeft )
    hours = time.getUTCHours()
    mins = time.getUTCMinutes()
    console.log(hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds())
    element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() )
    sleep( time.getUTCMilliseconds() + 500 )
    updateTimer()
    }
  }

  element = document.getElementById(elementName)
  endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500
  console.log("hello")
  updateTimer()
}

paired_data = []

function refresh_data () {
  data = localStorage.getItem("data")
  data = JSON.parse(data)

  for (var i=0; i<data.assignments.length; i++) {
    paired_data.push({assignment : data.assignments[i], days_till_due : data.days_till_due[i]})
  }

  sorted_status = false

  while (sorted_status=false) {
    sorted_status = true
    for (var i=0; i<paired_data.length; i++) {
      if (i+1!=paired_data.length) {
        if (paired_data[i].days_till_due>paired_data[i+1].days_till_due) {
          var d1 = paired_data[i]
          var d2 = paired_data[i+1]
          paired_data[i] = d2
          paired_data[i+1] = d1
          sorted_status = false
        }
      }
    }
  }
}

refresh_data()

function loop () {
  refresh_data()
  assignment_display = document.getElementById("timer_assignment")
  button = document.getElementById("timer-button-2")
  button.removeEventListener("click", loop)
  this_assignment = true
  for (var i=0; i<paired_data.length; i++) {
    if (this_assignment==true) {
      assignment_display.innerHTML = "'" + paired_data[i].assignment + "'"
      button.innerHTML = "Don't Click Here, Go Work!"
      timer("timer", 0, 10)
    }
    button.innerHTML = "Done With This Assignment?"
    timer("timer", 0, 10)
  }
}

document.getElementById("timer-button-2").addEventListener("click", loop)