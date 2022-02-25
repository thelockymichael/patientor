import patients from "../../data/patients"
import { NonSensitivePatientEntry, NewPatientEntry, PatientEntry } from "../types"
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

export default {
  findById,
  getEntries,
  addPatient,
  getNonSensitiveEntries
}