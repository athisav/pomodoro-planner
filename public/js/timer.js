paired_data = [];
var but2 = document.getElementById("timer-button-2")
var but3 = document.getElementById("timer-button-3")
//Loads assigment data
function refresh_data () {
    if(localStorage.getItem("data")!= null){
      data = localStorage.getItem("data");
      data = JSON.parse(data);
      for (var i=0; i<data.assignments.length; i++) {
        if(data.assignments[i]+""==""){

        }else{
        paired_data.push({
          assignment : data.assignments[i],
          days_till_due : data.days_till_due[i]
        });
      }
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
function cleardata(){
  //paired_data = [];
  localStorage.clear();
  return 0;
}
function listassign(){
  console.log(paired_data);
}
loadInputInfo();
//Functions
var paused = false;
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
  var countdown = 1;
  var state = 0;
  var running = false;
  var inter = false;//True when on select mode
  var cont = null;
  but3.style.visibility = "hidden"
//initialization of next timer
  function init(cont){
    cleardata();
    saveInputInfo();
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
          time = 5;
      }else if(cont){
        assignment_display.innerHTML = "'" + "Break Time!" + "'";
        inter = true;
        state = 0;
      }else{
        assignment_display.innerHTML = "'" + "Break Time!" + "'";
        inter = true;
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
    if(!paused&&!inter){
      countdown--;
      displaytime(countdown);
      if(countdown<1){
          return 1;
      }
    }else{
      timer.innerHTML = "PAUSED"
    }
      return 0;
  }

/******************************************************************************
                                Main Program
*******************************************************************************/


//loop that keeps running once every second
  function loop(){
    if(running){
      if(update()){
          init(cont);
          if(cont == true){
            cont = false;
          }
          if(inter == true){
            but2.innerHTML = "Not Done";
            but3.style.visibility = "initial";
            but3.innerHTML = "Done";
          }else{
            but2.innerHtml = "Pause";
            but3.style.visibility = "hidden";
          }
      }
    }else{
      //console.log("stop");
    }
  }
function main_loop () {
  //console.log("init");
  refresh_data();
  assignment_display = document.getElementById("timer_assignment");
  assignment_display.innerHTML = "'" + "Get Ready!" + "'";
  button = document.getElementById("timer-button-2");
  button.innerHTML = "Pause"
  timer = document.getElementById("timer");
  //Preperation time
  countdown = 1;
  state = 0;
  running = true;
  setInterval(loop,1000);
}

//pauses timer
function pause(){
  if(paused){
    paused = false;
  }else{
    paused = true;
  }
}

function button2(){
  if(!running){
    main_loop();
  }else if(inter){
    cont = true;
    inter = false;
  }else{
    pause();
  }
}

function button3(){
  cont = false;
  inter = false;
}

but2.addEventListener("click", button2);

but3.addEventListener("click", button3);
