const { Ongkir } = require('../models');

// GET semua data ongkir
exports.getAllOngkir = (req, res) => {
  Ongkir.findAll()
    .then(data => res.status(200).json({ status: 'success', data }))
    .catch(err => res.status(500).json({ status: 'error', message: err.message }));
};

// GET ongkir by city_id
exports.getOngkirByCity = (req, res) => {
  const { city_id } = req.params;
  Ongkir.findAll({ where: { city_id } })
    .then(data => {
      if (!data.length) {
        return res.status(404).json({ status: 'error', message: 'City not found' });
      }
      res.status(200).json({ status: 'success', data });
    })
    .catch(err => res.status(500).json({ status: 'error', message: err.message }));
};

// POST tambah data ongkir manual
exports.createOngkir = (req, res) => {
  const { subdistrict_id, province_id, province, city_id, city, type, subdistrict_name } = req.body;
  Ongkir.create({ subdistrict_id, province_id, province, city_id, city, type, subdistrict_name })
    .then(data => res.status(201).json({ status: 'success', data }))
    .catch(err => res.status(500).json({ status: 'error', message: err.message }));
};

// PUT update data ongkir
exports.updateOngkir = (req, res) => {
  const { id } = req.params;
  Ongkir.update(req.body, { where: { id } })
    .then(([updated]) => {
      if (!updated) {
        return res.status(404).json({ status: 'error', message: 'Data not found' });
      }
      res.status(200).json({ status: 'success', message: 'Updated successfully' });
    })
    .catch(err => res.status(500).json({ status: 'error', message: err.message }));
};

// DELETE data ongkir
exports.deleteOngkir = (req, res) => {
  const { id } = req.params;
  Ongkir.destroy({ where: { id } })
    .then(deleted => {
      if (!deleted) {
        return res.status(404).json({ status: 'error', message: 'Data not found' });
      }
      res.status(200).json({ status: 'success', message: 'Deleted successfully' });
    })
    .catch(err => res.status(500).json({ status: 'error', message: err.message }));
};

// POST import data dari file ongkir.json (bulk insert)
exports.importOngkir = (req, res) => {
  const ongkirData = require('../ongkir.json'); // sesuaikan path
  const results = ongkirData.rajaongkir.results;

  const formatted = results.map(item => ({
    subdistrict_id: item.subdistrict_id,
    province_id: item.province_id,
    province: item.province,
    city_id: item.city_id,
    city: item.city,
    type: item.type,
    subdistrict_name: item.subdistrict_name
  }));

  Ongkir.bulkCreate(formatted)
    .then(data => res.status(201).json({ status: 'success', total: data.length }))
    .catch(err => res.status(500).json({ status: 'error', message: err.message }));
};