const url = "http://localhost:3000/students";

// Завантаження студентів
async function getStudents() {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Помилка при отриманні студентів");
    const students = await res.json();
    renderStudents(students);
  } catch (err) {
    console.error("Помилка при отриманні студентів:", err.message);
  }
}

// Додавання студента
async function addStudent(e) {
  e.preventDefault();

  const student = {
    name: document.getElementById("name").value,
    age: Number(document.getElementById("age").value),
    course: document.getElementById("course").value,
    skills: document.getElementById("skills").value.split(",").map(s => s.trim()),
    email: document.getElementById("email").value,
    isEnrolled: document.getElementById("isEnrolled").checked
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(student)
    });

    if (!res.ok) throw new Error("Не вдалося додати студента");

    const data = await res.json();
    console.log("Студент доданий:", data);
    await getStudents();
  } catch (err) {
    console.error("Помилка при додаванні студента:", err.message);
  }
}

// Видалення студента
async function deleteStudent(id) {
  if (!confirm("Ви впевнені, що хочете видалити цього студента?")) return;

  try {
    const res = await fetch(`${url}/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) throw new Error("Не вдалося видалити студента");

    console.log("Студент видалений:", id);
    await getStudents();
  } catch (err) {
    console.error("Помилка при видаленні студента:", err.message);
  }
}

// Оновлення студента (можна реалізувати повністю при потребі)
async function updateStudent(id) {
  alert("Оновлення ще не реалізовано, але тут буде async/await");
}

// Рендер студентів у таблицю
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

// Події DOM
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("get-students-btn").addEventListener("click", getStudents);
  document.getElementById("add-student-form").addEventListener("submit", addStudent);
});
