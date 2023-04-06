## About

This project was created with [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript).

## Available Scripts

### `npm run dev`

Run the server in development mode.

### `npm test`

Run all unit-tests with hot-reloading.

### `npm test -- --testFile="name of test file" (i.e. --testFile=Users).`

Run a single unit-test.

### `npm run lint`

Check for linting errors.

### `npm run build`

Build the project for production.

### `npm start`

Run the production build (Must be built first).

### `npm start -- --env="name of env file" (default is production).`

Run production build with a different env file.

## Folder Structure

- [**src**](src)
  - [**constants**](src/constants)
  - [**controllers**](src/controllers)
    - BasketController.ts
    - ProductController.ts
  - [**repos**](src/repos)
    - [**data**](src/repos/data)
    - [**models**](src/repos/models)
    - BasketRepo.ts
    - ProductRepo.ts
  - [**routes**](src/routes)
    - BasketRouter.ts
    - ProductRouter.ts
  - [**services**](src/services)
    - BasketService.ts
    - ProductService.ts
  - [**util**](src/util)

## OpenAPI (swagger) document

- `http://localhost:3000/api-docs/`
<img width="808" alt="Screenshot 2023-04-06 at 12 41 06" src="https://user-images.githubusercontent.com/5821127/230385806-2eb73b70-8476-486a-8914-68bde5bd545f.png">

## Additional Notes

- This project has been implemented using Typescript and Express server
- It follows a layered architecture

  - `index.ts` ---> `routes` ---> `controllers` ---> `services` ---> `repos`

  - `index.ts`: The entry point of the application. It configures and starts Express backend server
  - `routes`: It dispatches the requests to the controller layer.
  - `controllers`: It is first point of the incoming request. Handles and validates the request and passes them to service layer. Sends the response to the client back.
  - `services`: It bridges between controller and DAO layer and applies business rules. Returns the result of the request to controller layer.
  - `repos`: It handles database operations and manages DB entities.
