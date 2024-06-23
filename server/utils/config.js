
export const databases = [
  'EXERCISE_DATABASE',
  // 'ENVIRONMENT_DATABASE',
  // 'MOVEMENT_DATABASE',
  // 'MUSCLE_DATABASE',
  // 'MODIFIER_DATABASE',
  // 'FOCUS_DATABASE',
  // 'DISCREETNESS_DATABASE',
  // 'CONDITION_DATABASE'
]

export const syncType = process.argv[2] || 'partial';
export const filepath = './data';
export const saveRawData = false;