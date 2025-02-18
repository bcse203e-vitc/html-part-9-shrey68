
function openForm() {
    document.getElementById("bookingModal").style.display = "flex";
}

function closeForm() {
    document.getElementById("bookingModal").style.display = "none";
}

function showPopup(message) {
    document.getElementById("confirmationMessage").innerText = message;
    document.getElementById("confirmationPopup").style.display = "block";
}

function closePopup() {
    document.getElementById("confirmationPopup").style.display = "none";
}


document.addEventListener("DOMContentLoaded", loadAppointments);

function loadAppointments() {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    let tableBody = document.querySelector("#appointmentTable tbody");
    tableBody.innerHTML = "";

    appointments.forEach((appointment, index) => {
        let row = tableBody.insertRow();
        row.innerHTML = `
            <td>${appointment.name}</td>
            <td>${appointment.service}</td>
            <td>${appointment.datetime}</td>
            <td class="status-${appointment.status.toLowerCase()}">${appointment.status}</td>
            <td>
                <select onchange="updateStatus(${index}, this)">
                    <option value="Pending" ${appointment.status === "Pending" ? "selected" : ""}>Pending</option>
                    <option value="Confirmed" ${appointment.status === "Confirmed" ? "selected" : ""}>Confirmed</option>
                    <option value="Cancelled" ${appointment.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
                </select>
            </td>
        `;
    });
}


document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let service = document.getElementById("service").value;
    let datetime = document.getElementById("datetime").value;

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    let newAppointment = { name, service, datetime, status: "Pending" };

    appointments.push(newAppointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    loadAppointments();
    showPopup(`Thank you, ${name}! Your appointment for ${service} on ${datetime} is confirmed.`);
    closeForm();
    document.getElementById("bookingForm").reset();
});
