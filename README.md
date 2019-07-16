====================TASK-MANAGER-DOCS==================

USER ===================================================

POST /user BODY - {name:STRING, lastName:STRING, email:STRING, password:STRING, passwordConfirm:STRING, gender:STRING} this method is used for signing up of the user

AUTH ===================================================

POST /auth ; BODY - {email:STRING, password:STRING} this method is used in order to log in the user

TASK ==================================================

POST /task ;   BODY - {taskText:STRING}; HEADERS: Authorization: TOKEN; this method is used for creating of a new task

GET /task ; HEADERS: Authorization: TOKEN; this method is used for getting of tasks of the user

PUT /task/share ; BODY - {task_id:STRING, emailOfRecipient:STRING}; HEADERS: Authorization: TOKEN; this method is used for sharing the task between users

PUT /task ; BODY - {task_id:STRING, editedTask:STRING}; HEADERS: Authorization: TOKEN; this method is used for editing the existing task 

DELETE /task ; HEADERS: Authorization: TOKEN; this method is used for deleting of the user's task