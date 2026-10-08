/** load model */
const seatModel = require(`../models/index`).seat
const userModel = require(`../models/index`).user
const eventModel = require(`../models/index`).event
const ticketModel = require(`../models/index`).ticket

/** load Operation from  Sequelize  */
const Op = require(`sequelize`).Op
/** create function for add new ticket */
exports.addTicket = async (request, response) => {
    /** prepare date for bookedDate */
    const today = new Date()
    const bookedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`

    /** prepare data from request */
    const { eventID, userID, seats } = request.body;

    try {
                // Create seat records for the chosen seats
        const seatIDs = await Promise.all(seats.map(async seat => {
          const { rowNum, seatNum } = seat;
          const createdSeat = await seatModel.create({
            eventID,
            rowNum,
            seatNum,
            status: 'true'
          });
          return createdSeat.seatID;
        }));
    
        // Create ticket records associating the chosen seats
        const tickets = await ticketModel.bulkCreate(seatIDs.map(seatID => ({
          eventID,
          userID,
          seatID,
          bookedDate
        })));
    
        response.status(201).json(tickets);
      } catch (error) {
        return response.json({
            success: false,
            message: error.message
        })
      }
}


/** create function for filter ticket by ID */
exports.ticketByID = async (request, response) => {
    /** define ticketID to find data */
    let ticketID = request.params.id

    /** call findAll() within where clause and operation 
     * to find data based on ticketID  */
    let tickets = await ticketModel.findAll({
        where: {
            ticketID: { [Op.substring]: ticketID } 
        },
        include: [
            { model: eventModel, attributes: ['eventName','eventDate','venue']},
            { model: userModel, attributes: ['firstName', 'lastName','email']},
            { model: seatModel, attributes: ['rowNum', 'seatNum']},
        ]
    })
    return response.json({
        success: true,
        data: tickets,
        message: `All tickets have been loaded`
    })
}

exports.getTicket = async (request, response) => {
    try {
        const isAdmin = request.user.role === 'admin'

        let tickets = await ticketModel.findAll({
            where: isAdmin ? {} : { userID: request.user.userID },
            include: [
                { model: eventModel, attributes: ['eventName','eventDate','venue']},
                { model: userModel, attributes: ['firstName', 'lastName']},
                { model: seatModel, attributes: ['rowNum', 'seatNum']},
            ]
        })

        return response.json({
            success: true,
            data: tickets,
            message: isAdmin
                ? `All tickets have been loaded`
                : `Ticket milikmu berhasil dimuat`
        })
    } catch (error) {
        return response.json({
            success: false,
            message: error.message
        })
    }
}

   /** get total tickets sold for each event */
exports.getTicketCountByEvent = async (request, response) => {
    try {
        const tickets = await ticketModel.findAll({
            attributes: [
                'eventID',
                [ticketModel.sequelize.fn('COUNT', ticketModel.sequelize.col('ticketID')), 'totalTicket']
            ],
            group: ['eventID']
        })

        return response.json({
            success: true,
            data: tickets,
            message: `Total tickets for each event have been loaded`
        })
    } catch (error) {
        return response.json({
            success: false,
            message: error.message
        })
    }
}

exports.getTopEvents = async (request, response) => {
    try {
        const today = new Date();

        const tickets = await ticketModel.findAll({  
            attributes: [
                'eventID',
                [ticketModel.sequelize.fn('COUNT', ticketModel.sequelize.col('ticketID')), 'totalTicket']
            ],
            include: [{
                model: eventModel,
                attributes: ['eventName', 'eventDate', 'venue'],
                 where: {
                    eventDate: { [Op.gte]: today }
                }
            }],
            group: ['eventID', 'event.eventID'],
            order: [[ticketModel.sequelize.literal('totalTicket'), 'DESC']],
            limit: 5,
            subQuery: false
        })

        return response.json({
            success: true,
            data: tickets,
            message: `Top 5 events with the most tickets sold have been loaded`
        })
    } catch (error) {
        return response.json({
            success: false,
            message: error.message
        })
    }
}


exports.cancelTicket = async (request, response) => {
    try {
        const ticketID = request.params.id

        /** cari tiketnya dulu */
        const ticket = await ticketModel.findOne({ where: { ticketID } })

        if (!ticket) {
            return response.status(404).json({
                success: false,
                message: `Ticket tidak ditemukan`
            })
        }

        /** cek: kalau bukan admin, tiket harus milik sendiri */
        const isAdmin = request.user.role === 'admin'
        if (!isAdmin && ticket.userID !== request.user.userID) {
            return response.status(403).json({
                success: false,
                message: `Kamu tidak punya akses membatalkan tiket ini`
            })
        }

        /** kembalikan status kursi jadi available */
        await seatModel.update(
            { status: false },
            { where: { seatID: ticket.seatID } }
        )

        /** hapus tiketnya */
        await ticketModel.destroy({ where: { ticketID } })

        return response.json({
            success: true,
            message: `Ticket berhasil dibatalkan`
        })
    } catch (error) {
        return response.json({
            success: false,
            message: error.message
        })
    }
}