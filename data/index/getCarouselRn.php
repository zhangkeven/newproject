<?php
require_once("../init.php");
$sql="select * from audi_index_carousel_rn";
$result=mysqli_query($conn,$sql);
echo json_encode(mysqli_fetch_all($result,1));