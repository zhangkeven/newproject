<?php
require_once("../init.php");
//制作分页
$output=[
	"count"=>0,//总数
	"pageSize"=>9,//每页9个
	"pageCount"=>0,//总页数=ceil(count/pageSize);
	"pageNo"=>0,//当前第几页
	"products"=>[]//商品列表
];
@$kw=$_REQUEST["kw"];
@$pno=$_REQUEST["pno"];
if($kw!=null&&$pno!=null){
	//用空格关键词切割，变成数组
	$kws=explode(" ",$kw);
	//遍历并替换数组元素为指定格式
	for($i=0;$i<count($kws);$i++){
		$kws[$i]=" title like '%".$kws[$i]."%' ";
	}
	/*[
		"title like '%关键词%'",
		"title like '%关键词%'",
		"title like '%关键词%'"
	]*/
	//用and相连
	$where=implode(" and ",$kws);
	//把输入的关键词拼接为sql语句 去数据库查询数据
	$sql="SELECT * FROM audi_laptop WHERE $where";
	//查询数据总条数
	$result=mysqli_query($conn,$sql);
	$count=count(mysqli_fetch_all($result,1));
	//根据总数和分页数量，计算出总页数
	$pageCount=ceil($count/$output["pageSize"]);
	//把查到的总条数赋值给output数组
	$output["count"]=$count;
	//把计算出的总页数赋值给output数组
	$output["pageCount"]=$pageCount;
	//查找商品需要的图片规格,用子查询-跨表查询，子查询必须加limit ，返回几行数据的意思
	$sql="SELECT *,(SELECT md from audi_laptop_pic WHERE laptop_id=lid limit 1) as md,(SELECT lg from audi_laptop_pic WHERE laptop_id=lid limit 1) as lg FROM audi_laptop WHERE $where";
	//拼接分页查询
	$sql.=" limit ".$pno*$output["pageSize"].",".$output["pageSize"];
	$output["pageNo"]=$pno;
	$result=mysqli_query($conn,$sql);
	$output["products"]=mysqli_fetch_all($result,1);
}
echo json_encode($output);
?>
