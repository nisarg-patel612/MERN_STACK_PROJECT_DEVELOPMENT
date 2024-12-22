// References
const employeeForm = document.getElementById('employeeForm');
const employeeTableBody = document.getElementById('employeeTableBody');

// Fetch employees data from localStorage
let employees = JSON.parse(localStorage.getItem('employees')) || [];

// Render employees in the table
function renderTable() {
    employeeTableBody.innerHTML = '';
    employees.forEach((employee, index) => {
        employeeTableBody.innerHTML += `
            <tr>
                <td class="text-white">${index + 1}</td>
                <td class="text-white">${employee.firstName || ''}</td>
                <td class="text-white">${employee.lastName || ''}</td>
                <td class="text-white">${employee.email || ''}</td>
                <td class="text-white">${employee.dob || ''}</td>
                <td class="text-white">${employee.gender || ''}</td>
                <td class="text-white">${employee.education || ''}</td>
                <td class="text-white">${employee.company || ''}</td>
                <td class="text-white">${employee.experience || ''}</td>
                <td class="text-white">${employee.package || ''}</td>
                <td>
                
                    <button class="btn btn-warning btn-sm" onclick="editEmployee(${index})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${index})">
                        <i class="bi bi-trash3"></i>
                    </button>

                </td>
            </tr>
        `;
    });
}

// Add or edit employee Data
employeeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newEmployee = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        dob: document.getElementById('dob').value.trim(),
        gender: document.querySelector('input[name="gender"]:checked')?.value || '',
        education: document.getElementById('education').value.trim(),
        company: document.getElementById('company').value.trim(),
        experience: document.getElementById('experience').value.trim(),
        package: document.getElementById('package').value.trim()
    };

    const editIndex = employeeForm.dataset.editIndex;
    if (editIndex !== undefined) {
        employees[editIndex] = newEmployee;
        delete employeeForm.dataset.editIndex;
    } else {
        employees.push(newEmployee);
    }

    localStorage.setItem('employees', JSON.stringify(employees));
    renderTable();
    employeeForm.reset();
    document.querySelector('.btn-close').click();
});

// Edit employee Data
function editEmployee(index) {
    const employee = employees[index];
    Object.keys(employee).forEach((key) => {
        const field = document.getElementById(key);
        if (field) field.value = employee[key];
    });

    if (employee.gender) {
        document.querySelector(`input[name="gender"][value="${employee.gender}"]`).checked = true;
    }

    employeeForm.dataset.editIndex = index;
    document.querySelector('[data-bs-target="#employeeModal"]').click();
}

// Delete employee Data
function deleteEmployee(index) {
    employees.splice(index, 1);
    localStorage.setItem('employees', JSON.stringify(employees));
    renderTable();
}

// Initial render
renderTable();
