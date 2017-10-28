<!DOCTYPE HTML>
<html>
<head>
<!--<style>
body {background-color: #ff8C00;}
h1   {color: 000000;}
p    {color: 000000;}-->

<br>
<div align="center">
<h1><strong>Thank you for your repsonse</strong></h1> 
<br>

<br>
<a href="final website.html">Back to home page</a> 


</div>
<?php
            $myfile = fopen("response.txt", "a");
            file_put_contents("response.txt", "name: ");
            file_put_contents("response.txt", $_POST["fname"]);
            file_put_contents("response.txt", " ");
            file_put_contents("response.txt", $_POST["lname"]);
            file_put_contents("response.txt", "/n");
            file_put_contents("response.txt", "Feedback: ")
            file_put_contents("response.txt", $_POST["feed"]);
            file_put_contents("response.txt", "/n");
            print( $_POST["feed"]);
            print("Debug");
            fclose("response.txt");
        ?>
</body>
</html>
