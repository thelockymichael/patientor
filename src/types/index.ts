

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string,
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>

export type NewPatientEntry = Omit<PatientEntry, 'id'>


export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}



export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: {
    startDate: string,
    endDate: string
  }
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: {
    date: string,
    criteria: string
  }
}


export enum HospitalTypes {
  OccupationalHealthcare = "OccupationalHealthcare",
  HealthCheck = "HealthCheck",
  HospitalEntry = "Hospital"
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;}



export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never
// // Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>

// TODO
// * define occupationalHealthcareEntru 
// * define hospitalentry
// so that those conform with the example data
// ensure that your backend returns the entries properly when you go
// to an individual patient's route

// Define special omit for unions
// type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never
// // Define Entry without the 'id' property
// type EntryWithoutId = UnionOmit<Entry, 'id'>


export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  gender: Gender,
  occupation: string,
  ssn: string,
  entries: Entry[]
}

export type PublicPatient = Omit<PatientEntry, "ssn" | "entries" >