<?php
require_once("../init.php");
@$kw=$_REQUEST["term"];
$products=[];
if($kw!=null){
	$sql="select lid, title, sold_count from audi_laptop ";
	$kws=explode(" ",$kw);
	for($i=0;$i<count($kws);$i++){
		$kws[$i]=" title like '%".$kws[$i]."%' ";
	}
	$where=" where ".implode(" and ",$kws);
	$sql.=$where;
	$sql.=" order by sold_count desc limit 10 ";
	$result=mysqli_query($conn,$sql);
	$products=mysqli_fetch_all($result,1);
	if($products==null || $products==""){
		$products=[["lid"=>"12","title"=>"未找到","sold_count"=>"无"]
				];
	}
}
echo json_encode($products);
