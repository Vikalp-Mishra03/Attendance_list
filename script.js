// Function to mark attendance
function markAttendance() {
    const nameInput = document.getElementById("nameInput");
    const name = nameInput.value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    // Send the name to the static API (api.php) using AJAX
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "api/api.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            // On success, update the attendance list and display totals
            updateAttendanceList(response.attendanceData);
            displayTotals(response.totalDays, response.totalPresent, response.totalAbsent);
            nameInput.value = "";
        } else {
            alert("Error marking attendance. Please try again.");
        }
    };
    xhr.send("name=" + encodeURIComponent(name) + "&status=present");
}

// Function to mark absent
function markAbsent() {
    const nameInput = document.getElementById("nameInput");
    const name = nameInput.value.trim();

    if (name === "") {
        alert("Please enter the user's name.");
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "api/api.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            updateAttendanceList(response.attendanceData);
            displayTotals(response.totalDays, response.totalPresent, response.totalAbsent);
            nameInput.value = "";
        } else {
            alert("Error marking the user as absent. Please try again.");
        }
    };
    xhr.send("name=" + encodeURIComponent(name) + "&status=absent");
}

// Function to add a new user
function addNewUser() {
    const nameInput = document.getElementById("nameInput");
    const name = nameInput.value.trim();

    if (name === "") {
        alert("Please enter the user's name.");
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "api/api.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            updateAttendanceList(response.attendanceData);
            displayTotals(response.totalDays, response.totalPresent, response.totalAbsent);
            nameInput.value = "";
        } else {
            alert("Error adding the new user. Please try again.");
        }
    };
    xhr.send("name=" + encodeURIComponent(name) + "&status=present");
}

// Function to update the attendance list
function updateAttendanceList(data) {
    const attendanceList = document.getElementById("attendanceList");
    attendanceList.innerHTML = "";

    data.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.name + " - " + item.status;
        attendanceList.appendChild(li);
    });
}

// Function to display attendance totals
function displayTotals(totalDays, totalPresent, totalAbsent) {
    document.getElementById("totalDays").textContent = "Total Days: " + totalDays;
    document.getElementById("totalPresent").textContent = "Total Present: " + totalPresent;
    document.getElementById("totalAbsent").textContent = "Total Absent: " + totalAbsent;
}

// Fetch initial attendance list and totals on page load
document.addEventListener("DOMContentLoaded", function () {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "api/api.php", true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            updateAttendanceList(response.attendanceData);
            displayTotals(response.totalDays, response.totalPresent, response.totalAbsent);
        }
    };
    xhr.send();
});
