<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CBT System - Create Account</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body class="login-page">
  <?php
    include_once('config.php');
    if(isset($_POST['submit']))
    {
    $name=$_POST['name'];
    $class=$_POST['class'];
    $subject=$_POST['subject'];
    $bret=mysqli_query($con,"SELECT * FROM pupil WHERE name='".$_POST['name']."'");
$num=mysqli_fetch_array($bret);
if($num<1)
{
    $query="INSERT INTO pupil(name,class,subject) VALUES ('$name','$class','$subject')";
        $result = mysqli_query($con,$query);}
        else{
        echo "<script>alert ('Account already Exists');</script>";
    }
        if($num<1) {
            echo "<div class='brand'>
            <h3>You are registered successfully.</h3><br/>
            <p class='link'>Click here to <a href='login.php'>Login</a></p>
            </div>";
        } else {
            echo  "<div class='brand'>
            <h3>Required fields are missing.</h3><br/>
            <p class='link'>Click here to <a href='registration.php'>registration</a>again.</p>
            </div>";
        }
    } else {
    ?>
  <main class="login-card">
    <div class="brand">CBT<span>Pro</span></div>
    <h1>Computer Based Test</h1>
    <p class="muted">Enter your details to begin.</p>

    <form class= "form" action="" method="post">
      <label for="studentName">Student Name</label>
      <input id="studentName" type="text" name="name" placeholder="Enter your name" required>

      <label for="studentClass">Class</label>
      <select id="studentClass" name="class" required>
        <option value="">Select class</option>
        <option>JSS 1</option>
        <option>JSS 2</option>
        <option>JSS 3</option>
        <option>SS 1</option>
        <option>SS 2</option>
        <option>SS 3</option>
      </select>

      <label for="subject">Subject</label>
      <select id="subject" name="subject" required>
        <option value="">Select subject</option>
        <option>Basic Science</option>
        <option>Mathematics</option>
        <option>English Language</option>
      </select>

      <button class="btn primary" type="submit" name="submit">Register</button>
    </form>
  </main>
  <script src="js/questions.js"></script>
  <script src="js/exam.js"></script>
  <?php
    }
    ?> 
</body>
</html>
