#====Create a database for the project===
DROP DATABASE IF EXISTS student_management_system; 
CREATE DATABASE IF NOT EXISTS student_management_system;

#====Use the created database====

USE student_management_system;

#====Create a table for students====

CREATE TABLE IF NOT EXISTS students (
 student_id INT AUTO_INCREMENT PRIMARY KEY,
 first_name VARCHAR(50) NOT NULL,
 last_name VARCHAR(50) NOT NULL,
 date_of_birth DATE,
 nic VARCHAR(20),
 email VARCHAR(100) UNIQUE NOT NULL
);

#====Create a table for programs====

CREATE TABLE IF NOT EXISTS programs (
 program_id INT AUTO_INCREMENT PRIMARY KEY,
 program_name VARCHAR(100) NOT NULL,
 program_type VARCHAR(100) NOT NULL
);

#====Create a table for student registrations====

CREATE TABLE IF NOT EXISTS registrations (
 registration_id INT AUTO_INCREMENT PRIMARY KEY,
 student_id INT,
 program_id INT,
 registration_date DATE,
 FOREIGN KEY (student_id) REFERENCES students(student_id),
 FOREIGN KEY (program_id) REFERENCES programs(program_id)
);
SHOW TABLES;
DESC students;

INSERT INTO students (first_name, last_name, date_of_birth, email,nic) VALUES
('John', 'Doe', '1995-08-15', 'john.doe@example.com', '2212');

INSERT INTO students (first_name, last_name, date_of_birth, email,nic) VALUES
('Jane', 'Smith', '1998-03-22', 'jane.smith@example.com', '2213');

INSERT INTO programs (program_name, program_type) VALUES
('Computer Science', 'Bachelor'),
('Data Science', 'Master');


SELECT * FROM students;
SELECT * FROM programs;