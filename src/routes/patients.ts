import express from "express"
import patientService from "../services/patientService"

const router = express.Router()

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries())
})

/**
 *
 *id: string,
  name: string,
  dateOfBirth: string,
  gender: string,
  occupation: string,
  ssn: string
 */


router.post("/", (req, res) => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {name, dateOfBirth, gender, occupation, ssn} = req.body

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newPatientEnry = patientService.addPatient({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    name, 
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    dateOfBirth,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    gender,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    occupation,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ssn
  })


  res.send(newPatientEnry)
})

export default router