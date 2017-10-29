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

function main_loop () {
  refresh_data()
  assignment_display = document.getElementById("timer_assignment")
  assignment_display.innerHTML = "'" + "Get Ready!" + "'"
  button = document.getElementById("timer-button-2")
  button.removeEventListener("click", loop)
  button.remove()
  timer = document.getElementById("timer")

  var countdown = 10;
  var state = 0;

  function second_minute(i){
      var x = i;
      var y = 0;
  while(x>=60){
      x-= 60
      y++;
  }
  return([y,x])
  }

  function init(){
      var time = 10;
      if(state == 0){
          console.log("aaa")
          //assigment
          assignment_display.innerHTML = "'" + paired_data[0].assignment + "'"
          //
          state = 1
          time = 1500;
      }else{
        assignment_display.innerHTML = "'" + "Break Time!" + "'"
          paired_data.shift()
          state = 0
      }
      countdown = time;
      refresh_data()
  }

  function update(){
      countdown--;
      if(countdown<1){
          timer.innerHTML = "Count down is done!"
          return 1;
      }else{
          timer.innerHTML = second_minute(countdown)[0] + " : " + second_minute(countdown)[1];
          return 0;
      }
  }
  function loop(){
      if(update()){
          init()
      }
  }
  setInterval(loop,1000)
}

document.getElementById("timer-button-2").addEventListener("click", main_loop)