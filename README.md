# Lab 09 Bats Management System

System for managing administrators, customers, and inventory.

## Server UML

![UML](uml.png)

### Authors: Rhett Beardemphl, Mike Pace

### Links and Resources

-[Repo](https://github.com/rhettb253/bats-cms)

### Tests

Unit Tests: npm run test
Lint Tests: npm run lint

#### Account creation and sign in works appropriately

- signup creates new user and sends an object with the user & token back
- signin with basic auth headers logs in a user & sends a response object back

#### ACL Integration

- the any user should be able to get a resource
- the user with member capabilities should be able to create a model
- the user with member capabilities should NOT be able to update a model
- the user with admin capabilities should be able to update a model
- the user with admin capabilities should be able to delete a model

#### .env requirements (where applicable)

port variable exists within the env sample  

#### Running the app

clone repo  
`npm i`  
make env file and set variable appropriately
`npm start`  

Endpoint post request: `/signup` body: '{"username": "name",
 "password": "pass"}'
Returns Object similar to

```javascript
{
  "user": {
    "token": "xxxxxxxxxxxxxxxxxxx.eyJ1c2VybmFtZSI6ImJhdG1pa2UiLCJpYXQiOjE2OTA5MjE0NjV9.f4wxNOkRef5iiWVNPMGsfKqA8UlwgdxtSJZr3BgDwrI",
    "capabilities": [
      "read"
    ],
    "role": "customer",
    "id": 1,
    "username": "name",
    "password": "$xxxxxny0vmzR0KQh3mYMFoSOjredeKf0jNPz6713VbVabzwMEZoc7jwexa",
    "updatedAt": "2023-xx-xxT20:24:25.593Z",
    "createdAt": "2023-xx-xxT20:24:25.593Z"
  },
  "token": "xxxxxxxxxxxxxxxxxxx.eyJ1c2VybmFtZSI6ImJhdG1pa2UiLCJpYXQiOjE2OTA5MjE0NjV9.f4wxNOkRef5iiWVNPMGsfKqA8UlwgdxtSJZr3BgDwrI"
}
```
