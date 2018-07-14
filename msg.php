<?php
  if (isset($_POST['submit'])) {
    $name=$_POST['name'];
    $email=$_POST['email'];
    $msg=$_POST['message'];
    echo 'thanks for your message!';
  }
?>
