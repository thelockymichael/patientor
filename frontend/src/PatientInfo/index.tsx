import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { setPatient, useStateValue } from "../state";
import EntryDetails from "../EntryDetails/EntryDetails";

const PatientInfo = () => {
  const [{patients, diagnoses}, dispatch] = useStateValue();


  console.log("patients", patients);
  console.log("diagnoses", diagnoses);
  // console.log("ASD-123", diagnoses[patients[0].entries.entries[]]);
  

  const { id } = useParams<{id: string}>()

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
          
        dispatch(setPatient(data))
      } catch (e) {
        console.error(e);
      }
    };
      void fetchPatientList();
  }, [dispatch]);

  return (
    <>
      {!patients[id] ? <>...</> : 
        <div>
          <h1>{patients[id].name}</h1>
          <p>ssn: {patients[id].ssn} </p>
          <p>occupation: {patients[id].occupation}</p>

          <h2>entries</h2>

          {patients[id].entries.map((item) => (
            <EntryDetails 
            key={item.id}
            diagnoses={diagnoses}
            entry={item}/>
            
          ))}
        </div>
      }
    </>
  );
};

export default PatientInfo;
