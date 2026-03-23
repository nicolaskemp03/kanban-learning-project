# 1\. The Database Schema (ERD)

We need to track how a User relates to a Board, and how a Board contains Tasks. This is a "One-to-Many" and "Many-to-Many" relationship model.

Key Entities:

```plaintext
User: id, email (unique), password_hash, name, created_at.

Board: id, owner_id (FK to User), title, description.

List (Columns): id, board_id (FK to Board), title, position (to handle drag-and-order).

Task (Cards): id, list_id (FK to List), author_id (FK to User), title, content, priority, due_date.

Tag: id, name, color. (Many-to-Many with Tasks).
```

## Tables:
### Users Table:
|   Column Name   |   Data Type    |        Constraints         |            Description            |
| :-------------: | :------------: | :------------------------: | :-------------------------------: |
|      `id`       |   `INTEGER`    |       `PRIMARY KEY`        |       The User Internal ID        |
|     `email`     | `varchar(50)`  |    `NOT NULL` `UNIQUE`     |         The User's email          |
|   `username`    | `VARCHAR(20)`  |    `NOT NULL` `UNIQUE`     |         The text username         |
| `password_hash` | `VARCHAR(255)` |         `NOT NULL`         |      Check commentary below       |
|  `created_at`   | `TIMESTAMPTZ`  | `NOT NULL` `DEFAULT now()` | Timestamp of creation of the User |
> Apply `^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$` check for `email` and `'^[A-Za-z0-9_]+$'` check for `username` at code level before reaching .

### Boards Table:
| Column Name  |   Data Type    |        Constraints         |                         Description                          |
| :----------: | :------------: | :------------------------: | :----------------------------------------------------------: |
|     `id`     |   `INTEGER`    |       `PRIMARY KEY`        |                    The Board Internal ID                     |
|   `title`    | `VARCHAR(50)`  |         `NOT NULL`         |                      The Board's Title                       |
|    `desc`    | `VARCHAR(100)` |       `DEFAULT NULL`       | A short description to appear just below the title. Optional |
| `long_desc`  |     `TEXT`     |       `DEFAULT NULL`       |           A longer description if needed. Optional           |
|  `owner_id`  |   `INTEGER`    |  `FOREIGN KEY` `NOT NULL`  |                   The user_id of the owner                   |
| `created_at` | `TIMESTAMPTZ`  | `NOT NULL` `DEFAULT now()` |              Timestamp of creation of the board              |
| `updated_at` | `TIMESTAMPTZ`  | `NOT NULL` `DEFAULT now()` |          Timestamp of last change done to the board          |

### Lists Table:
| Column Name  |   Data Type    |        Constraints         |                         Description                          |
| :----------: | :------------: | :------------------------: | :----------------------------------------------------------: |
|     `id`     |   `INTEGER`    |       `PRIMARY KEY`        |                    The List's Internal ID                    |
|   `title`    | `VARCHAR(50)`  |         `NOT NULL`         |                       The List's Title                       |
|    `desc`    | `VARCHAR(100)` |       `DEFAULT NULL`       | A short description to appear just below the title. Optional |
|  `board_id`  |   `INTEGER`    |  `FOREIGN KEY` `NOT NULL`  |     The board_id of the board where the list is located      |
|  `position`  |   `INTEGER`    |   `NOT NULL` `DEFAULT 1`   |          The location of the list within the board           |
| `created_at` | `TIMESTAMPTZ`  | `NOT NULL` `DEFAULT now()` |              Timestamp of creation of the list               |
| `updated_at` | `TIMESTAMPTZ`  | `NOT NULL` `DEFAULT now()` |          Timestamp of last change done to the list           |
> Add UNIQUE constraint `UNIQUE(board_id, position)`

