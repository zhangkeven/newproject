<?php
require_once("../init.php");
@$jobnumber=$_REQUEST["jobnumber"];
@$uname=$_REQUEST["uname"];
@$upwd=$_REQUEST["upwd"];
@$email=$_REQUEST["email"];
@$phone=$_REQUEST["phone"];
@$user_name=$_REQUEST["user_name"];
if($uname!=null && $uname!=""){
	$sql="SELECT uname FROM audi_user WHERE uname='$uname'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
}
if($jobnumber!=null&&$jobnumber!=""){
	$sql="SELECT jobnumber FROM audi_user WHERE jobnumber='$jobnumber'";
	$result=mysqli_query($conn,$sql);
	$row1=mysqli_fetch_row($result);
}
if($jobnumber!=null&&$jobnumber!=""){
	$sql="SELECT jobnumber FROM audi_job WHERE jobnumber='$jobnumber'";
	$result=mysqli_query($conn,$sql);
	$row2=mysqli_fetch_row($result);
}
if($row1==false){
	echo "请输入正确的工号！$row1";
}else if($row1!=null){
	echo "该工号已注册过账号，请重新输入！";
}else if($row==false){
	echo "请输入用户名！";
}else if($row!=null){
	echo "该用户名已存在！";
}else{
	if($jobnumber!=null&&$uname!=null&&$upwd!=null&&$email!=null&&$phone!=null&&$user_name!=null){
	$sql="INSERT INTO audi_user(jobnumber,uname,upwd,email,phone,user_name) VALUES		('$jobnumber','$uname','$upwd','$email','$phone','$user_name')";
		$result=mysqli_query($conn,$sql);
		if($result!=false){
			session_start();
			$_SESSION["uname"]=$uname;
			echo "注册成功！您的用户名为$uname";
		}else{
			echo "请完善好个人信息";
		}
	}
}
?>