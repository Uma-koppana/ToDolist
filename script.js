const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Page load ayina ventane tasks chupinchu
displayTasks();

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if(taskText === '') return;
  
  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };
  
  tasks.push(task);
  saveTasks();
  displayTasks();
  taskInput.value = '';
}

function displayTasks() {
  taskList.innerHTML = '';
  
  tasks.forEach(task => {
    const li = document.createElement('li');
    if(task.completed) li.classList.add('completed');
    
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-actions">
        <button class="complete-btn" onclick="toggleComplete(${task.id})">
          ${task.completed ? 'Undo' : 'Done'}
        </button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    
    taskList.appendChild(li);
  });
}

function toggleComplete(id) {
  tasks = tasks.map(task => 
    task.id === id ? {...task, completed: !task.completed} : task
  );
  saveTasks();
  displayTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  displayTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}