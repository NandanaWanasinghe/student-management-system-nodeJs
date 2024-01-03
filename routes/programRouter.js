const express = require('express');
const router = express.Router();

const programController = require('../controllers/programController');

router.get('/program-form',programController.initializeProgramUi);
router.get('/new-program-form',programController.newProgramForm);
router.post('/create-programe',programController.createPrograme);
router.post('/search-programe',programController.findPrograme);
router.get('/delete-program/:program_id',programController.deleteProgrme);
router.get('/update-program-form/:program_id',programController.updatePrograme);
router.post('/update-programe',programController.modifyPrograme);





module.exports = router;