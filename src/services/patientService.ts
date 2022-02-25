import patients from "../../data/patients"
import { NonSensitivePatientEntry, NewPatientEntry, PatientEntry } from "../types"
import {v1 as uuid} from 'uuid'

const getEntries = (): Array<PatientEntry> => {
  return patients
}

const getNonSensitiveEntries = (): NonSensitivePatientEntry[]  => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }))
}

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  // const NewPatientEntry = {
  //   id:  uuid() as any,
  //   ...entry
  // }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id = uuid() 

  const newPatientEnry = {
    id: id,
    ...entry
  }

  patients.push(newPatientEnry)

  return newPatientEnry

  // patients.push(newPatientEnry)
}

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries
}