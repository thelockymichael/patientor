

export interface DiagnoseEntry {
  code: string,
  name: string,
  latin?: string,
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>

export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  gender: string,
  occupation: string,
  ssn: string
}