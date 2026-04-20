function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value.trim();

  // agar input empty hai
  if (taskText === "") {
    alert("Please enter a task 😅");
    return;
  }

  // naya li element create karo
  let li = document.createElement("li");

  // task text
  let span = document.createElement("span");
span.textContent = taskText;
li.appendChild(span);

li.onclick = function () {
  li.classList.toggle("completed");

  let span = li.querySelector("span");

  if (li.classList.contains("completed")) {
    span.textContent = "✔️ " + taskText;
  } else {
    span.textContent = taskText;
  }
};
  // delete button create karo
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";

  // delete function
  deleteBtn.onclick = function () {
    li.remove();
  };

  // li me button add karo
  li.appendChild(deleteBtn);

  // list me add karo
  document.getElementById("taskList").appendChild(li);

  // input clear karo
  input.value = "";
}
document.getElementById("taskInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});