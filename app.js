const presentBtn = document.querySelector('#presentBtn');
const absentBtn = document.querySelector('#absentBtn');
const attendanceTableBody = document.querySelector('#attendanceTableBody');
const errorDiv = document.querySelector('#error');
const studentNameInput = document.querySelector('#studentName');
const studentIDInput = document.querySelector('#studentID');
let attendanceRecord = [];

presentBtn.addEventListener('click', markAttendance.bind(null, 'PRESENT'));
absentBtn.addEventListener('click', markAttendance.bind(null, 'ABSENT'));

function markAttendance(status) {
	const studentName = studentNameInput.value.trim();
	const studentID = studentIDInput.value.trim();

	if (studentName && studentID) {
		let studentRecord = attendanceRecord.find(record => record.id === studentID);
		if (!studentRecord) {
			studentRecord = { id: studentID, name: studentName, status };
			attendanceRecord.push(studentRecord);
			addTableRow(studentRecord);
		} else {
			if (studentRecord.status !== status) {
				studentRecord.status = status;
				updateTableRow(studentRecord);
			}
		}
		studentNameInput.value = '';
		studentIDInput.value = '';
		errorDiv.textContent = '';
	} else {
		errorDiv.textContent = 'Please fill in all fields';
	}
}

function addTableRow(record) {
	const row = document.createElement('tr');
	const nameCell = document.createElement('td');
	const idCell = document.createElement('td');
	const statusCell = document.createElement('td');

	nameCell.textContent = record.name;
	idCell.textContent = record.id;
	statusCell.textContent = record.status;
	statusCell.classList.add(record.status);

	row.appendChild(nameCell);
	row.appendChild(idCell);
	row.appendChild(statusCell);

	attendanceTableBody.appendChild(row);
}

function updateTableRow(record) {
	const row = attendanceTableBody.querySelector(`tr td:nth-child(2):contains(${record.id})`).parentNode;
	const statusCell = row.querySelector('td:nth-child(3)');
	statusCell.classList.remove(record.status === 'present' ? 'absent' : 'present');
	statusCell.classList.add(record.status);
	statusCell.textContent = record.status;
}

