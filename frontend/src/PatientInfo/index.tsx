import axios from "axios";
import React from "react";
import { Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Entry, Patient } from "../types";
import { setPatient, useStateValue } from "../state";
import EntryDetails from "../EntryDetails/EntryDetails";
import { EntryFormValues } from "../EntryDetails/AddEntryForm";
import AddEntryModal from "../EntryDetails";

// TODO Add a form for diagnoses
// * SUPPORt one entry type
// * DO not need to handle any errors
// * u can re-use code from Add Patient

const PatientInfo = () => {
  const [{patients, diagnoses}, dispatch] = useStateValue();

  const { id } = useParams<{id: string}>()

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      console.log("values", values);
      
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      console.log("newEntry", newEntry);
      
      // dispatch(addPatient(newPatient))
      // dispatch({ type: "ADD_PATIENT", payload: newPatient });
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };


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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
       <Button onClick={() => openModal()}>Add New Patient</Button>
    </>
  );
};

export default PatientInfo;
