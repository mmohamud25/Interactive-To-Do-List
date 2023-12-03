// script.js

// Retrieve tasks from local storage if available
let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

function displayTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.name;
    if (task.completed) {
      li.classList.add('completed');
    }

    // Mark task as complete when clicked
    li.addEventListener('click', () => {
      toggleTaskComplete(index);
    });

    if (task.subTasks && task.subTasks.length > 0) {
      const subTasksUl = document.createElement('ul');
      subTasksUl.classList.add('sub-tasks');

      task.subTasks.forEach(subTask => {
        const subTaskLi = document.createElement('li');
        subTaskLi.textContent = subTask.name;
        if (subTask.completed) {
          subTaskLi.classList.add('completed');
        }

        // Mark sub-task as complete when clicked
        subTaskLi.addEventListener('click', () => {
          toggleSubTaskComplete(index, task.subTasks.indexOf(subTask));
        });

        subTasksUl.appendChild(subTaskLi);
      });

      li.appendChild(subTasksUl);
    }

    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskName = taskInput.value.trim();

  if (taskName !== '') {
    tasks.push({ name: taskName, completed: false, subTasks: [] });
    displayTasks();
    taskInput.value = '';

    // Save tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

document.getElementById('addButton').addEventListener('click', addTask);

function toggleTaskComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();

  // Save tasks to local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleSubTaskComplete(taskIndex, subTaskIndex) {
  tasks[taskIndex].subTasks[subTaskIndex].completed = !tasks[taskIndex].subTasks[subTaskIndex].completed;
  displayTasks();

  // Save tasks to local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

displayTasks(); // Initial display of tasks