### Tasks Table:
|  Column Name  |   Data Type   |        Constraints         |                    Description                    |
| :-----------: | :-----------: | :------------------------: | :-----------------------------------------------: |
|     `id`      |   `INTEGER`   |       `PRIMARY KEY`        |               The Task Internal ID                |
|    `title`    | `VARCHAR(50)` |         `NOT NULL`         |                 The Task's Title                  |
|   `content`   |    `TEXT`     |       `DEFAULT NULL`       |       the description of the task Optional        |
|  `due_date`   |    `DATE`     |       `DEFAULT NULL`       |             The Due date for the task             |
|   `list_id`   |   `INTEGER`   |  `FOREIGN KEY` `NOT NULL`  | The list_id of the list where the tasl is located |
| `created_at`  | `TIMESTAMPTZ` | `NOT NULL` `DEFAULT now()` |         Timestamp of creation of the task         |
|  `status_id`  |   `INTEGER`   |  `FOREIGN KEY` `NOT NULL`  |         The id of the status of the task          |
| `priority_id` |   `INTEGER`   |  `FOREIGN KEY` `NOT NULL`  |        the id of the priority of the task         |
| `updated_at`  | `TIMESTAMPTZ` | `NOT NULL` `DEFAULT now()` |     Timestamp of last change done to the task     |

### Statuses Table:
| Column Name |   Data Type   |  Constraints  |      Description       |
| :---------: | :-----------: | :-----------: | :--------------------: |
|    `id`     |   `INTEGER`   | `PRIMARY KEY` | The Status Internal ID |
|  `status`   | `VARCHAR(50)` |  `NOT NULL`   | The status string name |

### Priorities Table
| Column Name |   Data Type   |  Constraints  |       Description        |
| :---------: | :-----------: | :-----------: | :----------------------: |
|    `id`     |   `INTEGER`   | `PRIMARY KEY` | The priority Internal ID |
| `priority`  | `VARCHAR(50)` |  `NOT NULL`   | The priority string name |


# 2\. The REST API Contract
Since we are building a "Project Manager," the API needs to follow predictable paths. NestJS uses Controllers to handle these.  
Method Endpoint Description  
POST /auth/register Create a new user account  
POST /auth/login Authenticate and receive a JWT  
GET /boards List all boards the user has access to  
POST /boards Create a new board  
GET /boards/:id Fetch a specific board with all its Lists and Tasks  
PATCH /tasks/:id Update a task (e.g., move it to a different list/column)  
DELETE /tasks/:id Remove a task

## User Endpoints
### POST /auth/register
**Description:** Creates a user in the System.

**Request Body**:
```json
{
    "email": "email-type string (required)",
    "username": "string of only alphanumerical characters (required)",
    "password": "string (required)"
}
```
**Success Response:**
- **Code:** `201 Created`
- **Body:**
```json
{
    "id": 1,
    "email": "example@mail.com",
    "username": "user123_now",
    "JWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6InVzZXIxMjNfbm93IiwiZW1haWwiOiJleGFtcGxlQG1haWwuY29tIn0.8nD1yU8478XHxQu9nOSwItIl-hEL3Plq2JxRM0PkeiQ", // JWT with HS256 Encoding
    "created_at": "2024-10-08 14:30:00-05"
}
```
**Error Response:**
- **Code:** `400 Bad Requests` if any values are missing.
- **Code:** `401 Unauthorized` 

**Description:** Logins the user (somehow??).

**Request Body**:
```json
{
    "email": "email-type string (required)",
    "password": "string (required)"
}
```
**Success Response:**
- **Code:** `200 OK`
- **Body:**
```json
{
    "id": 1,
    "email": "example@mail.com",
    "username": "user123_now",
    "JWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6InVzZXIxMjNfbm93IiwiZW1haWwiOiJleGFtcGxlQG1haWwuY29tIn0.8nD1yU8478XHxQu9nOSwItIl-hEL3Plq2JxRM0PkeiQ",
    "created_at": "2024-10-08 14:30:00-05"
}
```
**Error Response:**
- **Code:** `400 Bad Requests` if any values are missing.
- **Code:** `404 not found` if the user does not exist

## Boards Endpoints
### GET /boards
**Description:** Lists all boards.

