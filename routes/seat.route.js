const express = require(`express`);
const app = express();
const seatController = require(`../controllers/seat.controller`);
const { authorize } = require('../controllers/auth.controller')

app.use(express.json());

app.get(`/`, seatController.getAllSeat);
app.get(`/:key`, seatController.findSeat);
app.get('/event/:id/summary', authorize, seatController.getStockSummary)
app.get('/event/:id', authorize, seatController.getSeatsByEvent)
app.post(`/`, seatController.addSeat);
app.put(`/:id`, seatController.updateSeat);
app.delete(`/:id`, seatController.deleteSeat);

module.exports = app;