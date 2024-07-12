"use server"

import sqlSelect from "./utils";


export default async function readUser(username) {
  const query = `
  SELECT
    id, username, first_name, last_name,
    password
  FROM user
  WHERE username = "${username}"
  `;
  const data = await sqlSelect(query, true);
  return data;
}

export async function getStreak(userId) {
  const userTableName = "`user`"
  // backticks required because `user` is a SQL keyword
  const query = `
  WITH DistinctDates AS (
    SELECT DISTINCT DATE(activity.created_time) AS activity_date
    FROM activity
    LEFT JOIN session
    ON (session_id = session.id)
    LEFT JOIN ${userTableName}
    ON (${userTableName} = ${userTableName}.id)
    WHERE ${userTableName}.id = "${userId}"
  ),
  RankedDates AS (
    SELECT 
      activity_date,
      ROW_NUMBER() OVER (ORDER BY activity_date) AS row_num
    FROM DistinctDates
  ),
  GroupedDates AS (
    SELECT
      activity_date,
      row_num,
      DATE_SUB(activity_date, INTERVAL row_num DAY) AS date_group
    FROM RankedDates
  ),
  ConsecutiveGroups AS (
    SELECT
      date_group,
      MIN(activity_date) AS start_date,
      MAX(activity_date) AS end_date,
      COUNT(*) AS consecutive_days
    FROM GroupedDates
    GROUP BY date_group
  )
  SELECT
    start_date AS id,
    start_date,
    end_date,
    consecutive_days
  FROM ConsecutiveGroups
  WHERE end_date = CURDATE() - INTERVAL 1 DAY;
  `
  const data = await sqlSelect(query, true);
  return data;
  
}