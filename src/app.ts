import express from "express"
import cors from "cors"
import diagnoseRoute from "./routes/diagnoses"
import patientRoute from "./routes/patients"

const app = express()

app.use(express.json())


const options: cors.CorsOptions = {
  credentials: true,
  origin: true,
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors(options))

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here")
  res.send("pong")
})

app.use("/api/diagnoses", diagnoseRoute)
app.use("/api/patients", patientRoute)


export default app