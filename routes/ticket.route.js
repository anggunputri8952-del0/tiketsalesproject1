const express = require(`express`)
const app = express()
app.use(express.json())

const ticketController = require(`../controllers/ticket.controller`)
const { authorize } = require('../controllers/auth.controller')
const { IsUser, IsAdmin } = require('../middlewares/role-validation')

/** tambah tiket baru — user yang login */
app.post("/", authorize, IsUser, ticketController.addTicket)

app.get("/", authorize, ticketController.getTicket)

app.get("/statistik/event", authorize, IsAdmin, ticketController.getTicketCountByEvent)
app.get("/statistik/top-event", authorize, IsAdmin, ticketController.getTopEvents)
app.get("/:id", authorize, ticketController.ticketByID)

app.delete("/:id", authorize, ticketController.cancelTicket)

module.exports = app