import { Tasks } from './data.js';
function get(attribute) {
    const returnArray = {};
    if (attribute === "title") {
        for (const task of Tasks) {
            let task_id = task.id;
            returnArray[task_id] = task.title;
        }
    }
    else if (attribute === "status") {
        for (const task of Tasks) {
            let task_id = task.id;
            returnArray[task_id] = task.status;
        }
    }
    else if (attribute === "list_id") {
        for (const task of Tasks) {
            let task_id = task.id;
            returnArray[task_id] = task.list_id.toString();
        }
    }
    else {
        console.error("No appropiate attribute called. Available attributes: \n-title\n-status\n-list_id");
        process.exit(1);
    }
    ;
    return returnArray;
}
;
function parse_args(args) {
    if (args[2] === "--get" && args[3]) {
        let attribute = args[3];
        return get(attribute);
    }
    else {
        console.error("No known argument provided.\nAvailable arguments:\n--get [attribute]");
        process.exit(1);
    }
}
;
console.log(parse_args(process.argv));
//# sourceMappingURL=cli.js.map