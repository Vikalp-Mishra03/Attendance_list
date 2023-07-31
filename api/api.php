<?php
// Function to get the attendance data from the PHP file
function getAttendanceData() {
    $dataFile = 'data.php';

    if (!file_exists($dataFile)) {
        return array();
    }

    return include $dataFile;
}

// Function to save the attendance data to the PHP file
function saveAttendanceData($data) {
    $dataFile = 'data.php';
    $content = "<?php\nreturn " . var_export($data, true) . ";\n";

    file_put_contents($dataFile, $content);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the name and status from the POST request
    $name = $_POST["name"];
    $status = $_POST["status"] ?? "present"; // If status is not provided, default to "present"

    // Get existing attendance data
    $data = getAttendanceData();

    // Add the new name and status to the data
    $data[] = array("name" => $name, "status" => $status);

    // Save the updated data to the PHP file
    saveAttendanceData($data);

    // Respond with the updated data (for AJAX)
    echo json_encode(calculateAttendanceStats($data));
} else {
    // For GET requests, simply return the data
    $data = getAttendanceData();
    echo json_encode(calculateAttendanceStats($data));
}

// Function to calculate attendance statistics
function calculateAttendanceStats($data) {
    $totalDays = count($data);
    $totalPresent = 0;
    $totalAbsent = 0;

    foreach ($data as $item) {
        if ($item["status"] === "present") {
            $totalPresent++;
        } else {
            $totalAbsent++;
        }
    }

    return array(
        "totalDays" => $totalDays,
        "totalPresent" => $totalPresent,
        "totalAbsent" => $totalAbsent,
        "attendanceData" => $data
    );
}
?>
