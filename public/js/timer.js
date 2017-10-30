paired_data = [];
//Loads assigment data
function refresh_data () {
    if(localStorage.getItem("data")!= null){
    data = localStorage.getItem("data");
    data = JSON.parse(data);

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
};
function clearassign(){
  paired_data = [];
  localStorage.clear();
  return 0;
}
function listassign(){
  console.log(paired_data);
}
refresh_data();
//The main program
function main_loop () {
  //console.log("init");
  refresh_data();
  assignment_display = document.getElementById("timer_assignment");
  assignment_display.innerHTML = "'" + "Get Ready!" + "'";
  button = document.getElementById("timer-button-2");
  button.removeEventListener("click", loop);
  button.remove();
  timer = document.getElementById("timer");
  //Preperation time
  var countdown = 1;
  var state = 0;
  var running = true;
//conversion between seconds and minutes
  function second_minute(i){
      var x = i;
      var y = 0;
    while(x>=60){
        x-= 60;
        y++;
    }
    return([y,x]);
  }
//initialization of next timer
  function init(){
      var time = 300;
      if(state == 0){
          //console.log("aaa");
          //assigment
          if(paired_data[0] == null){
            running = false;
            assignment_display.innerHTML = "All Done!"
          }else{
          assignment_display.innerHTML = "'" + paired_data[0].assignment + "'";
        }
          //

          state = 1
          time = 1500;

      }else{
        assignment_display.innerHTML = "'" + "Break Time!" + "'";
          paired_data.shift();
          state = 0;
      }
      countdown = time;
      refresh_data();
  }
  //normalizes time, makes weird things like 0:4 into 00:04
function timezeros(time){
  var output = "";
  if(time<10){
    output = "0"+ time;
  }else{
    output = time;
  }
  return(output);
};
//displays the time(an array with minutes then seconds)
function displaytime(t){
  var time = second_minute(t);
  var minute = timezeros(time[0]);
  var second = timezeros(time[1]);
  timer.innerHTML = minute + " : " + second;
}
//updates timer
  function update(){
      countdown--;
      displaytime(countdown);
      if(countdown<1){
          return 1;
      }

      return 0;
  }
  function loop(){
    if(running){
      if(update()){
          init();
      }
    }else{
      //console.log("stop");
    }
  }
  setInterval(loop,1000);
}
document.getElementById("timer-button-2").addEventListener("click", main_loop);
