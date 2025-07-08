CREATE DATABASE IF NOT EXIST gestor_tareas
USE gestor_tareas;

CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    condicion ENUM('nuevo', 'de segunda mano', 'reacondicionado') NOT NULL,
    localizacion VARCHAR(50) NOT NULL,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO productos (nombre, precio, condicion, localizacion) VALUES
('PlayStation 5', 499.99, 'nuevo', 'Mexico'),
('Laptop Dell XPS 13', 899.99, 'reacondicionado', 'USA'),
('iPhone 13', 699.99, 'nuevo', 'Canada'),
('Monitor LG UltraGear', 299.99, 'de segunda mano', 'Mexico'),
('Teclado mecánico Logitech', 129.99, 'nuevo', 'USA'),
('Audífonos Sony WH-1000XM4', 349.99, 'reacondicionado', 'Canada'),
('Cámara Canon EOS M50', 579.99, 'de segunda mano', 'Mexico'),
('Nintendo Switch', 299.99, 'nuevo', 'USA'),
('Apple Watch Series 8', 399.99, 'nuevo', 'Canada'),
('Tablet Samsung Galaxy Tab S8', 649.99, 'reacondicionado', 'Mexico');

-- Estas podrían ser algunas consultas para verificar

--SELECT * FROM productos WHERE condicion = 'nuevo';

--SELECT * FROM productos ORDER BY precio DESC;

--SELECT nombre, precio FROM productos ORDER BY fecha_agregado DESC LIMIT 5;
