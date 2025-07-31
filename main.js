const API_URL = 'http://localhost:3000/students';

const getBtn = document.getElementById('get-students-btn');
const tableBody = document.querySelector('#students-table tbody');
const form = document.getElementById('add-student-form');

async function getStudents() {
  try {
    const res = await fetch(API_URL);
    const students = await res.json();
    renderStudents(students);
  } catch (error) {
    console.error('Помилка отримання студентів:', error);
  }
}

function renderStudents(students) {
  tableBody.innerHTML = '';
  students.forEach(student => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.skills.join(', ')}</td>
      <td>${student.email}</td>
      <td>${student.isEnrolled ? 'Записаний' : 'Не записаний'}</td>
      <td>
        <button onclick="updateStudent(${student.id})">Оновити</button>
        <button onclick="deleteStudent(${student.id})">Видалити</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

form.addEventListener('submit', async function addStudent(e) {
  e.preventDefault();

  const newStudent = {
    name: document.getElementById('name').value.trim(),
    age: parseInt(document.getElementById('age').value),
    course: document.getElementById('course').value.trim(),
    skills: document.getElementById('skills').value.split(',').map(s => s.trim()),
    email: document.getElementById('email').value.trim(),
    isEnrolled: document.getElementById('isEnrolled').checked
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent)
    });

    if (!res.ok) throw new Error('Помилка при додаванні студента');

    form.reset();
    getStudents();
  } catch (error) {
    console.error(error);
  }
});

async function updateStudent(id) {
  const newName = prompt("Введіть нове ім'я для студента:");
  if (!newName) return;

  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName })
    });
    getStudents();
  } catch (error) {
    console.error('Помилка оновлення:', error);
  }
}

async function deleteStudent(id) {
  if (!confirm('Ви впевнені, що хочете видалити цього студента?')) return;

  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    getStudents();
  } catch (error) {
    console.error('Помилка видалення:', error);
  }
}

