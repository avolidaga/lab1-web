<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header("Access-Control-Allow-Headers: X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    print_r(parse_url($_SERVER['REQUEST_URI'], PHP_URL_SCHEME));
    $path = parse_url($_SERVER['REQUEST_URI'])['path'];
    if ($path == '/api/hit') {
        $script_start = microtime(true);
        if (isset($_GET['r']) && isset($_GET['x']) && isset($_GET['y'])) {
            if (is_numeric($_GET['x']) && is_numeric($_GET['y']) && is_numeric($_GET['r'])) {

                $xValue = floatval($_GET['x']);
                $yValue = floatval($_GET['y']);
                $rValue = floatval($_GET['r']);
                
                responseCreator($xValue, $yValue, $rValue, $script_start);
            } else {
                http_response_code(400);
                echo 'Bad request';
                exit(400);
            }
            
        } else {
            http_response_code(400);
            echo 'Bad request';
            exit(400);
        }
    }
}

function hit($x, $y, $r)
{
    if (
        $x <= 0 &&
        $y >= 0 &&
        $x >= -$r &&
        $y <= $r                                                           // 2 квадранта
    ) {
        return true;
    } elseif ($x < 0 && $y < 0) {                                         // 3 квадранта
        return false;
    } elseif ($x > 0 && $y > 0){ 
        if($y <= -2*$x+$r){
            return true;
        }
        return false;                                                      // 1 квадранта
        
    } elseif ($x >= 0 && $y <= 0) {                                          // 4 квадранта
        if (($x ** 2 + $y ** 2) <= $r ** 2) {
            return true;
        }
        return false;
    }
}


function responseCreator($xValue, $yValue, $rValue, $script_start)
{
    header('Content-Type: text/html');
    http_response_code(201);

    $hit = hit($xValue, $yValue, $rValue);

    $hitted = $hit ? 'hitted' : 'miss';
    $currentTime = gmDate("H:i:s", time() + 3600 * (3 + date("I")));
    $execution_time = ceil((microtime(true) - $script_start) * 100000000) / 100;
    echo "
            <tr style='text-align: center;'>
                <td>$xValue</td>
                <td>$yValue</td>
                <td>$rValue</td>
                <td>$hitted</td>
                <td>$currentTime</td>
                <td>$execution_time ms</td>
            </tr>";
    exit(201);
}
