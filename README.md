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
<img width="797" alt="Screenshot 2023-04-06 at 12 12 50" src="https://user-images.githubusercontent.com/5821127/230361783-1bab1b2b-e643-40fb-8358-00f69ed319e4.png">
