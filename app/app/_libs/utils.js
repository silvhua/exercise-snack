import pool from "@/app/_libs/mysql";
import { NextResponse } from "next/server";

export default async function sqlSelect(query, getFirst) {
  /* 
    Helper function for client components to query the database.
  */
  try {
    const db = await pool.getConnection();
    const result = await db.execute(query);
    let [rows] = result;
    rows.map(row => {
      row.id = row.id.toString('ascii');
    })
    if (getFirst) {
      rows = rows[0];
    }
    db.release();
    return rows;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function apiSqlQuery(query, getFirst) {
  /* 
    Helper function for API endpoints to query the database.
  */
  try {
    const db = await pool.getConnection();
    const result = await db.execute(query);
    let [rows] = result;
    if (rows?.[0]?.id) {
      rows.map(row => {
        row.id = row.id.toString('ascii');
      })
    }
    db.release();
    if (rows.length > 0) {
      if (getFirst) {
        rows = rows[0];
      }
      return NextResponse.json(rows)
    } else {
      return NextResponse.json({
        error: 'No records found.'
      }, { status: 404 })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error: error
    }, { status: 500 })
  }
}