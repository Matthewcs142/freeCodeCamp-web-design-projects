// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    console.log('data added to local storage');
}

// Get tasks from local storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } 
    // Generate task list based on contents of local storage
    tasks.forEach(function(task){
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li element
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-times"></i>';
        // Append the link to the li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
    });
    console.log('data retrieved from local storage');
}

// Remove from local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    console.log('data removed from local storage');
}

// Clear local storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// Add task
function addTask(e) {
    e.preventDefault();
    if(taskInput.value === ''){
        alert('Add a task');
    } else {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li element
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-times"></i>';
    // Append the link to the li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);

    // Store task in local storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';
    console.log('task added');
    }
}   

// Remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove();

            // Remove task from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
    console.log('task removed');
}

// Clear Tasks
function clearTasks() {
    while(taskList.firstChild) {
       taskList.removeChild(taskList.firstChild);
    }

    // Erase local storage
    clearTasksFromLocalStorage();

    console.log('all tasks removed');
    console.log('local storage cleared');
}

// Filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    // Get all list items
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

// Load all event listeners
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

//Load all event listeners
loadEventListeners();