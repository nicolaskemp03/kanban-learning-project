const Tasks = [
    {
        "id": 1,
        "title": "Learn Typescript Types",
        "status": "done"
    },
    {
        "id": 2,
        "title": "Learn Typescript Syntax",
        "status": "in_progress"
    },
    {
        "id": 3,
        "title": "Learn Typescript Compilation",
        "status": "pending"
    },
    {
        "id": 4,
        "title": "be cool B)",
        "status": "done"
    },
];
function display_task_status(task_item) {
    let status = "";
    if (task_item.status === "done") {
        status = "Done";
    }
    else {
        status = "Pending";
    }
    return (`Task ${task_item.title} is ${status}`);
}
function getTasksByStatus(tasks, status) {
    let returnArray = [];
    for (const task of tasks) {
        if (task.status == status) {
            returnArray.push(task.title);
        }
    }
    return returnArray;
}
const display_task = Tasks[0];
if (display_task) {
    console.log(display_task_status(display_task));
}
else {
    console.log("No task to display");
}
console.log(getTasksByStatus(Tasks, "done"));
export {};
//# sourceMappingURL=learning.js.map