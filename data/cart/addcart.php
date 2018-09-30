<?php
require_once("../init.php");
session_start();
@$uid=2;//$_SESSION["uid"];
@$lid=$_REQUEST["lid"];
@$count=$_REQUEST["count"];
if($uid!=null&&$lid!=null&&$count!=null){
	$sql="SELECT * FROM audi_shoppingcart_item WHERE user_id='$uid' AND product_id='$lid'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	$iid=$row[0];
	if($row==null){
		$sql="INSERT INTO audi_shoppingcart_item VALUES(NULL,$uid,$lid,$count,0)";
	}else{
		$sql="UPDATE audi_shoppingcart_item SET count=count+$count WHERE iid='$iid'";
	}
		$result=mysqli_query($conn,$sql);
}
?>