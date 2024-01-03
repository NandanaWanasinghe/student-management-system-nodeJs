const connectionPool = require('../db/DatabaseConnectivity');

const initializeUi=(req,resp)=>{
    resp.render('home', { layout: 'main' });  
}

const initializeUiStudent = (req,resp)=>{
    connectionPool.getConnection((error, connection)=>{
        if(error){
            throw error;
        }

        const sql ="SELECT * FROM students";
        connection.query(sql,(err,rows)=>{

            connection.release();

            if(!err){
                resp.render('students-form', {layout: 'students-layout', rows}); 
            }else{
                console.log(err);
            }

            console.log(rows);

        });

    });
    
}

const newStudentForm = (req,resp)=>{
    resp.render('new-student-form', {layout: 'students-layout'})
}

const createStudent = (req,resp)=>{
    connectionPool.getConnection((error,connection)=>{
        if (error) {
            throw error;
        }
        const {student_id,first_name,last_name,date_of_birth,email,nic} = req.body;

        connection.query('INSERT INTO students VALUES(?,?,?,?,?,?)',
        [student_id,first_name,last_name,date_of_birth,nic,email],(err,rows)=>{
            connection.release();
            if(!err){
                resp.render('new-student-form', {layout: 'students-layout', rows});
            }else{
                console.log(err);
            }
            console.log(rows);
        });
    });
}
const findCustomer = (req,resp)=>{
    connectionPool.getConnection((error, connection)=>{
        if(error){
            throw error;
        }

        let serchText = req.body.text;
        
        connection.query('SELECT * FROM students WHERE first_name LIKE ? OR last_name LIKE ?',
        ['%'+serchText+'%','%'+serchText+'%'],(err,rows)=>{

            connection.release();

            if(!err){
                resp.render('students-form', {layout: 'students-layout', rows}); 
            }else{
                console.log(err);
            }

            console.log(rows);

        });

    });
    
}
const updateStudent = (req,resp)=>{
    connectionPool.getConnection((error, connection)=>{
        if(error){
            throw error;
        }
        
        connection.query('SELECT * FROM students WHERE student_id = ?',
        [req.params.student_id],(err,rows)=>{

            connection.release();
            const data =rows[0];
            if(!err){
                resp.render('update-student-form', { layout: 'student-update-layout', students: data });
            }else{
                console.log(err);
            }

            console.log(rows[0]);

        });

    });
    
}
const modifyStudent = (req,resp)=>{
    connectionPool.getConnection((error, connection)=>{
        if(error){
            throw error;
        }

        const {student_id,first_name,last_name,date_of_birth,email,nic} = req.body;
        
        connection.query('UPDATE students SET first_name=?, last_name=?, date_of_birth=?, email=?, nic=? WHERE student_id=?',
        [first_name,last_name,date_of_birth,email,nic,student_id],(err,rows)=>{

            connection.release();
        
            if(!err){
                resp.render('update-student-form', {layout: 'student-update-layout'}); 
            }else{
                console.log(err);
            }

            console.log(rows[0]);

        });

    });
    
}

const deleteStudent=(req,resp)=>{
    connectionPool.getConnection((error, connection)=>{
        if(error){
            throw error;
        }
        connection.query('DELETE FROM students WHERE student_id=?',
        [req.params.student_id],(err,rows)=>{
            connection.release();
            if(!err){
                resp.redirect('/students-form');
            }else{
                console.log(err);
            }
        });
    });
}

module.exports = {
    initializeUi,initializeUiStudent,newStudentForm,createStudent,findCustomer,updateStudent,modifyStudent,deleteStudent
}