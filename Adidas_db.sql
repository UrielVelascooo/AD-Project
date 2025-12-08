CREATE DATABASE adidas_db;

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  telefono VARCHAR(15),
  password VARCHAR(255),
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  precio DECIMAL(10,2),
  imagen TEXT,
  categoria VARCHAR(50)
);
CREATE TABLE carrito (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuarios(id),
  producto_id INT REFERENCES productos(id),
  cantidad INT
);
CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuarios(id),
  total DECIMAL(10,2),
  metodo_pago VARCHAR(50),
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE pedido_detalle (
  id SERIAL PRIMARY KEY,
  pedido_id INT REFERENCES pedidos(id),
  producto_id INT REFERENCES productos(id),
  cantidad INT,
  precio DECIMAL(10,2)
);

-- Sentencia para crear la tabla 'productos' en la base de datos 'adidas_db'
-- Se asume que no existe un schema específico más allá de la base de datos.
CREATE TABLE productos (
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    img VARCHAR(500),
    type VARCHAR(50) NOT NULL  -- Para diferenciar entre 'shoes' (calzado) y 'clothes' (vestimenta)
);

---

-- Inserción de datos de Zapatos (Shoes)
INSERT INTO productos (nombre, precio, imagen, categoria) VALUES
('Runing', 2499, 'https://cdn5.coppel.com/pr/8856552-1.jpg', 'shoes'),
('Forum Low', 1799, 'https://assets.adidas.com/images/w_600%2Cf_auto%2Cq_auto/836f18ee57e441d8938aaf1201323358_9366/Forum_Low_CL_Shoes_White_ID6858_01_standard.jpg', 'shoes'),
('Terrex Free Hiker', 2799, 'https://assets.adidas.com/images/w_383%2Ch_383%2Cf_auto%2Cq_auto%2Cfl_lossy%2Cc_fill%2Cg_auto/b78afc29b01841e6ba681b044ca1ccf8_9366/terrex-free-hiker-2.0-gore-tex-hiking-shoes.jpg', 'shoes'),
('Campus', 1299, 'https://assets.adidas.com/images/w_600%2Cf_auto%2Cq_auto/ba4b059ec42b407cb21eaf7b00924da6_9366/Campus_00s_Shoes_White_GY0042_01_standard.jpg', 'shoes'),
('Samba OG', 1599, 'https://assets.adidas.com/images/e_trim%3AEAEEEF/c_lpad%2Cw_iw%2Ch_ih/b_rgb%3AEAEEEF/w_180%2Cf_auto%2Cq_auto%2Cfl_lossy%2Cc_fill%2Cg_auto/783d87b545b044a88f4325575d0f14cc_9366/adidas_x_Jeremy_Scott_Samba_OG_Shoes_Black_JQ8835_00_plp_standard.jpg', 'shoes'),
('NMD - color variante', 1999, 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/bf31c4a42bfa42b9b1c6507b235b3807_9366/NMD_R1_Shoes_Beige_IF3495_01_standard.jpg', 'shoes');

---

-- Inserción de datos de Ropa (Clothes)
INSERT INTO productos (nombre, precio, imagen, categoria) VALUES
('Playera Essentials', 399, 'https://www.innovasport.com/medias/IS-HK0264-GS-1.jpg?context=bWFzdGVyfGltYWdlc3w2Nzk2OXxpbWFnZS9qcGVnfGFXMWhaMlZ6TDJoaU9DOW9Nek12TVRJME16RTRORFF3TVRZeE5UZ3VhbkJufGIyYWY4Y2Q5ZjE1MzQ5NGI0YWY4ZThlNmFjOTgxYzA5ZTZiZTcyOGFiOTFhMTc0MDE4MTZmYzFhNTVkN2ZjMGY', 'clothes'),
('Sudadera Hoodie', 899, 'https://assets.adidas.com/images/w_600%2Cf_auto%2Cq_auto%2Cfl_lossy%2Cc_fill%2Cg_auto/920aea967b7340c5a6464462f8ca186f_9366/Essentials_3-Stripes_Fleece_Hoodie_Black_JD1870_21_model.jpg', 'clothes'),
('Short Deportivo', 299, 'https://assets.adidas.com/images/w_600%2Cf_auto%2Cq_auto%2Cfl_lossy%2Cc_fill%2Cg_auto/8b1b63ab238244e789394ef549cf8dfc_9366/Designed-for-Training_3-Stripes_Shorts_Black_JE5682_21_model.jpg', 'clothes'),
('Pantalón Jogger', 699, 'https://m.media-amazon.com/images/I/71-VVEW5fGL._AC_SX522_.jpg', 'clothes'),
('Chamarra Ligera', 1299, 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/db342cc756c549309466278bab9bd398_9366/MEX_M_JKT_M_Beige_JY7593_HM1.jpg', 'clothes'),
('Calcetines Pack', 149, 'https://m.media-amazon.com/images/I/81fUAUMiA7L._AC_SX569_.jpg', 'clothes'),
('Gorra', 199, 'https://m.media-amazon.com/images/I/71B3ZFOz96L._AC_SX569_.jpg', 'clothes');

INSERT INTO usuarios (nombre, email, telefono, password)
VALUES ('Uriel', 'uriel@gmail.com', '5512345678', '4816');


INSERT INTO pedidos (usuario_id, total, metodo_pago)
VALUES (1, 3297, 'tarjeta');

INSERT INTO pedido_detalle (pedido_id, producto_id, cantidad, precio)
VALUES (1, 2, 1, 1799);


