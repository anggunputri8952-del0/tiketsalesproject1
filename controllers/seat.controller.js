'use strict';

/** load model for `seats` table */
const seatModel = require('../models/index').seat

/** load Operation from Sequelize */
const Op = require('sequelize').Op


/** create function for read all data */
exports.getAllSeat = async (request, response) => {

    /** call findAll() to get all data */
    let seats = await seatModel.findAll()

    return response.json({
        success: true,
        data: seats,
        message: `All Seats have been loaded`
    })
}


/** create function for filter */
exports.findSeat = async (request, response) => {

    /** define keyword to find data */
    let keyword = request.params.key

    /** call findAll() within where clause
     * to find data based on keyword
     */
    let seats = await seatModel.findAll({
        where: {
            [Op.or]: [
                { rowNum: { [Op.substring]: keyword } }
            ]
        }
    })

    return response.json({
        success: true,
        data: seats,
        message: `All Seats have been loaded`
    })
}


/** create function to add new seat */
exports.addSeat = (request, response) => {

    /** prepare data from request */
    let newSeat = {
        eventID: request.body.eventID,
        rowNum: request.body.rowNum,
        seatNum: request.body.seatNum,
        status: request.body.status
    }

    /** execute inserting data to seat's table */
    seatModel.create(newSeat)
        .then(result => {

            /** if insert's process success */
            return response.json({
                success: true,
                data: result,
                message: `New Seat has been inserted`
            })
        })

        .catch(error => {

            /** if insert's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}


/** create function to update seat */
exports.updateSeat = async (request, response) => {

    /** store selected seat ID that will update */
    let seatID = request.params.id

    /** prepare seat's data that will update */
    let dataSeat = {
        eventID: request.body.eventID,
        rowNum: request.body.rowNum,
        seatNum: request.body.seatNum,
        status: request.body.status
    }

    /** execute update data based on defined id seat */
    seatModel.update(dataSeat, {
        where: {
            seatID: seatID
        }
    })

        .then(result => {

            /** if update's process success */
            return response.json({
                success: true,
                message: `Data Seat has been updated`
            })
        })

        .catch(error => {

            /** if update's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}


/** create function to delete seat */
exports.deleteSeat = async (request, response) => {

    /** store selected seat's ID that will be delete */
    const seatID = request.params.id

    /** execute delete data based on defined id seat */
    seatModel.destroy({
        where: {
            seatID: seatID
        }
    })

        .then(result => {

            /** if delete's process success */
            return response.json({
                success: true,
                message: `Data Seat has been deleted`
            })
        })

        .catch(error => {

            /** if delete's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}

/** OPSI 1 — ringkasan angka doang */
exports.getStockSummary = async (request, response) => {
    try {
        const eventID = request.params.id

        const totalSeat = await seatModel.count({ where: { eventID } })
        const terisi = await seatModel.count({ where: { eventID, status: true } })
        const sisa = totalSeat - terisi

        return response.json({
            success: true,
            data: {
                eventID,
                capacity: totalSeat,
                terjual: terisi,
                sisa
            },
            message: `Ringkasan stock tiket berhasil dimuat`
        })
    } catch (error) {
        return response.json({ success: false, message: error.message })
    }
}

/** OPSI 2 — detail per kursi (sudah ada, dari getSeatsByEvent) */
exports.getSeatsByEvent = async (request, response) => {
    try {
        const eventID = request.params.id

        const seats = await seatModel.findAll({
            where: { eventID },
            attributes: ['seatID', 'rowNum', 'seatNum', 'status']
        })

        return response.json({
            success: true,
            data: seats,
            message: `Daftar kursi untuk event ${eventID} berhasil dimuat`
        })
    } catch (error) {
        return response.json({ success: false, message: error.message })
    }
}