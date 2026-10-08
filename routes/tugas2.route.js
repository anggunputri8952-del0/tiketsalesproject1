const express = require(`express`)
const router = express.Router()

const ongkirController = require(`../controllers/tugas2.controller`)

router.get(`/`, ongkirController.getAllOngkir)
router.get(`/city/:city_id`, ongkirController.getOngkirByCity)
router.post(`/`, ongkirController.createOngkir)
router.post(`/import`, ongkirController.importOngkir)
router.put(`/:id`, ongkirController.updateOngkir)
router.delete(`/:id`, ongkirController.deleteOngkir)

module.exports = router