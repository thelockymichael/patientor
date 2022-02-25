

export interface DiagnoseEntry {
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {

}

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