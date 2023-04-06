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
