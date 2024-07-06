import { getExercisePerMovement } from "./exerciseData";

class CreateProgram {
  constructor() {
    this.arrayProperties = [
      'muscle',
      'focus',
      'condition',
      'movement',
      'environment', 'tip'
    ]
    this.result = [];
  }

  async getExercises() {
    this.exerciseArray = await getExercisePerMovement();
    const exercisesIds = this.exerciseArray.map(object => object.id);
    this.uniqueExerciseIds = Array.from(new Set(exercisesIds));
    this.consolidateExerciseArray();
    return this.result;
  }

  consolidateExerciseArray() {
    this.result = this.uniqueExerciseIds.map(id => this.consolidateId(id));
  }

  consolidateId(exerciseId) {
    /* 
    Consolidate multiple exercise objects with the same ID into a single object. 
    For properties with one-to-many relationships, the multiple values
    of the same property are consolidated into an array of unique values.
    */
    const relevantExerciseObjects = this.exerciseArray.filter(
      object => object.id === exerciseId
    );
    const consolidatedExerciseObject = relevantExerciseObjects[0];

    for (let i = 0; i < this.arrayProperties.length; i++) {
      const property = this.arrayProperties[i];
      const valuesArray = relevantExerciseObjects.map(object => object[property]);
      const uniqueVaues = Array.from(new Set(valuesArray));
      consolidatedExerciseObject[property] = uniqueVaues;
    }
    return consolidatedExerciseObject;
  }
}

const program = new CreateProgram();
export default program;
