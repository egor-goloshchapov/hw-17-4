const url = "http://localhost:3000/students";

document.addEventListener("DOMContentLoaded", () => {
  const btnGet = document.getElementById("get-students-btn");
  const formAdd = document.getElementById("add-student-form");

  btnGet.addEventListener("click", getStudents);
  formAdd.addEventListener("submit", addStudent);
});

function getStudents() {
  fetch(url)
    .then(res => res.json())
    .then(data => renderStudents(data))
    .catch(err => console.error("Помилка при отриманні студентів:", err));
}

function addStudent(e) {
  e.preventDefault();

  const student = {
    name: document.getElementById("name").value,
    age: Number(document.getElementById("age").value),
    course: document.getElementById("course").value,
    skills: document.getElementById("skills").value.split(",").map(s => s.trim()),
    email: document.getElementById("email").value,
    isEnrolled: document.getElementById("isEnrolled").checked
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(student)
  })
    .then(res => {
      if (!res.ok) throw new Error("Не вдалось додати студента");
      return res.json();
    })
    .then(data => {
      console.log("Студент доданий:", data);
      getStudents();
      document.getElementById("add-student-form").reset();
    })
    .catch(err => console.error("Помилка:", err));
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
