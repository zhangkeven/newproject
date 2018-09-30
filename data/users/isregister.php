<?php
require_once("../init.php");
session_start();
@$uname=$_SESSION["uname"];
if($uname!=null){
	$sql="SELECT uname,upwd FROM audi_user WHERE uname='$uname'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	echo json_encode(["ok"=>1,"uname"=>$row[0],"upwd"=>$row[1]]);
}else{
	echo json_encode(["ok"=>0]);
}
?>