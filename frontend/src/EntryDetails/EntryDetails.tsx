import React from "react";
import { Icon } from "semantic-ui-react";

import { Diagnosis, Entry, HealthCheckEntry } from "../types";


/**
 * interface ShowHealthCheckEntry extends BaseEntry {
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
 * 
 */

const parseHealthCheckRating = (healthCheck: number) => {
  let icon = <Icon color="green" size="big" name="heart"></Icon>

  switch(healthCheck) {
    case 0:
      icon = <Icon color="green" size="big" name="heart"></Icon>
      break;

    case 1:
      icon = <Icon color="yellow" size="big" name="heart"></Icon>
      break;
    
      case 2:
        icon = <Icon color="pink" size="big" name="heart"></Icon>
      break;
    
      case 3:
      icon = <Icon color="red" size="big" name="heart"></Icon>
    break;
  }

  return icon
}

const containerStyle = {
  border: "solid 2px #000000",
  padding: "20px",
  marginTop: "16px"
}

const HospitalEntry: React.FC<{entry: Entry,
   diagnoses:{ [code: string]: Diagnosis; }}> 
   = ({ entry, diagnoses }) => {

  
  return (
    <div style={containerStyle}>
      <p>{entry.date}<Icon size="big" name="book"></Icon></p>
      <i>{entry.description}</i>
      <ul>
      {entry.diagnosisCodes?.map((item) => 
        <li key={item}>{item} {diagnoses[item].name}</li>
      )}
      </ul>
      <p>diagnose by {entry.specialist}</p>
  </div>
  )
}

const OccupationalHealthcare: React.FC<{entry: Entry,
   diagnoses:{ [code: string]: Diagnosis; }}> 
   = ({ entry, diagnoses }) => {
  return (
    <div style={containerStyle}>
      <p>{entry.date}<Icon size="big" name="briefcase"></Icon></p>
      <ul>
      {entry.diagnosisCodes?.map((item) => 
        <li key={item}>{item} {diagnoses[item].name}</li>
      )}
      </ul>      
      <i>{entry.description}</i>
      <p>diagnose by {entry.specialist}</p>
    </div>
  )
}
/**
 * <div key={item.id}>
              {item.date} <i>{item.description}</i>
              <ul>

              {item.diagnosisCodes?.map((item) => 
              <li key={item}>{item} {diagnoses[item].name}</li>
                
              )}
              </ul>

            </div>
 */

const ShowHealthCheckEntry: React.FC<{entry: HealthCheckEntry, 
  diagnoses:{ [code: string]: Diagnosis; }}> = ({ entry, diagnoses }) => {
  
  return (
    <div style={containerStyle}>
      <p>{entry.date} <Icon size="big" name="first aid"></Icon></p>
      <ul>
      {entry.diagnosisCodes?.map((item) => 
        <li key={item}>{item} {diagnoses[item].name}</li>
      )}
      </ul>
      <i>{entry.description}</i>
      <p>{parseHealthCheckRating(entry.healthCheckRating)}</p>
      <p>diagnose by {entry.specialist}</p>
  </div>
  )
}


const EntryDetails: React.FC<{entry: Entry, diagnoses:{ [code: string]: Diagnosis; }}> 
= ({ entry, diagnoses }) => {
 
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };



  switch(entry.type) {

  case "Hospital":
    return <HospitalEntry diagnoses={diagnoses} entry={entry}/>

  case "OccupationalHealthcare":
    return <OccupationalHealthcare diagnoses={diagnoses} entry={entry} />
  
  case "HealthCheck":
    return <ShowHealthCheckEntry diagnoses={diagnoses} entry={entry}/>

  default: 
    return assertNever(entry)
  }
};

export default EntryDetails;
