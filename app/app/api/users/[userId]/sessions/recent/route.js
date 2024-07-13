import crypto from 'crypto';
import {apiSqlQuery} from "@/app/_libs/utils";
import { queryParamsToSql } from '@/app/_libs/dataProcessing';

export async function GET(request, { params }) {
  const userId = params.userId;
  const query = `
  SELECT
    MAX(id) AS id,
    MAX(last_edited_time) AS last_edited_time,
    MIN(created_time) AS date 
  FROM session
  WHERE (user = "${userId}")
  AND created_time >= DATE_SUB(NOW(), INTERVAL 7 DAY)
  AND id IN (
    SELECT session_id AS id
    FROM activity
  )
  GROUP BY DATE(created_time)
  ORDER BY DATE(created_time) DESC
  `
  const response = await apiSqlQuery(query);
  return response;
}
/* 

*/