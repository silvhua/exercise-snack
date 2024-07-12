import pool from "@/app/_libs/mysql";
import { NextResponse } from "next/server";

export default async function sqlSelect(query, getFirst, binaryColumns) {
  /* 
    Helper function for client components to query the database.
  */
  try {
    const db = await pool.getConnection();
    const result = await db.execute(query);
    let [rows] = result;
    console.log(query)
    rows.map(row => {
      row.id = row.id.toString('ascii');
    })
    if (getFirst) {
      rows = rows[0];
    }

    // convert binary columns to ascii
    if (binaryColumns?.length > 0) {
      binaryColumns.forEach(column => {
        rows.map(row => binaryToString(row, column));
        return rows;
      })
    }
    db.release();
    return rows;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function apiSqlQuery(query, getFirst, binaryColumns) {
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

    // convert binary columns to ascii
    if (binaryColumns?.length > 0) {
      binaryColumns.forEach(column => {
        rows.map(row => binaryToString(row, column));
        return rows;
      })
    }
    db.release();
    if (!getFirst) {
      return NextResponse.json(rows)
    } else if (rows?.length > 0) {
      rows = rows[0];
      return NextResponse.json(rows)
    } else {
      return NextResponse.json({
        error: 'No records found.'
      }, { status: 404 })
    }
    
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({
      error: error
    }, { status: 500 })
  }
}

export function binaryToString(object, key) {
  try {
    object[key] = object[key].toString('ascii');
  } catch (error) {
  }
  return object;
}