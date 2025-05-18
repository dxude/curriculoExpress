
const express = require('express');
const router = express.Router();
const certificationController = require('../controllers/certificationsController');

router.get('/', certificationController.getAllCertifications);
router.get('/:id', certificationController.getCertificationById);
router.post('/', certificationController.createCertification);
router.put('/:id', certificationController.updateCertification);
router.delete('/:id', certificationController.deleteCertification);
module.exports = router;