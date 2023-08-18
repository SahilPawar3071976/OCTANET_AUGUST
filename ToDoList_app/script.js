const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('prioritySelect');
const dueDateInput = document.getElementById('dueDateInput');
const dueTimeInput = document.getElementById('dueTimeInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage when the page loads
window.addEventListener('load', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => addTaskToDOM(task));
});

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const currentDateTime = new Date();
    const dueDateTime = new Date(`${dueDateInput.value}T${dueTimeInput.value}`);

    if (taskText !== '' && dueDateTime > currentDateTime) {
        const task = {
            text: taskText,
            priority: prioritySelect.value,
            dueDate: dueDateInput.value,
            dueTime: dueTimeInput.value,
            completed: false
        };

        addTaskToDOM(task);
        saveTasksToStorage();
        
        taskInput.value = '';
        prioritySelect.value = 'low';
        dueDateInput.value = '';
        dueTimeInput.value = '';
    }
});
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <div class="task-info">
            <input type="checkbox" class="complete-checkbox">
            <span>${task.text}</span>
        </div>
        <div class="task-details">
            <div class="tab-content">
                <span class="tab-label">Priority:</span>
                <span class="tab-value">${task.priority}</span>
            </div>
            <div class="tab-content">
                <span class="tab-label">Due Date:</span>
                <span class="tab-value">${task.dueDate}</span>
            </div>
            <div class="tab-content">
                <span class="tab-label">Due Time:</span>
                <span class="tab-value">${task.dueTime}</span>
            </div>
            <div class="task-actions">
                <button class="delete-btn">Delete</button>
                <button class="update-btn">Update</button>
            </div>
        </div>
    `;

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        if (li.querySelector('.complete-checkbox').checked) {
            li.remove();
            removeTaskFromStorage(task.text);
        }
    });

    const updateBtn = li.querySelector('.update-btn');
    updateBtn.addEventListener('click', () => {
        taskInput.value = task.text;
        prioritySelect.value = task.priority;
        dueDateInput.value = task.dueDate;
        dueTimeInput.value = task.dueTime;
        li.remove();
        removeTaskFromStorage(task.text);
    });

    const completeCheckbox = li.querySelector('.complete-checkbox');
    completeCheckbox.checked = task.completed;
    completeCheckbox.addEventListener('change', () => {
        task.completed = completeCheckbox.checked;
        li.classList.toggle('completed', task.completed);
        saveTasksToStorage();
    });

    li.classList.toggle('completed', task.completed);

    taskList.appendChild(li);
}

function saveTasksToStorage() {
    const tasks = Array.from(taskList.children).map(li => {
        const taskInfo = li.querySelector('.task-info span');
        const tabValues = li.querySelectorAll('.tab-value');

        if (taskInfo && tabValues.length === 3) {
            return {
                text: taskInfo.textContent,
                priority: tabValues[0].textContent,
                dueDate: tabValues[1].textContent,
                dueTime: tabValues[2].textContent,
                completed: li.classList.contains('completed')
            };
        } else {
            console.error('Error extracting task details:', li);
            return null; // Skip this task in the saved data
        }
    }).filter(task => task !== null); // Filter out null tasks

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromStorage(taskText) {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = savedTasks.filter(savedTask => savedTask.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
