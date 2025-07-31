const STORAGE_KEY = "studentsData";

function getStudents() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  return JSON.parse(data);
}

function saveStudents(students) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function renderStudents(students) {
  const tbody = document.querySelector("#students-table tbody");
  tbody.innerHTML = "";
  students.forEach(student => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.skills.join(", ")}</td>
      <td>${student.email}</td>
      <td>${student.isEnrolled ? "✅" : "❌"}</td>
      <td>
        <button onclick="updateStudent(${student.id})">Оновити</button>
        <button onclick="deleteStudent(${student.id})">Видалити</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function addStudent(e) {
  e.preventDefault();

  let students = getStudents();

  let newId = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;

  const student = {
    id: newId,
    name: document.getElementById("name").value,
    age: Number(document.getElementById("age").value),
    course: document.getElementById("course").value,
    skills: document.getElementById("skills").value.split(",").map(s => s.trim()),
    email: document.getElementById("email").value,
    isEnrolled: document.getElementById("isEnrolled").checked
  };

  students.push(student);
  saveStudents(students);
  renderStudents(students);

  e.target.reset();
}

function deleteStudent(id) {
  if (!confirm("Видалити цього студента?")) return;

  let students = getStudents();
  students = students.filter(s => s.id !== id);
  saveStudents(students);
  renderStudents(students);
}

function updateStudent(id) {
  alert(`Оновлення студента з ID ${id} поки не реалізовано.`);
}

document.addEventListener("DOMContentLoaded", () => {
  renderStudents(getStudents());
});

document.getElementById("add-student-form").addEventListener("submit", addStudent);
