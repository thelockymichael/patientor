
import { Gender, NewPatientEntry } from "../types/index"


const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date)
  }

  return date
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name.")
  }
  return name
}

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing SSN.")
  }
  return ssn
}

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation.")
  }
  return occupation
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender)
  }
  return gender
}



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param)
}


type Fields = { name: unknown, dateOfBirth: unknown,
   gender: unknown, occupation: unknown, ssn: unknown }

const toNewPatientEntry = ({ name, dateOfBirth, gender,
occupation, ssn }: Fields): NewPatientEntry => {

  

  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    ssn: parseSsn(ssn),
    entries: []
  }

  return newEntry
}

export default toNewPatientEntry