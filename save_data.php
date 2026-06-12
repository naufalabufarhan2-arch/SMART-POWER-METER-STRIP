<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if(!$data){
    echo json_encode([
        "status" => "error",
        "message" => "No data received"
    ]);
    exit;
}

file_put_contents(
    "sensor.json",
    json_encode($data, JSON_PRETTY_PRINT)
);

echo json_encode([
    "status" => "success"
]);
?>
