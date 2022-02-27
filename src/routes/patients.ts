import express from "express"
import patientService from "../services/patientService"
import {toNewEntry, toNewPatientEntry} from "../utils/utils"

const router = express.Router()

router.get("/", (_req, res) => {

  res.send(patientService.getNonSensitiveEntries())
})

router.get("/:id", (req, res) => {
  const patient = patientService.findById((req.params.id))
  
  if (patient) {
    res.send(patient)
  } else {
    res.sendStatus(404)
  }
})

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body)

    const addedEntry = patientService.addPatient(newPatientEntry)
    res.json(addedEntry)
  } catch (error: unknown) {
    let errorMessage = "Something went wrong."

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

// TODO Add patient entries
// POST an entry for a patient
// d2773336-f723-11e9-8f0b-362b9e155667

router.post("/:id/entries", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewEntry(req.body)

    const patient = patientService
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    .findByIdAndUpdateEntries(req.params.id, newPatientEntry)

    res.json(patient)

    // TODO 
    // 1 McClane

      // const addedEntry = patientService.addPatient(newPatientEntry)
      // res.json(addedEntry)
  } catch (error: unknown) {
    let errorMessage = "Something went wrong."

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

export default router