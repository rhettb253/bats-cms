# Auth Api Server

## Server UML

<img src='authapiwb.png'>

### Servers

The api-server is a fully functional API server that performs CRUD operations via REST.
The auth-server is a fully functional Auth server, capable of adding users, logging users in, and providing middleware that can be used to protect any route.

### Task 1: Combine these 2 servers into a single server

Your server should respond to the following routes:
POST /signup to create a user.
POST /signin to login a user and receive a token.
GET /secret should require a valid bearer token.
GET /users should require a valid token and “delete” permissions.
NOTE: You will have some duplicated files and functionality between the 2 servers. Eliminate the waste and end with a single running server with all current routes functional.

### Task 2: Create a new set of “Protected” API routes

Restrict access without a valid token AND a specific capability.
Create a new set of routes (V2) within the server.
V2 API Routes (/api/v2/...) must now be protected with the proper permissions based on user capability, using Bearer Authentication and an ACL.
app.get(...) should require authentication only, no specific roles.
app.post(...) should require both a bearer token and the create capability.
app.put(...) should require both a bearer token and the update capability.
app.delete(...) should require both a bearer token and the delete capability.

### Task 3: Apply best practices and quality engineering

Full Test Coverage.
Well executed UML and WRRC Diagrams.
Polished and Complete Developer Friendly README.md at the root of your repo.

### Tests

#### account creation and sign in works appropriately

- signup creates new user and sends an object with the user & token back
- signin w basic auth headers logs in a user & sends a resObj back

#### ACL Integration

- the user should be able to get a resource
- the user with writer capabilities should be able to create a model
- the user with writer capabilities should NOT be able to update a model
- the user with admin capabilities should be able to update a model
- the user with admin capabilities should be able to delete a model
