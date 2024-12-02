// Retrieve tasks from local storage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks on page load
renderTasks();

function renderTasks(filteredTasks = tasks) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    filteredTasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'task-item';

        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'checkbox-container';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.className = 'checkbox';
        checkbox.addEventListener('change', () => toggleTask(index));

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.className = task.completed ? 'completed' : '';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => deleteTask(index));

        checkboxContainer.appendChild(checkbox);
        listItem.appendChild(checkboxContainer);
        listItem.appendChild(taskText);
        listItem.appendChild(deleteBtn);

        todoList.appendChild(listItem);
    });
}

function addTask() {
    const newTaskInput = document.getElementById('newTask');
    const newTaskText = newTaskInput.value.trim();

    if (newTaskText !== '') {
        tasks.push({ text: newTaskText, completed: false });
        saveTasks();
        newTaskInput.value = '';
        renderTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function filterTasks() {
    const filter = document.getElementById('filter').value;

    const filteredTasks = (filter === 'completed')
        ? tasks.filter(task => task.completed)
        : (filter === 'incomplete')
            ? tasks.filter(task => !task.completed)
            : tasks;

    renderTasks(filteredTasks);
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}
