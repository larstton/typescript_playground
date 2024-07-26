import { v4 as uuidV4 } from "uuid"


//Select the elements we will be working with
const list  = document.querySelector<HTMLUListElement>("#list")
const form  = document.getElementById("new-task-form") as HTMLFormElement | null
const input  = document.querySelector<HTMLInputElement>("#new-task-title")

// declare Task, basically giving it a form how it should be
type Task = {
    id: string
    title: string
    completed: boolean
    createdAt: Date
}

//Loading tasks from the local storage
const tasks: Task[] = loadTasks()
//Loop Throgh tasks
tasks.forEach(addListItem)
form?.addEventListener("submit", e => {
    e.preventDefault();

    if(input?.value == "" || input?.value == null) return;

    const newTask : Task = {
        id: uuidV4(),
        title: input.value,
        completed: false,
        createdAt: new Date()
    }
    tasks.push(newTask)
    addListItem(newTask);
    input.value = ""
})

function addListItem(task: Task)
{
    //Adding a task to the list
    //create a list element
    const item = document.createElement("li")
    // create a label
    const label = document.createElement("label")
    // create an input
    const checkbox = document.createElement("input")
    checkbox.addEventListener("change", () =>{
        //if completed is true, the checkbox will be checked
        task.completed = checkbox.checked
        saveTasks();
    })
    //This part is just to display the task in the list
    checkbox.type = "checkbox"
    label.append(checkbox, task.title)
    checkbox.checked = task.completed
    item.append(label)
    item.append(label)
    //Check is list exists and then append the item
    list?.append(item)
    //Save it to the local storage
    saveTasks();
}

function saveTasks(){
    //Save tasks to local storage as TASKS
    localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks()
{
    const taskJSON = localStorage.getItem("TASKS")
    if(taskJSON == null) return [];
    return JSON.parse(taskJSON)
}
