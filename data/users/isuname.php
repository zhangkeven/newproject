<?php
require_once("../init.php");
@$uname=$_REQUEST["uname"];
if($uname!=null && $uname!=""){
	$sql="SELECT uname FROM audi_user WHERE uname='$uname'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	if($row==null){
		echo "用户名可用";
	}else{
		echo "用户名已存在";
	}
}	
?>