import pool from "@/app/_libs/mysql";
import { NextResponse } from "next/server";
import { redirect } from 'next/navigation'

export default async function sqlSelect(query, getFirst, binaryColumns) {
  /* 
    Helper function for client components to query the database.
  */
  
  let db;
  try {
    db = await pool.getConnection();
    const result = await db.execute(query);
    let [rows] = result;
    rows.map(row => {
      if (row.id) {
        row.id = row.id.toString('ascii');
      }
    })
    if (getFirst) {
      rows = rows[0];
    }

    // convert binary columns to string
    if (binaryColumns?.length > 0) {
      binaryColumns.forEach(column => {
        rows.map(row => binaryToString(row, column));
        return rows;
      })
    }
    db.release();
    return rows;
  } catch (error) {
    if (error) {
      console.error(error);
    }
    redirect('/redirect')
    return null;
  } finally {
    if (db) {
      
      db.release();
    }
  }
}

export async function apiSqlQuery(query, getFirst, binaryColumns) {
  /* Helper function for API endpoints to query the database. */
  
  let db;
  try {
    db = await pool.getConnection();
    const result = await db.execute(query);
    let [rows] = result;
    if (rows?.[0]?.id) {
      rows.map(row => {
        row.id = row.id.toString('ascii');
      })
    }

    // convert binary columns to string
    if (binaryColumns?.length > 0) {
      binaryColumns.forEach(column => {
        rows.map(row => binaryToString(row, column));
        return rows;
      })
    }
    console.log(`rows in utils.js`, rows)
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
    console.error(error);
    return NextResponse.json({
      error: 'Unable to perform request.'
    }, { status: 500 })
  } finally {
    if (db) {
      db.release();
    }
  }
}

export function binaryToString(object, key) {
  try {
    object[key] = object[key].toString('ascii');
  } catch (error) {
  }
  return object;
}