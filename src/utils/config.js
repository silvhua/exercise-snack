/* 
This file is used to customize the pipeline for migrating data from Notion to the SQL database.
*/
export const databases = [
  'EXERCISE_DATABASE',
  'ENVIRONMENT_DATABASE',
  'MOVEMENT_DATABASE',
  'MUSCLE_DATABASE',
  'MODIFIER_DATABASE',
  'FOCUS_DATABASE',
  'DISCREETNESS_DATABASE',
  'CONDITION_DATABASE',
  'USER_DATABASE', 
  'ACTIVITY_DATABASE',
  'SESSION_DATABASE',
  'TIP_DATABASE',
  'VIDEO_DATABASE'
]

export const syncType = process.argv[2] || 'partial';
export const filepath = './data';
export const saveRawData = false;