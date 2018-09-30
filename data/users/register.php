<?php
require_once("../init.php");
@$jobnumber=$_REQUEST["jobnumber"];
@$uname=$_REQUEST["uname"];
@$upwd=$_REQUEST["upwd"];
@$email=$_REQUEST["email"];
@$phone=$_REQUEST["phone"];
@$user_name=$_REQUEST["user_name"];
if($jobnumber!=null&&$uname!=null&&$upwd!=null&&$email!=null&&$phone!=null&&$user_name!=null){
	$sql="INSERT INTO audi_user (jobnumber,uname,upwd,email,phone,user_name) VALUES ('$jobnumber','$uname',md5('$upwd'),'$email','$phone','$user_name')";
	$result=mysqli_query($conn,$sql);
		if($result!=false){
			session_start();
			$_SESSION["uname"]=$uname;
			echo "注册成功！您的用户名为$uname";
		}
}else{
	echo "请完善好个人信息";
}
?>