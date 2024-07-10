// import { apiSqlQuery } from "@/app/_libs/utils";

// export async function GET(request) {
//   /* 
//   https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#example
//   */
//   const username = 'silvhua'
//   const requestBody = await request.json();
//   // const { username } = requestBody;
//   // const username = params.username;
//   const query = `
//   SELECT
//     id, username, first_name, last_name,
//     password
//   FROM user
//   WHERE username = "${username}"
//   `;
//   const response = await apiSqlQuery(query, true);
//   return response;

// }


// import { NextResponse } from "next/server";
// import pool from "@/app/_libs/mysql";

// export async function GET() {
//   try {
//     const db = await pool.getConnection()
//     const query = `select id, username FROM user`;
//     let [rows] = await db.execute(query);
//     // rows.map(row => {
//     //   row.id = row.id.toString('ascii');
//     // })
//     db.release()
    
//     return NextResponse.json(rows)
//   } catch (error) {
//     return NextResponse.json({
//       error: error
//     }, { status: 500 })
//   }
// }