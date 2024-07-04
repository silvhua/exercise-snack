import pool from "@/app/_libs/mysql";

export default async function sqlSelect(query, getFirst) {
  try {
    const db = await pool.getConnection();
    const result = await db.execute(query);
    let [rows] = result;
    rows.map(row => {
      row.id = row.id.toString('ascii');
    })
    // if (getFirst) {
    //   rows = rows[0];
    // }
    db.release();
    return rows;
  } catch (error) {
    console.log(error);
    return null;
  }
}
