import patients from "../../data/patients"
import { NonSensitivePatientEntry, EntryWithoutId, 
  NewPatientEntry, PatientEntry, Entry } from "../types"
import {v1 as uuid} from 'uuid'

const getEntries = (): Array<PatientEntry> => {
  return patients
}

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find(d => d.id === id) 

  return entry
}



const getNonSensitiveEntries = (): NonSensitivePatientEntry[]  => {
  
  return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
    id, name, dateOfBirth, gender, occupation, entries
  }))
}

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const id = uuid() 

  const newPatientEnry = {
    id: id,
    ...entry
  }

  patients.push(newPatientEnry)

  return newPatientEnry
}


// const assertNever = (value: never): never => {
//   throw new Error(
//     `Unhandled discriminated union member: ${JSON.stringify(value)}`
//   )
// }

const findByIdAndUpdateEntries = (id: string, entry: EntryWithoutId): PatientEntry | undefined => {
  const entryId = uuid() 

  const patient = patients.find(d => d.id === id) 

  const newEntry: Entry = {
    id: entryId,
    ...entry
  }

  patient?.entries.push(newEntry)
 
  return patient
}


export default {
  findById,
  findByIdAndUpdateEntries,
  getEntries,
  addPatient,
  getNonSensitiveEntries
}