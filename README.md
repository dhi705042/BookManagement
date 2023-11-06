# BookManagement

This is a RESTful API for managing books. It provides endpoints to create, read, update, and delete book records.

## API Endpoints and Usage

### Create a Book
- **Endpoint**: `POST /books`
- **Usage**: Create a new book record.
- **Request Body**: JSON object with book details (title, author, summary).
- **Example Request**:
  ```json
  {
    "title": "Sample Book",
    "author": "John Doe",
    "summary": "This is a sample book summary."
  }

  response:=

  {
    "status": true,
    "message": "Book created successfully",
    "data": {
        "title": "Sample Book 3",
        "author": "John Doe 2",
        "summary": "This is a sample book summary 2.",
        "deletedAt": null,
        "isDeleted": false,
        "_id": "6548d85cfee86a3604e368db",
        "createdAt": "2023-11-06T12:13:16.609Z",
        "updatedAt": "2023-11-06T12:13:16.609Z",
        "__v": 0
    }
}

Get Books
Endpoint: GET /books
Usage: Retrieve a list of all available books.
Response: A JSON array containing book records.

Get Book by ID
Endpoint: GET /books/:bookId
Usage: Retrieve a specific book by its bookId.
Response: The book record with the matching bookId.


Update Book
Endpoint: PUT /books/:bookId
Usage: Update a book record by its bookId.
Request Body: JSON object with updated book details (title, author, summary).

Example Request:

{
  "title": "Updated Book Title",
  "author": "Updated Author",
  "summary": "Updated book summary."
}

example response: 
{
    "status": true,
    "message": "Book updated successfully",
    "data": {
        "_id": "6548d85cfee86a3604e368db",
        "title": "Updated Book Title3",
        "author": "Updated Author",
        "summary": "Updated book summary.",
        "deletedAt": null,
        "isDeleted": false,
        "createdAt": "2023-11-06T12:13:16.609Z",
        "updatedAt": "2023-11-06T12:14:37.337Z",
        "__v": 0
    }
}

Delete Book
Endpoint: DELETE /books/:bookId
Usage: Delete a book by its bookId.
Response: Confirmation message and the deleted book record.



Local Setup and Running the Application

1.Clone the Repository:

git clone <repository-url>
cd BookManagement

2.Initialize the Project:
npm init

3.Install Dependencies:
npm install

4.Start the Server:
node src/index.js

5.Access the API:
The API will be available at http://localhost:3001.