**Success Response:**
- **Code:** `200 OK`
- **Body:**
```json
{
    [
        {
            "id": 1,
            "title": "My First Board",
            "desc": "Board for household chores",
            "long_desc": "",
            "owner_id":1,
            "created_at": "2024-10-08 14:30:00-05",
            "updated_at": "2025-07-09 14:21:00-05"
        },
        {
            "id": 2,
            "title": "My Second Board",
            "desc": "Board for python project",
            "long_desc": "Board for tracking progress in my data science python project with SQL Alchemy and numpy",
            "owner_id":1,
            "created_at": "2024-10-08 14:30:00-05",
            "updated_at": "2025-02-09 16:24:00-05"
        },
        [...]
        {
            "id": 45,
            "title": "How Many Boards do I Need?",
            "desc": "Board for household chores",
            "long_gesc": "",
            "owner_id":1,
            "created_at": "2024-10-08 14:30:00-05",
            "updated_at": "2025-03-09 11:51:00-05"
        },
    ]
}
```
**Error Response:**
- **Code:** `401 Unauthorized` If the JWT is missing or invalid.

### POST /boards
**Description:** Creates a board in the system.

**Request Body**:
```json
{
    "title": "Too many Boards", // String up to 50 characters
    "desc": "Board For everything", // String up to 100 characters
    "long_desc": "If you have joined this board, here are some rules to take into consideration:\n1.Never complete a task before actually completion\n2.Use lists well", // String
}
```
**Success Response:**
- **Code:** `201 Created`
- **Body:**
```json
{
    "id": 46,
    "title": "Too many Boards",
    "desc": "Board For everything",
    "long_desc": "If you have joined this board, here are some rules to take into consideration:\n1.Never complete a task before actually completion\n2.Use lists well",
    "owner_id":1, //Used the login info / JWT to check the user's identity
    "created_at": "2025-07-01 14:30:00-05"
}
```
**Error Response:**
- **Code:** `400 Bad Requests` if any values are missing.
- **Code:** `401 Unauthorized` if the request does not come from an recognized user.

### GET /boards/:id
**Description:** Get a board by the specified :id.

**Success Response:**
- **Code:** `200 OK`
- **Body:**
```json
{
    "id": 45,
    "title": "How Many Boards do I Need?",
    "desc": "Board for household chores",
    "long_desc": "",
    "owner_id":1,
    "created_at": "2024-10-08 14:30:00-05",
    "updated_at": "2025-07-09 14:21:00-05"
}
```
**Error Response:**
- **Code:** `404 not found` if the board does not exist

## Lists Endpoints
### GET /boards/:id/lists
**Description:** Get all list in a board by the specified :id.

**Success Response:**
- **Code:** `200 OK`
- **Body:**
```json
{
    [
        {
            "id": 1,
            "title": "Done",
            "desc": "Completed Tasks",
            "board_id":35,
            "position": 1,
            "created_at": "2024-10-08 14:30:00-05",
            "updated_at": "2025-07-09 14:21:00-05"
        },
        {
            "id": 2,
            "title": "Almost Done",
            "desc": "At least 50% Done",
            "board_id":35,
            "position": 2,
            "created_at": "2024-10-08 14:30:00-05",
            "updated_at": "2025-07-09 14:21:00-05"
        },
        {
            "id": 3,
            "title": "Leave it for next week",
            "desc": "Not urgent tasks",
            "board_id":35,
            "position": 3,
            "created_at": "2024-10-08 14:30:00-05",
            "updated_at": "2025-07-09 14:21:00-05"
        },
    ]
}
```
**Error Response:**
- **Code:** `404 not found` if the board does not exist

### POST /boards/:id/lists
**Description:** Creates a list in a board.

**Request Body**:
```json
{
    "title": "My niece's birthday", // String up to 50 Characters
    "desc": "Shopping and task list for the party", // String up to 100 Characters
    "position": 3, // Integer If the there's already a list in this position all lists from this position onward should get pushed +1.
}
```
**Success Response:**
- **Code:** `201 Created`
- **Body:**
```json
{
    "id": 4,
    "title": "My niece's birthday",
    "desc": "Shopping and task list for the party",
    "board_id":35,
    "position": 3,
    "created_at": "2025-07-01 14:30:00-05"
}
```
**Error Response:**
- **Code:** `400 Bad Requests` if any values are missing.
- **Code:** `401 Unauthorized` if the request does not come from the owner of the board.

