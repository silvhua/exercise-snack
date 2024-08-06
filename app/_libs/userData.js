"use server"

import 'dotenv/config';
import sqlSelect from "./utils";
import crypto from 'crypto';

const dbTimezone = 'UTC';
const userTimezone = 'America/Vancouver';
let serverTimezone = dbTimezone;
let timeConversionExpression = `CONVERT_TZ(activity.created_time, '${dbTimezone}', '${userTimezone}')`;
let dateExpression = `CONVERT_TZ(DATE(${timeConversionExpression}), '${userTimezone}', '${serverTimezone}')`;
let timestampExpression = 'activity.created_time';

// If app is run on localhost, avoid `CONVERT_TZ` since it will throw error due to timezones not being populated
if (process.env?.['IS_LOCAL']) {
  serverTimezone = userTimezone;
  timestampExpression = process.env?.['REMOTE_DB'] ? timeConversionExpression : 'activity.created_time';
  timeConversionExpression = 'activity.created_time';
  dateExpression = `DATE(${timeConversionExpression})`;
}

export async function getUserNames() {
  const query = `SELECT username FROM user;`
  const response = await sqlSelect(query);
  return response;
}

export async function createUser(username, password, first_name) {
  const uuid = crypto.randomUUID()
  const query = `
  INSERT INTO user (
    id,
    username,
    password,
    first_name
  )
  VALUES (
    "${uuid}",
    "${username}",
    "${password}",
    "${first_name}"
  )
  `
  const postResponse = await sqlSelect(query);
  if (Math.floor(postResponse.status / 100) === 2) {
    const query2 = `
    SELECT
      id,
      username,
      password,
      first_name
    FROM user
    WHERE id = "${uuid}"
    `
    const newRecord = await apiSqlQuery(
      query2, true
    );
    return newRecord;
  }
  const response = postResponse;
  return response;
}

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
    SELECT DISTINCT DATE(
      ${dateExpression}
      ) AS activity_date
    FROM activity
    LEFT JOIN session
    ON (session_id = session.id)
    LEFT JOIN ${userTableName}
    ON (user_id = ${userTableName}.id)
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
  ),
  all_consecutive_days AS (
    SELECT
      start_date AS id,
      start_date,
      end_date,
      consecutive_days
    FROM ConsecutiveGroups
    WHERE end_date = CURDATE() - INTERVAL 1 DAY
    OR end_date = CURDATE()
  )
  SELECT 
    MAX(consecutive_days) AS consecutive_days,
    MAX(end_date) AS id
  FROM all_consecutive_days
  `
  const data = await sqlSelect(query, true);
  return data;
  
}

export async function getActivityPerDate(userId) {
  const userTableName = "`user`"
  // backticks required because `user` is a SQL keyword

  const query = `
  SELECT 
    MIN(session.id) AS id,
    COUNT(activity.id) AS n_sets,
    ${dateExpression} AS date
  FROM activity
  LEFT JOIN session
    ON (session_id = session.id)
  LEFT JOIN ${userTableName}
    ON user_id = user.id
  WHERE ${userTableName}.id = "${userId}"
  GROUP BY ${dateExpression}
  ORDER BY ${dateExpression} DESC
  `
  const data = await sqlSelect(query);
  return data;
  
}


export async function getUserActivity(userId) {
  const userTableName = "`user`"
  // backticks required because `user` is a SQL keyword
  const query = `
  SELECT 
    activity.created_time,
    ${timestampExpression} AS local_time, 
    reps,
    duration,
    notes,
    exercise.name AS exercise
  FROM activity
  LEFT JOIN session
    ON (session_id = session.id)
  LEFT JOIN ${userTableName}
    ON user_id = user.id
  LEFT JOIN exercise
    ON (exercise_id = exercise.id)
  WHERE ${userTableName}.id = "${userId}"
  ORDER BY ${timestampExpression} DESC
  `
  const data = await sqlSelect(query);
  return data;
  
}