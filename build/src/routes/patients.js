"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils/utils"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(patientService_1.default.getNonSensitiveEntries());
});
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
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatientEntry = (0, utils_1.default)(req.body);
        const addedEntry = patientService_1.default.addPatient(newPatientEntry);
        res.json(addedEntry);
    }
    catch (error) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
    // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // const {name, dateOfBirth, gender, occupation, ssn} = req.body
    // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // const newPatientEnry = patientService.addPatient({
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //   name, 
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //   dateOfBirth,
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //   gender,
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //   occupation,
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //   ssn
    // })
    // res.send(newPatientEnry)
});
exports.default = router;
