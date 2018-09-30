<?php
require_once("../init.php");
session_start();
@$uid=2;//$_SESSION["uid"];
$cart=[];
if($uid!=null){
	$sql="SELECT * ,(SELECT md from audi_laptop_pic WHERE laptop_id=lid limit 1) as md FROM audi_shoppingcart_item join audi_laptop on product_id=lid WHERE user_id='$uid'";
	$result=mysqli_query($conn,$sql);
	$cart=mysqli_fetch_all($result,1);
}
	echo json_encode($cart);
?>