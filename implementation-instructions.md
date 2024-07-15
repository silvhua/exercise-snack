# Implementation Instructions for BrainStation Education Team

This document provides instructions for how to run this project locally.

## 1. Data extraction: Pulling seed data from Notion API (Optional)

Note that this step is optional because seed data is already in the repository in the `data` folder. 

If you wish to do this step, please ensure you create `/src/.env` file (use `/src/.env.example` as a template) containing the additional environmental variables provided through the Synapse submission.

1. `cd src` as this is the directory for the data migration.
2. `npm i` to install node packages.
3. `npm run pull` to pull data from the data.

## 2. Data migration

1. Create a database named `movement_snack_submission` or whatever `DB_NAME` you choose that is reflected in the `/src/.env` `DB_NAME` variable.
2. Make sure you are in the `src` directory of the project.
3. `npm run migrate`
4. `npm run seed`
5. Database should now be populated except for the `program` table, which is populated during app usage.

## 3. Running the app

1. Navigate to `/app` from the project root directory.
2. `npm i` to install packages.
3. Create the `/app/.env.local` file using the `/app/.env.local.example` as a template template. Please note that this is a separate file in a separate directory than the `.env.local` from the migration steps.
3. `npm run dev` to run the app.


## Project navigation

Note that the project root directory has 3 subdirectories:

Directory | What it contains | Notes
--- | ---- | ---
`/app` | Files for the `Next.js` app | `Next.js` apps include code for both the server and the client.
`/documentation` | Project documentation files. 
`/src` | Data migration files.