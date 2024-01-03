const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');

router.get('/',studentController.initializeUi);
router.get('/students-form',studentController.initializeUiStudent);
router.get('/new-student-form',studentController.newStudentForm);
router.post('/create-student',studentController.createStudent);
router.post('/search-student',studentController.findCustomer);
router.get('/update-student-form/:student_id',studentController.updateStudent);
router.post('/update-student',studentController.modifyStudent);
router.get('/delete-student/:student_id',studentController.deleteStudent);



module.exports = router;