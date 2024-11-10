Method Endpoint Description
GET /api/contacts Retrieve all contacts.
POST /api/contacts Create a new contact.
GET /api/contacts/:id Retrieve a specific contact by ID.
PATCH /api/contacts/:id Update a specific contact by ID.
DELETE /api/contacts/:id Delete a specific contact by ID.
GET /api/contacts/search Search for contacts by name (query parameter).

esting Your Sorting Functionality
Sort by Name Ascending:
Request: GET /api/contacts?sort=name&order=asc
Sort by Name Descending:
Request: GET /api/contacts?sort=name&order=desc
Sort by Email Ascending:
Request: GET /api/contacts?sort=email&order=asc
Sort by Phone Descending:
Request: GET /api/contacts?sort=phone&order=desc

GET /api/contacts?page=1&limit=10
GET /api/contacts?page=2&limit=5
