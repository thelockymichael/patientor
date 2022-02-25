import diagnoseData from "../../data/diagnoses.json"
import { Diagnosis } from "../types"


const diagnoses: Array<Diagnosis> = diagnoseData as Array<Diagnosis>

const getEntries = (): Array<Diagnosis> => {
  return diagnoses
}

// const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[]  => {
//   return diaries.map(({id, date, weather, visibility}) => ({
//     id,
//     date,
//     weather,
//     visibility
//   }))
// }

// const addDiary = () => {
//   return null
// }

export default {
  getEntries,
  // addDiary,
  // getNonSensitiveEntries
}