<?php 

$amount = $_GET['amount'];
$cycle = $_GET['cycle'];
$expectedProfitRate = $_GET['expectedProfitRate'];
$profitType = $_GET['profitType'];
$risk = $_GET['risk'];
$pageSize = $_GET['pageSize'];
$pageNum = $_GET['pageNum'];

$params = 'amount='.$amount.'&cycle='.$cycle.'&expectedProfitRate='.$expectedProfitRate.'&profitType=0&risk='.$risk.'&productType=3101%2C3103%2C3102';

$params = $params.'&pageSize='.$pageSize.'&pageNum='.$pageNum;

$licai_url = 'http://caifu.baidu.com/wealth/ajax?module=Finance&category=wealth&'.$params;

$tuCurl = curl_init();
curl_setopt($tuCurl, CURLOPT_URL, $licai_url);
curl_setopt($tuCurl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($tuCurl, CURLOPT_HEADER, 0);


$tuData = curl_exec($tuCurl);

if(!curl_errno($tuCurl)){ 
  // $info = curl_getinfo($tuCurl); 
  // echo 'Took ' . $info['total_time'] . ' seconds to send a request to ' . $info['url']; 
} else { 
    $result = array(
        'status'=> '1',
        'statusInfo'=> 'Curl error: '.curl_error($tuCurl)
    );
    $tuData = json_encode($result);
} 

curl_close($tuCurl); 
echo $tuData; 
exit;
