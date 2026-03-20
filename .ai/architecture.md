1. The Database Schema (ERD)

We need to track how a User relates to a Board, and how a Board contains Tasks. This is a "One-to-Many" and "Many-to-Many" relationship model.

Key Entities:

    User: id, email (unique), password_hash, name, created_at.

    Board: id, owner_id (FK to User), title, description.

    List (Columns): id, board_id (FK to Board), title, position (to handle drag-and-order).

    Task (Cards): id, list_id (FK to List), author_id (FK to User), title, content, priority, due_date.

    Tag: id, name, color. (Many-to-Many with Tasks).

2. The REST API Contract

Since we are building a "Project Manager," the API needs to follow predictable paths. NestJS uses Controllers to handle these.
Method	Endpoint	Description
POST	/auth/register	Create a new user account
POST	/auth/login	Authenticate and receive a JWT
GET	/boards	List all boards the user has access to
POST	/boards	Create a new board
GET	/boards/:id	Fetch a specific board with all its Lists and Tasks
PATCH	/tasks/:id	Update a task (e.g., move it to a different list/column)
DELETE	/tasks/:id	Remove a task
3. The "State Management" Logic

In React, we won't just "refresh the page." We will use Optimistic Updates.

    The Logic: When you drag a card from "Doing" to "Done," the Frontend updates instantly to feel fast.

    The Sync: In the background, an async request hits the NestJS API to update the database. If the server fails, the Frontend rolls back the card to its original position.
