import {apiSqlQuery} from "@/app/_libs/utils";

export async function GET(req, { params }) {
  /* 
  https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#example
  */
  const exerciseId = params.exerciseId;
  const query = `
  SELECT
    exercise.id, exercise.name AS name,
    video.src,
    level AS "discreetness"
  FROM exercise
  LEFT JOIN video ON (video_id = video.id)
  LEFT JOIN discreetness ON (discreetness = discreetness.id)
  WHERE exercise.id = "${exerciseId}"
  `
  const response = await apiSqlQuery(query);
  return response;

}

