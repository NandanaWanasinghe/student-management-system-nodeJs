const connectionPool = require('../db/DatabaseConnectivity');

const initializeProgramUi = (req,resp)=>{
    connectionPool.getConnection((error,connection)=>{
        if(error){
            throw error;
        }
        connection.query('SELECT * FROM programs',(err,rows)=>{
            connection.release();
            if(!err){
                resp.render('program-form', {layout: 'program-layout', rows});
            }
            else{
                console.log(err);
            }
            console.log(rows);
        });
    });
}
const newProgramForm = (req,resp)=>{
    resp.render('new-program-form', {layout: 'program-layout'})
}
const createPrograme = (req,resp)=>{
    connectionPool.getConnection((error,connection)=>{
        if(error){
            throw error;
        }

        const {program_id,program_name,program_type} = req.body;

        connection.query('INSERT INTO programs VALUES (?,?,?)',
        [program_id,program_name,program_type],(err,rows)=>{

            connection.release();
            if(!err){
                resp.render('new-program-form', {layout: 'program-layout', rows});
            }
            else{
                console.log(err);
            }
            console.log(rows);
        });
    });
}
const findPrograme = (req,resp)=>{
    connectionPool.getConnection((error,connection)=>{
        if(error){
            throw error;
        }

        let searchPrograme = req.body.text;

        connection.query('SELECT * FROM programs WHERE program_name LIKE ? OR program_type LIKE ?',
        ['%'+searchPrograme+'%','%'+searchPrograme+'%'],(err,rows)=>{

            connection.release();
            if(!err){
                resp.render('program-form', {layout: 'program-layout', rows});
            }
            else{
                console.log(err);
            }
            console.log(rows);
        });
    });
}
const deleteProgrme = (req,resp)=>{
    connectionPool.getConnection((error,connection)=>{
        if(error){
            throw error;
        }

        connection.query('DELETE FROM programs WHERE program_id=?',
        [req.params.program_id],(err,rows)=>{

            connection.release();
            if(!err){
                resp.redirect('/program-form');
            }
            else{
                console.log(err);
            }
            
        });
    });
}
const updatePrograme = (req,resp)=>{
    connectionPool.getConnection((error,connection)=>{
        if(error){
            throw error;
        }

        connection.query('SELECT * FROM programs WHERE program_id = ?',
        [req.params.program_id],(err,rows)=>{

            connection.release();
            const data = rows[0];
            if(!err){
                resp.render('update-programe-form', {layout: 'program-layout', programs:data});
            }
            else{
                console.log(err);
            }
            console.log(rows[0]);
        });
    });
}
const modifyPrograme = (req,resp)=>{
    connectionPool.getConnection((error,connection)=>{
        if(error){
            throw error;
        }

        const {program_id,program_name,program_type} = req.body;

        connection.query('UPDATE programs SET program_name=?, program_type=? WHERE program_id=?',
        [program_name,program_type,program_id],(err,rows)=>{

            connection.release();
    
            if(!err){
                resp.render('update-programe-form', {layout: 'program-layout'});
            }
            else{
                console.log(err);
            }
            const data = rows[0];
        });
    });
}

module.exports = {
            initializeProgramUi,newProgramForm,createPrograme,findPrograme,deleteProgrme,updatePrograme,modifyPrograme
}