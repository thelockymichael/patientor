import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, FormikErrors, Formik, Form } from "formik";

import { SelectField } from "./FormField";

import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { Diagnosis, Entry, EntryWithoutId, HealthCheckRating, HospitalEntryOption, HospitalEntryType } from "../types";
import { useStateValue } from "../state";
import * as Yup from "yup";
import { HealthCheckSelect, HealthCheckOption } from "./HealthCheckSelect";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never
// // Define Entry without the 'id' property
export type EntryFormValues = UnionOmit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

interface BaseEntry {
  date: string,
  description: string,
  specialist: string,
  diagnosisCodes?: Array<Diagnosis['code']>,
}

interface Discharge {
  date: string,
  criteria: string
}

export interface LocalHospitalEntryType extends BaseEntry {
  type: "Hospital",
  discharge: Discharge
}


const dischargeValidation = Yup.object().shape({
  date: Yup.date().required("This field is required!"),
  criteria: Yup.string().required("This field is required!")
})

const validationSchema = Yup.object().shape({
  description: Yup.string().required("This field is required!"),
  date: Yup.date().required("This field is required!"),
  specialist: Yup.string().required("This field is required!"),
  discharge: dischargeValidation
});

const hospitalEntryOptions: HospitalEntryOption[] = [
  { value: HospitalEntryType.HealthCheck, label: "Health check" },
  { value: HospitalEntryType.Hospital, label: "Hospital" },
  { value: HospitalEntryType.OccupationalHealthcare, label: "Occupational healthcare" },
];

const healthRatingOptions: HealthCheckOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low risk" },
  { value: HealthCheckRating.HighRisk, label: "High risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical risk" },
];

export const AddEntryForm = ({ onSubmit, onCancel } : Props ) => {
  const [{ diagnoses }] = useStateValue()

  const [initValues, setInitValues] = useState<EntryWithoutId>({
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        discharge: {
          date: "",
          criteria: ""
        }
  })

  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        let errors: FormikErrors<LocalHospitalEntryType> = {};

        switch(values.type){
          case "Hospital":
            if (!values.description) {
              errors.description = requiredError;
            }
            if (!values.date) {
              errors.date = requiredError;
            }
            if (!values.specialist) {
              errors.specialist = requiredError;
            }

            if (!values.discharge.date) {
              errors = { 
                discharge: {
                  date: requiredError
                }
              }
            }

            if (!values.discharge.criteria) {
              errors = { 
                discharge: {
                  criteria: requiredError
                }
              }
            }

            return errors
        }
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {

        console.log("values", values);

        switch(values.type){
          case "Hospital":

            setInitValues({
              type: "Hospital",
              description: "",
              date: "",
              specialist: "",
              discharge: {
                date: "",
                criteria: ""
              }
            })

           return <Form className="form ui">
            <SelectField
              label="Select entry type"
              name="type"
              options={hospitalEntryOptions}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <DiagnosisSelection 
              setFieldValue={setFieldValue} 
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />    
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
          case "HealthCheck":

            setInitValues({
              type: "HealthCheck",
              description: "",
              date: "",
              specialist: "",
              healthCheckRating: 0,
              diagnosisCodes: []
            })

            return <Form className="form ui">
            <SelectField
              label="Select entry type"
              name="type"
              options={hospitalEntryOptions}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />            
            <HealthCheckSelect
              label="Health Rating"
              name="healthRating"
              options={healthRatingOptions}
            />
            {/* <Sele */}
            <DiagnosisSelection 
              setFieldValue={setFieldValue} 
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />    
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
          case "OccupationalHealthcare":
            
          setInitValues({
              type: "OccupationalHealthcare",
              description: "",
              date: "",
              specialist: "",
              employerName: "",
              sickLeave: {
                startDate: "",
                endDate: ""
              },
              diagnosisCodes: []
            })
        return <Form className="form ui">
            <SelectField
              label="Select entry type"
              name="type"
              options={hospitalEntryOptions}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Employer name"
              placeholder="Description"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick leave - start date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="End leave - end date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            <DiagnosisSelection 
              setFieldValue={setFieldValue} 
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />    
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>  
        }
      }}
    </Formik>
  );
};

export default AddEntryForm;
