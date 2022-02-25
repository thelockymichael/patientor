import app from "./app"
import http from "http"

const PORT = 3001

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
