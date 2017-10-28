<!DOCTYPE html>
<html>
<style>
input[type=text], select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

input[type=submit] {
height:100%
    width: 100%;
    background-color: #4CAF50;
    color: Dark Orange;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

input[type=submit]:hover {
    background-color: dark orange;
}

div {
    border-radius: 10px;
    background-color: #f2f2f2;
    padding: 20px;
}
</style>
<body>

<div align="center">
<h1>User Survey</h1>  
</div>

<br>


<div>
  <form action = "./action.php" method="post">
    <label for="fname"><strong>First Name</strong></label>
    <input type="text" id="fname" name="firstname" placeholder="Your name..">

    <label for="lname"><strong>Last Name</strong></label>
    <input type="text" id="lname" name="lastname" placeholder="Your last name..">
    
    <label for="Feedback"><strong>Feedback</strong></label>
    <input type="text" id="feed" name="Feedback" placeholder="Your feedback..">
</form>
    <br>
<h4> Was the Pomodoro Planner was helpful?</h4>


    <form action = "./action.php">
  <input type="checkbox" name="Service" value="Service">The Pomodoro Planner was very helpful
  <br>
<br>

<br>

<br>
    <label for="country">Country</label>
    <select id="country" name="country">
      <option value="Mexico">Mexico</option>
      <option value="canada">Canada</option>
      <option value="usa">USA</option>
    </select>
  

<br>
<br>
<input type="submit" value="Submit">


    <a href="Thank_You_Page"><div align="center">
  <h3>Submit</h3>
</div>
</a>
  </form>
</div>

</body>
</html>
