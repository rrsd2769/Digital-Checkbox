let patients = [];
let medicationSchedules = [];
let medicationHistory = [];

function addPatient() {
	const name = document.getElementById("patient-name").value;
	const phone = document.getElementById("patient-phone").value;
	const medications = document
		.getElementById("patient-medications")
		.value.split(",");

	if (/^\d{10}$/.test(phone)) {
		patients.push({ name: name, phone: phone, medications: medications });
		document.getElementById(
			"patient-list"
		).innerHTML += `<p>${name} - ${phone} (Medications: ${medications.join(
			", "
		)})</p>`;
		document.getElementById(
			"patient-list-medication"
		).innerHTML += `<option value="${name}">${name}</option>`;
		document.getElementById("patient-form").reset();
	} else {
		alert("Please enter a valid phone number.");
	}
}

function populateMedications() {
	const selectedPatientName = document.getElementById(
		"patient-list-medication"
	).value;
	const selectedPatient = patients.find(
		(patient) => patient.name === selectedPatientName
	);

	const medicationSelect = document.getElementById("medication-name");
	medicationSelect.innerHTML = "";

	if (selectedPatient) {
		selectedPatient.medications.forEach((medication) => {
			medicationSelect.innerHTML += `<option value="${medication.trim()}">${medication.trim()}</option>`;
		});
	}
}


function addMedicineSchedule() {
	const patientName = document.getElementById("patient-list-medication").value;
	const medication = document.getElementById("medication-name").value;
	const frequency = document.getElementById("dosage-frequency").value;

	if (patientName && medication && frequency) {
		medicationSchedules.push({ patientName, medication, frequency });
		alert("Medication schedule added.");
	} else {
		alert("Please fill in all fields.");
	}
}

function recordMedicationIntake() {
	const patientName = document.getElementById("patient-list-medication").value;
	const medication = document.getElementById("medication-name").value;
	const currentTime = new Date().getHours(); 

	const existingRecord = medicationHistory.find(
		(record) =>
			record.patientName === patientName && record.medication === medication
	);

	if (existingRecord) {
		document.getElementById("warning").innerText =
			"Warning: Medication already recorded!";
		return;
	}

	let status = "Taken on time";
	if (currentTime > 12) {
	
		status = "Taken late";
	}

	medicationHistory.push({ patientName, medication, status });

	const historyTable = document.querySelector("#history-list tbody");
	const row = document.createElement("tr");
	row.className = status === "Taken on time" ? "on-time" : "late";
	row.innerHTML = `
        <td>${patientName}</td>
        <td>${medication}</td>
        <td>${currentTime}</td>
        <td>${status}</td>
    `;
	historyTable.appendChild(row);

	document.getElementById("warning").innerText = ""; 
}

function toggleSidebar() {
	const sidebar = document.getElementById("sidebar");
	sidebar.classList.toggle("collapsed");
}

function showSection(sectionId) {
	const sections = document.querySelectorAll(".section");
	sections.forEach((section) => section.classList.remove("active"));

	document.getElementById(sectionId).classList.add("active");
}
