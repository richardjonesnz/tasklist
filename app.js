// Define UI variables.
const form = document.querySelector("#task-form");
const tasklist = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners.
loadEventListeners();


// Load all event listeners.
function loadEventListeners() {
     // DOM load event - get stored tasks.
     document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event.
    form.addEventListener('submit', addTask);
    // Remove task event.
    tasklist.addEventListener("click", removeTask);
    // Clear all tasks.
    clearBtn.addEventListener("click", clearTasks);
    //  Filter tasks.
    filter.addEventListener("keyup", filterTasks)
}

// Get stored task list.
function getTasks() {

    tasks = checkForLocalStorage();

    // Load the tasks into the list as for addTask.
    tasks.forEach(function(task) {

        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = 'delete';
        li.appendChild(link);
        tasklist.appendChild(li);
    });
}

function checkForLocalStorage() {
    let tasks;

    // Check for an existing array
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}
// Add task.
function addTask(e) {
    if (taskInput.value === "") {
        alert("Add a task");
    }
    // Create a new li element, add class and text node.
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element with fa icon, add to li.
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = 'delete';
    li.appendChild(link);

    tasklist.appendChild(li);
    // Store in local storage.
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';
    e.preventDefault();
}

function storeTaskInLocalStorage(task) {

    tasks = checkForLocalStorage();
    // Push new task on to array and store.
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Remove task.
function removeTask(e) {

    // We put the event listener on the ul so find the a link.
    if (e.target.parentElement.classList.contains('collection-item')) {
        console.log(e.target);
        if (confirm('Are you sure')) {
            // Now remove the entire list element.
            e.target.parentElement.remove();

            // Also remove it from local storage.
            removeTaskFromLocalStorage(e.target.parentElement);

        }
    }
}

function removeTaskFromLocalStorage(taskItem) {
    // Check for tasks array.
    tasks = checkForLocalStorage();

    // Locate the item to delete.
    tasks.forEach(function(task, index) {
        // I have to get rid of the delete string in the li.
        taskToDelete = taskItem.textContent.replace('delete', '');
        if(taskToDelete === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks.
function clearTasks() {
    console.log(tasklist.firstChild);
    while(tasklist.firstChild) {
        tasklist.removeChild(tasklist.firstChild);
    }
    // Clear the local storage too.
    localStorage.clear();
}

// Filter function works as soon as you start to type in the box (keyup).
function filterTasks(e) {
    // Get the text as user types.
    const text = e.target.value.toLowerCase();
    // Traverse the task list.
    document.querySelectorAll('.collection-item').forEach (
        function(task) {
            const item = task.firstChild.textContent;
            // Check for match and set display style.
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
       }
    );
}