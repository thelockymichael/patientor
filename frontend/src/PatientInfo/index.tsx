import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { setPatient, useStateValue } from "../state";

const PatientInfo = () => {
  const [{patients}, dispatch] = useStateValue();

  const { id } = useParams<{id: string}>()

  console.log("params, ", id);
  console.log("patients, ", patients);
  

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
          
        console.log("data", data);
        dispatch(setPatient(data))
        // dispatch({ type: "SET_PATIENT", payload: data });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);
  // TODO
  // 1. Click patient's name --> patient's information
  // 2. 

  return (
    <div>
      <h1>{patients[id].name}</h1>
      <p>ssn: {patients[id].ssn} </p>
      <p>occupation: {patients[id].occupation}</p>
      <p></p>
    </div>
  );
};

export default PatientInfo;
