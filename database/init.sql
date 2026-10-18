CREATE DATABASE IF NOT EXISTS cv_db;
USE cv_db;

CREATE TABLE IF NOT EXISTS persona (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    profesion VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS formacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    institucion VARCHAR(150) NOT NULL,
    anio VARCHAR(50) NOT NULL
);

INSERT INTO persona (nombre, profesion, descripcion) 
VALUES ('Madain Gutierrez', 'Ingeniero de Sistemas', 'Desarrollador Full Stack.');

INSERT INTO formacion (titulo, institucion, anio) 
VALUES 
('Diplomado en Desarrollo Full Stack', 'USIP', '2026'),
('Ingenieria de Sistemas', 'UDABOL', '2010 - 2015');