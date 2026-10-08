/** load library express */
const express = require(`express`)

/** create object that instances of express */
const app = express()

/** define port of server */
const PORT = 8000
/** load library cors */
const cors = require(`cors`)

/** open CORS policy */
app.use(cors())

/** define all routes */
const userRoute = require(`./routes/user.route`)
const eventRoute = require(`./routes/event.route`)
const ticketRoute = require(`./routes/ticket.route`)
const auth = require(`./routes/auth.route`)
const seatRoute = require(`./routes/seat.route`)   // ← TAMBAH INI

/** define prefix for each route */
app.use(`/user`, userRoute)
app.use(`/event`, eventRoute)
app.use(`/ticket`, ticketRoute)
app.use(`/auth`, auth)
app.use(`/seat`, seatRoute)   // ← TAMBAH INI
const tugas2Route = require(`./routes/tugas2.route`)
app.use(`/tugas2`, tugas2Route)
/** run server based on defined port */
app.listen(PORT, () => {
    console.log(`Server of Ticket Sales runs on port ${PORT}`)
})