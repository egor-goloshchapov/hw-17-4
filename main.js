const url = "http://localhost:3000/students";

// Прив'язуємо обробники подій лише один раз після завантаження скрипта
document.getElementById("get-students-btn").addEventListener("click", getStudents);
document.getElementById("add-student-form").addEventListener("submit", addStudent);

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

    console.log("Student to send:", student);

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    })
        .then(res => {
            console.log("Response status:", res.status);
            if (!res.ok) throw new Error("Failed to save student");
            return res.json();
        })
        .then(data => {
            console.log("Student added:", data);
            getStudents();
            // Очистити форму після додавання
            document.getElementById("add-student-form").reset();
        })
        .catch(err => {
            console.error("Error:", err.message);
        });
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

function updateStudent(id) {
    alert("Функція оновлення поки не реалізована");
}

function deleteStudent(id) {
    if (!confirm("Видалити цього студента?")) return;

    fetch(`${url}/${id}`, { method: "DELETE" })
        .then(() => {
            console.log("Студента видалено:", id);
            getStudents();
        })
        .catch(err => console.error("Помилка при видаленні студента:", err));
}
