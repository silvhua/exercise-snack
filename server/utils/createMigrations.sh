# Run from server root
npx knex migrate:up 20240622163117_create_muscle.js
npx knex seed:make muscle
npx knex seed:run