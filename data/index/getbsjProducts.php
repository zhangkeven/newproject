<?php
require_once("../init.php");
$sql="select * from bsj_index_product";
$result=mysqli_query($conn,$sql);
echo json_encode(mysqli_fetch_all($result,1));