export type statuses = "pending" | "in_progress" | "done"

export interface task {
  "id": number; 
  "title": string;
  "status": statuses;
  "list_id": number;
}

export const Tasks: Array<task> = [
  {
    "id": 1,
    "title": "Learn Typescript Types",
    "status": "done",
    "list_id": 1
  },
  {
    "id": 2,
    "title": "Learn Typescript Syntax",
    "status": "in_progress",
    "list_id": 1
  },
  {
    "id": 3,
    "title": "Learn Typescript Compilation",
    "status": "pending" ,
    "list_id": 1
  },
  {
    "id": 4,
    "title": "be cool B)",
    "status": "done",
    "list_id": 1
  },
]

