# Run from server root
npx knex migrate:up 20240622163117_create_muscle.js
npx knex seed:make muscle
npx knex seed:run


npx knex migrate:up 20240622163046_create_condition.js