## Tasks Endpoints
## GET /lists/:id/tasks
**Description:** Get all tasks in a list by the specified :id.

**Success Response:**
- **Code:** `200 OK`
- **Body:**
```json
{
    [
        {
            "id": 37,
            "title": "Buying Cake",
            "content": "I'll pass by the pattissier on monday",
            "due_date": "2025-07-07",
            "list_id":4,
            "created_at": "2025-07-01 14:45:00-05",
            "status_id": 1,
            "priority_id": 2,
            "updated_at": "2025-07-09 14:21:00-05"
        },
        {
            "id": 38,
            "title": "Buying a Present",
            "content": "I'll Buy it online. There was this dress she really wanted",
            "due_date": "2025-07-03",
            "list_id":4,
            "created_at": "2025-07-01 14:46:00-05",
            "status_id": 2,
            "priority_id": 0,
            "updated_at": "2025-07-09 14:21:00-05"
        },
        {
            "id": 39,
            "title": "Send invites",
            "content": "I gotta invite all family and help her mom prepare invites for her friends",
            "due_date": "2025-07-04",
            "list_id":4,
            "created_at": "2025-07-01 14:47:00-05",
            "status_id": 0,
            "priority_id": 1,
            "updated_at": "2025-07-09 14:21:00-05"
        },
    ]
}
```
**Error Response:**
- **Code:** `404 not found` if the board does not exist
### POST /lists/:id/tasks
**Description:** Creates a task in a list.

**Request Body**:
```json
{
    "title": "Clean the House", // String up to 50 characters
    "content": "I gotta clean the house for the party day", // String
    "due_date": "2025-07-08", //Date in yyyy-MM-dd format.
    "status_id": 1, // Integer id. 0 = pending, 1 = in_progress, 2 = completed
    "priority_id": 0 // Integer id 0 = not_urgent, 1 = important, 2 = urgent
}
```
**Success Response:**
- **Code:** `201 Created`
- **Body:**
```json
{
    "id": 40,
    "title": "Clean the House",
    "content": "I gotta clean the house for the party day",
    "due_date": "2025-07-08",
    "list_id":4,
    "created_at": "2025-07-01 15:49:00-05",
    "status_id": 1,
    "priority_id": 0
}
```
**Error Response:**
- **Code:** `400 Bad Requests` if any values are missing.
- **Code:** `401 Unauthorized` if the request does not come from the owner of the board or an authorized user.

### PATCH /tasks/:id
**Description**: Updates the value of a task.

**Request Body**:
```json
{
    "title": "Clean the House",
    "content": "I gotta clean the house for the party day",
    "due_date": "2025-07-08",
    "list_id":4,
    "status_id": 2,
    "priority_id": 0
}
```
> You can only send those values you want to change in the data body. The data types are the same as in `POST /list/:id/tasks`

**Success Response:**
- **Code:** `200 OK`
- **Body:**
```json
{
    "id": 40,
    "title": "Send invites",
    "content": "I gotta clean the house for the party day",
    "due_date": "2025-07-08",
    "list_id":4,
    "created_at": "2025-07-01 14:49:00-05",
    "status_id": 2,
    "updated_at": "2025-07-09 14:21:00-05"
}
```
**Error Response:**
- **Code:** `400 Bad Requests` if any values are missing.
- **Code:** `401 Unauthorized` if the request does not come from the owner of the board or an authorized user.


# 3\. The "State Management" Logic

In React, we won't just "refresh the page." We will use Optimistic Updates.

```plaintext
The Logic: When you drag a card from "Doing" to "Done," the Frontend updates instantly to feel fast.

The Sync: In the background, an async request hits the NestJS API to update the database. If the server fails, the Frontend rolls back the card to its original position.
```