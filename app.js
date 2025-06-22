// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Retrieve stored tasks or start with empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Save tasks array to LocalStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks list
function renderTasks() {
  taskList.innerHTML = ''; // Clear existing

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');
    li.textContent = task.text;

    // Toggle complete on click
    li.addEventListener('click', () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });
}