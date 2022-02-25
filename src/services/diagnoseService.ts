import diagnoseData from "../../data/diagnoses.json"
import { DiagnoseEntry } from "../types"


const diagnoses: Array<DiagnoseEntry> = diagnoseData as Array<DiagnoseEntry>

const getEntries = (): Array<DiagnoseEntry> => {
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