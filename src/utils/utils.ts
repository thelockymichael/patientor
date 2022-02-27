
import { Gender,
   NewPatientEntry, EntryWithoutId,
    Diagnosis, HealthCheckRating, HospitalTypes } from "../types/index"


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

const parseString = (string: unknown, key: string): string => {
  if (!string || !isString(string)) {
    throw new Error(`Incorrect or missing ${key}.`)
  }
  return string
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

const isHealthCheck = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param)
}

const parseHealthCheckRating = (healthCheck: unknown): HealthCheckRating => {
  if (!healthCheck || !isString(healthCheck) || !isHealthCheck(healthCheck)) {
    throw new Error("Incorrect or missing health check rating: " + isHealthCheck)
  }
  return healthCheck
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHospitalType = (param: any): param is HospitalTypes => {
 
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HospitalTypes).includes(param)
}


const parseHospitalTypes = (hospitalType: unknown): HospitalTypes => {
  if (!hospitalType || !isString(hospitalType) || !isHospitalType(hospitalType)) {
    throw new Error("Incorrect or missing entry type: " + hospitalType)
  }

  return hospitalType
}


const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const parseDiagnosisCodes = (param: unknown): Array<Diagnosis['code']> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    // TODO check if param IS array
    // if every property is a string
    if (!param || !Array.isArray(param)) {
      throw new Error("Incorrect or missing diagnosis codes.") 
    }
  
    return param as Array<Diagnosis['code']>
}

type Fields = { name: unknown, dateOfBirth: unknown,
  gender: unknown, occupation: unknown, ssn: unknown }

export const toNewPatientEntry = ({ name, dateOfBirth, gender,
occupation, ssn }: Fields): NewPatientEntry => {

 const newEntry: NewPatientEntry = {
   name: parseString(name, "name"),
   dateOfBirth: parseDate(dateOfBirth),
   gender: parseGender(gender),
   occupation: parseOccupation(occupation),
   ssn: parseSsn(ssn),
   entries: []
 }

 return newEntry
}


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const toNewEntry = (body: EntryWithoutId): EntryWithoutId => {
  
  let newEntry: EntryWithoutId

  switch(body.type) {
    case "Hospital":
   const { date, criteria } = body.discharge
   newEntry = {
      type: parseHospitalTypes(body.type) as "Hospital",
      date: parseDate(body.date),
      description: parseString(body.description, "description"),
      diagnosisCodes: body?.diagnosisCodes && parseDiagnosisCodes(body?.diagnosisCodes),
      discharge: { 
        date: parseDate(date),
        criteria: parseString(criteria, "criteria")
      },
      specialist: parseString(body.specialist, "specialist")
    }
    break
    case "OccupationalHealthcare":
      const { employerName, sickLeave } = body

      newEntry = {
        type: parseHospitalTypes(body.type) as "OccupationalHealthcare",
        date: parseDate(body.date),
        description: parseString(body.description, "description"),
        diagnosisCodes: body?.diagnosisCodes && parseDiagnosisCodes(body?.diagnosisCodes),
        specialist: parseString(body.specialist, "specialist"),
        employerName: parseString(employerName, "employerName"),
        sickLeave: sickLeave && {
          startDate: parseDate(sickLeave.startDate),
          endDate: parseDate(sickLeave.endDate)
        }
      }    
    
    break
    case "HealthCheck":
      const { healthCheckRating } = body
      newEntry = {
        type: parseHospitalTypes(body.type) as "HealthCheck",
        date: parseDate(body.date),
        description: parseString(body.description, "description"),
        diagnosisCodes: body?.diagnosisCodes && parseDiagnosisCodes(body?.diagnosisCodes),
        specialist: parseString(body.specialist, "specialist"),
        healthCheckRating: parseHealthCheckRating(healthCheckRating)
      }    
      break
    default:
      return assertNever(body)
  }

  return newEntry
}