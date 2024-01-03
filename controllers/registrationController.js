const connectionPool = require('../db/DatabaseConnectivity');

const initializeRegisterUi = (req,resp)=>{
    connectionPool.getConnection((error,connection)=>{
        if (error) {
            throw error;
        }
        connection.query('SELECT * FROM registrations',(err,rows)=>{
            connection.release();
            if (!err) {
                resp.render('registration-info',{layout: 'registration-info-layout', rows});
            }
            else{
                console.log(err);
            }
            console.log(rows);
        });
    });
}
const newRegistrationForm = (req,resp)=>{

        resp.render('new-registration-form',{layout: 'registration-layout'});
}
const registrationPrg = (req,resp)=>{
    connectionPool.getConnection((error,connection)=>{
        if (error) {
            throw error;
        }

        const {registration_id,student_id,program_id,registration_date} = req.body;
    
        connection.query('INSERT INTO registrations VALUES (?,?,?,?)',
        [registration_id,student_id,program_id,registration_date],(err,rows)=>{
            connection.release();
            if (!err) {
                resp.render('new-registration-form',{layout: 'registration-layout', rows});
            }
            else{
                console.log(err);
            }
            console.log(rows);
        });
    });
}


module.exports = {
    initializeRegisterUi,newRegistrationForm,registrationPrg
}