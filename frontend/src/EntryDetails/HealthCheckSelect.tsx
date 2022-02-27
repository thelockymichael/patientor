import React from "react";
import { Field } from "formik";
import { Form } from "semantic-ui-react";
import { HealthCheckRating } from "../types";

// structure of a single option
export type HealthCheckOption = {
  value: HealthCheckRating;
  label: string;
};

// props for select field component
type HealthCheckSelectProps = {
  name: string;
  label: string;
  options: HealthCheckOption[];
};

export const HealthCheckSelect = ({
  name,
  label,
  options
}: HealthCheckSelectProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map((option) => (
        <option key={option.value} 
        value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);


