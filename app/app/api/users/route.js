import { NextResponse } from "next/server";
import pool from "@/app/_libs/mysql";

export async function GET() {
  try {
    const db = await pool.getConnection()
    const query = `select id, username FROM user`;
    let [rows] = await db.execute(query);
    // rows.map(row => {
    //   row.id = row.id.toString('ascii');
    // })
    db.release()
    
    return NextResponse.json(rows)
  } catch (error) {
    return NextResponse.json({
      error: error
    }, { status: 500 })
  }
}