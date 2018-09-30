<?php
require_once("../init.php");
@$jobnumber=$_REQUEST["jobnumber"];
if($jobnumber!=null&&$jobnumber!=""){
	$sql="SELECT jobnumber FROM audi_job WHERE jobnumber='$jobnumber'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	$sql="SELECT jobnumber FROM audi_user WHERE jobnumber='$jobnumber'";
	$result1=mysqli_query($conn,$sql);
	$row1=mysqli_fetch_row($result1);
	if($row!=null && $row1==null){
		echo "可以注册";
	}else if($row1!=null){
		echo "该会员已注册过账号";
	}else if($row==null){
		echo "会员号有误，请重新输入！";
	}
}
?>