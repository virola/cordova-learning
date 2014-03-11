<?php 

if ($_POST['email'] && $_POST['password']) { 
    $result = array(
        'status' => 0,
        'data' => array(
            'username' => $_POST['email'],
            'lastLogin' => '2014年2月28日14:23'
        )
    );
}
else {
    $result = array(
        'status' => 1,
        'statusInfo' => '邮箱或密码错误!'
    );
}

echo json_encode($result); 
