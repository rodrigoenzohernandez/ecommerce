-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 17-03-2021 a las 20:06:43
-- Versión del servidor: 8.0.23
-- Versión de PHP: 7.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ecommerce_database`
--
CREATE DATABASE IF NOT EXISTS `ecommerce_database` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ecommerce_database`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE IF NOT EXISTS `carrito` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `usuarioID` int NOT NULL,
  `total` float NOT NULL,
  `fechaCompra` datetime NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `estado` tinyint NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`ID`, `usuarioID`, `total`, `fechaCompra`, `fechaCreacion`, `estado`) VALUES
(5, 109, 23300, '2000-01-01 03:00:00', '2020-12-19 19:18:35', 1),
(6, 120, 6000, '2000-01-01 03:00:00', '2020-12-19 21:23:09', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito_producto`
--

CREATE TABLE IF NOT EXISTS `carrito_producto` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `carritoID` int NOT NULL,
  `productoID` int NOT NULL,
  `cantidadCarritoProducto` int NOT NULL,
  `preciocongelado` float NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrito_producto`
--

INSERT INTO `carrito_producto` (`ID`, `carritoID`, `productoID`, `cantidadCarritoProducto`, `preciocongelado`) VALUES
(11, 5, 1, 1, 1200),
(12, 5, 15, 2, 800),
(13, 5, 34, 1, 20500),
(14, 6, 14, 1, 900),
(15, 6, 5, 2, 2000),
(16, 6, 27, 1, 1100);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE IF NOT EXISTS `categoria` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ruta` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`ID`, `nombre`, `ruta`) VALUES
(1, 'Electricidad', 'electricidad.jpg'),
(2, 'Herramientas', 'tools.jpg'),
(3, 'Bazar', 'bazar.jpg'),
(4, 'Fijaciones', 'fijaciones.png'),
(5, 'Herrajes', 'herrajes.jpg'),
(6, 'Calefacción', 'gas.jpg'),
(7, 'Pinturas', 'pintura.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagen_producto`
--

CREATE TABLE IF NOT EXISTS `imagen_producto` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `productoID` int NOT NULL,
  `ruta` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagen_producto`
--

INSERT INTO `imagen_producto` (`ID`, `productoID`, `ruta`) VALUES
(1, 1, '1-antioxido.png'),
(2, 2, '2-barnizalba.png'),
(3, 3, '3-barnizcibel.png'),
(4, 4, '1-bordeadora.png'),
(5, 5, '2-CajaHerramientas.jfif'),
(6, 6, '3-carretilla.png'),
(7, 14, '1-alargue.png'),
(8, 15, '3-bornera.png'),
(9, 16, '2-tiradorbronce.jpg'),
(10, 17, '3-tiradormadera.png'),
(11, 18, '3-brocheplastico.jfif'),
(12, 19, '4-brochemadera.png'),
(13, 26, '1-calefonpvc.png'),
(14, 27, '2-calefonchapapintada.png'),
(15, 28, '3-calefonacero.jfif'),
(16, 29, '1-abrazadera.jfif'),
(17, 30, '2-arandelaplana.jfif'),
(18, 31, '3-bulontapacamara.jfif'),
(19, 33, '/imgProd-1607114534623.webp'),
(20, 13, 'Amoladora.jpeg'),
(21, 20, 'CestoBasura.webp'),
(22, 7, 'CintaMetrica.jpeg'),
(23, 8, 'CucharaAlbañil.jpeg'),
(24, 9, 'CutterBulit.webp'),
(25, 21, 'Embudo.jpeg'),
(26, 10, 'EngrampaBulit.jpeg'),
(27, 11, 'Escalera.jpeg'),
(28, 22, 'Fuenton.jpeg'),
(29, 12, 'HachaMano.webp'),
(30, 23, 'MateMadera.jpeg'),
(31, 25, 'RepTermo.jpeg'),
(32, 24, 'Termo.jpeg'),
(33, 34, '/imgProd-1608325972726.jpeg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

CREATE TABLE IF NOT EXISTS `marca` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ruta` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`ID`, `nombre`, `ruta`) VALUES
(1, 'Cibel', 'cibel.jpg'),
(2, 'Alba', 'alba.png'),
(3, 'Black & Decker', 'bd.png'),
(4, 'Generico', 'gen.jpg'),
(5, 'Cambre', 'cambre.png'),
(6, 'Lubritodo', 'lubri.jpg'),
(7, 'WD-40', 'wd40.jpg'),
(8, 'bulit', 'bulit.jpg'),
(9, 'Otras', 'Multi.jpeg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE IF NOT EXISTS `producto` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `subCategoriaID` int DEFAULT NULL,
  `marcaID` int DEFAULT NULL,
  `unidadMedidaID` int DEFAULT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `descripcion` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `estado` tinyint DEFAULT NULL,
  `modelo` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `temporada` tinyint DEFAULT NULL,
  `destacado` tinyint DEFAULT NULL,
  `envio` tinyint DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `stockMinimo` int DEFAULT NULL,
  `descuento` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`ID`, `subCategoriaID`, `marcaID`, `unidadMedidaID`, `nombre`, `precio`, `cantidad`, `descripcion`, `estado`, `modelo`, `temporada`, `destacado`, `envio`, `stock`, `stockMinimo`, `descuento`) VALUES
(1, 3, 2, 1, 'Antióxido Premium', 1200, 4, 'fondo sintético antióxido con excelente adherencia y buen poder anticorrosivo. Está elaborado con resinas sintéticas, pigmentos de color y anticorrosivos de características especiales, que proporciona', 1, 'AL01', 1, 1, 0, 1, 1, 0),
(2, 4, 2, 1, 'Barniz Alba', 2000, 4, 'Barniz Poliuretánico para Interiores Brillante. De gran dureza y resistencia a la abrasión y al uso diario. Excelente nivelación. Transparente, entonable con Tintas AkzoNobel para barnices hasta 60 cm', 1, '', 1, 0, 0, 5, 2, 0),
(3, 4, 1, 1, 'Barniz CIBEL', 1800, 4, 'Producto con alto contenido de sólidos, resinas de alta calidad, ideal para decorar y proteger todo tipo de maderas, de ambientes exteriores o interiores. Presenta alta resistencia al sol, nieve y llu', 1, '', 1, 0, 0, 0, 0, 0),
(4, 14, 4, 2, 'Bordeadora 500w', 20000, 1, 'Con la Bordeadora de Césped Eléctrica Tramontina AP1000T con Diámetro de Corte de 280 mm 1000 W 220 V, usted tendrá más agilidad en el momento de cortar el césped.\"', 0, '', 1, 1, 0, 0, 0, 0),
(5, 11, 3, 2, 'Caja de herramientas PVC 1234567', 2000, 1, 'Espectacular maletín con cajón con todas las herramientas que necesitas', 1, '', 0, 0, 0, 10, 5, 0),
(6, 11, 4, 2, 'Carretilla', 12000, 1, 'Carretilla Reforzada Construcción 75lts', 1, '', 0, 0, 0, 0, 0, 0),
(7, 11, 8, 3, 'Cinta metrica 5m', 800, 5, 'Cinta Metrica 5 Mts Profesional Reforzada', 1, '', 0, 1, 0, 20, 10, 0),
(8, 11, 8, 2, 'Cuchara de albañil comun', 300, 1, 'Frabricada en acero con un excelente mango de madera.', 1, '', 0, 0, 0, 0, 0, 0),
(9, 11, 8, 2, 'Cutter Bulit', 260, 1, 'Cutter totalmente reforzado, recubierto con goma para un mejor uso.', 1, '', 0, 0, 0, 0, 0, 0),
(10, 11, 8, 2, 'Engrampadora Bulit', 750, 1, 'Engrampadora metalica manual, incluye 100 grampas, utiliza grampas de 4 a 8 mm de altura y 13 mm de ancho.', 1, '', 0, 0, 0, 0, 0, 0),
(11, 11, 4, 2, 'Escalera 10 escalones', 600, 1, 'Escalera de pino con 10 escalones reforzados.', 1, '', 0, 0, 0, 3, 2, 0),
(12, 11, 3, 2, 'Hacha de mano', 550, 1, 'Hacha totalmente de acero con mango recubierto de plastico negro.', 1, '', 0, 0, 0, 0, 0, 0),
(13, 12, 3, 2, 'Amoladora de 7', 19000, 1, 'El disco tiene un diámetro de 115mm, Tiene interruptor de tecla. Velocidad máxima de rotación de 11000rpm. Herramienta versátil para lijar, pulir y cortar.', 1, '', 0, 0, 0, 0, 0, 0),
(14, 6, 5, 3, 'Alargue 3 m', 900, 3, 'Cable bipolar + tierra 3 x 0,75 mm2. Para trabajo pesado,uso interior. Potencia máxima 2200 W.', 1, '', 0, 0, 0, 0, 0, 0),
(15, 10, 5, 2, 'Bornera chica', 800, 1, 'Borneras diseñadas en función a la seguridad del instalador eléctrico , es la forma correcta practica rápida y segura para realizar derivaciones de conductores.', 1, '', 0, 0, 0, 0, 0, 0),
(16, 29, 4, 2, 'Tirador de bronce', 1500, 1, 'ideal Para Muebles De Cocina, Living y Toilette Manija De Alta Calidad Súper Delicada Al Tacto Y Muy Agradable A La Vista', 1, '', 0, 0, 0, 0, 0, 0),
(17, 29, 4, 2, 'Tirador de madera', 950, 1, 'Tirador De Madera Para Muebles Negro Caja Por 10 Unidades Únicas En Calidad En El Mercado Echa En Madera Terminación En Negro Ultra Resistente', 1, '', 0, 0, 0, 0, 0, 0),
(18, 17, 4, 2, 'Broche PVC', 120, 1, 'Para colgar cualquier tipo de ropa, mejor vida util que los de madera.', 1, '', 0, 0, 0, 0, 0, 0),
(19, 17, 4, 2, 'Broche madera', 130, 1, 'Broche de madera con mecanismo de metal, utli para colgar y secar cualquier tipo de ropal', 1, '', 0, 0, 0, 0, 0, 0),
(20, 16, 4, 2, 'Cesto de basura', 400, 1, 'Cesto de basura de plastico, con una capacidad en volumen de 12 L, con puertas vaiven para utilizar en el piso.', 1, '', 0, 0, 0, 0, 0, 0),
(21, 16, 4, 2, 'Embudo', 200, 1, 'Embudo de cocina irrompible 11cm.', 1, '', 0, 0, 0, 0, 0, 0),
(22, 16, 4, 2, 'Fuenton', 300, 1, 'Con manijas reforzadas, de 50L.', 1, '', 0, 0, 0, 0, 0, 0),
(23, 16, 4, 2, 'Mate Madera', 250, 1, 'Mate de madera recubierto con cuero.', 1, '', 0, 0, 0, 0, 0, 0),
(24, 16, 4, 2, 'Termo lumilagro', 750, 1, 'Termo lumilagro matero cafetero tapon cebador, interior de vidrio.', 1, '', 0, 0, 0, 0, 0, 0),
(25, 16, 4, 2, 'Repuesto termo', 500, 1, 'Repuesto de vidrio para termo lumilagro.', 1, '', 0, 0, 0, 2, 2, 0),
(26, 33, 4, 2, 'Calefon de PVC', 9000, 1, 'Calefón eléctrico Potencia: 1200 watts Capacidad: 25 litros Calefón plástico Bajo consumo Visor de nivel de agua incorporado al cuerpo del calefón Medidas: ancho 26,5 cm x alto 35 cm x profundidad 22,', 1, '', 0, 0, 0, 0, 0, 0),
(27, 33, 4, 2, 'Calefon de chapa pintada', 1100, 1, 'SIN LLAMA PILOTO mayor ahorro, Tiro Natural de 14 Lts./min., con encendido electrónico y doble sensor.', 1, '', 0, 0, 0, 0, 0, 0),
(28, 33, 4, 2, 'Calefon de acero inoxidable', 13500, 1, 'Encendido Piezoeléctrico. Alto rendimiento y máxima seguridad. Mínimo nivel de mantenimiento. Válvula de graduación progresiva para una exacta regulación de temperatura. Funciona con mínimo caudal y b', 1, '', 0, 0, 0, 0, 0, 0),
(29, 19, 4, 2, 'Abrazadera', 600, 1, 'Abrazadera PKD 30 (p/poste) En diámetros 120, 140, 160 y 180mm', 1, '', 0, 0, 0, 0, 0, 0),
(30, 20, 4, 2, 'Arandelas planas', 250, 100, 'Las medidas de las arandelas son desde 3mm a 76mm. Consultar por medidas especiales. MATERIAL: Acero al carbono SAE 1010', 1, '', 0, 0, 0, 0, 0, 0),
(31, 20, 4, 2, 'Bulon tapacamara', 300, 1, 'Tapa camara acero inoxidable 60 x 60 cm sin bulones.', 1, '', 0, 0, 0, 3, 4, 0),
(33, 2, 2, 1, 'Albalatex Latex Interior Blanco Mate', 5517, 10, 'Pintura al látex mate para interiores\r\nColor: Blanco\r\nAcabado: Mate\r\nSecado: Secado al tacto: 1 hora. Secado entre manos: 3 a 4 hs.\r\nCantidad de manos: 2 a 3\r\nAplicación: Pincel, rodillo o soplete', 0, 'Albalatex', 1, 1, 1, 100, 50, 0),
(34, 13, 9, 2, 'Taladro percutor / atornillador', 20500, 1, 'Batería de 2.0Ah ION-LI 20v Max * - BRUSHLESS para todas las aplicaciones de fijación y perforación\r\n16 posiciones de Torque para fijación constante en madera, metal y plásticos\r\nCaja con engranajes m', 1, 'DCD796D2', 0, 1, 0, 5, 2, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subcategoria`
--

CREATE TABLE IF NOT EXISTS `subcategoria` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `categoriaID` int NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `subcategoria`
--

INSERT INTO `subcategoria` (`ID`, `categoriaID`, `nombre`) VALUES
(1, 7, 'Diluyentes'),
(2, 7, 'Interior'),
(3, 7, 'Exterior'),
(4, 7, 'Maderas'),
(5, 7, 'Jardineria'),
(6, 1, 'Alargues'),
(7, 1, 'Cables'),
(8, 1, 'Cintas aisladoras'),
(9, 1, 'Enchufes'),
(10, 1, 'Termicas'),
(11, 2, 'Manuales'),
(12, 2, 'Electricas'),
(13, 2, 'Inalambricas'),
(14, 2, 'Jardin'),
(15, 2, 'Mecanicas'),
(16, 3, 'Cocina'),
(17, 3, 'Decoracion'),
(18, 4, 'Madera'),
(19, 4, 'Colgar'),
(20, 4, 'Metal'),
(21, 4, 'Techos'),
(22, 4, 'Tabiqueria'),
(23, 4, 'Concreto'),
(24, 4, 'Siliconas'),
(25, 4, 'Adhesivos'),
(26, 4, 'Cintas Aisladoras'),
(27, 5, 'Cerraduras'),
(28, 5, 'Portones'),
(29, 5, 'Tiradores y Manijas'),
(30, 5, 'Puertas y Ventanas'),
(31, 5, 'Muebles y Placards'),
(32, 6, 'Estufas'),
(33, 6, 'Calefones'),
(34, 6, 'Termotanques');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidad_medida`
--

CREATE TABLE IF NOT EXISTS `unidad_medida` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `unidad_medida`
--

INSERT INTO `unidad_medida` (`ID`, `nombre`) VALUES
(1, 'Litros'),
(2, 'Unidad'),
(3, 'Metros'),
(4, 'Kg.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `apellido` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `admin` tinyint NOT NULL,
  `avatar` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `﻿usuarioID;nombre;apellido;email;password;telefono;admin;avatar` varchar(1024) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ID`, `nombre`, `apellido`, `email`, `password`, `telefono`, `admin`, `avatar`, `﻿usuarioID;nombre;apellido;email;password;telefono;admin;avatar`) VALUES
(1, 'admin', 'admin', 'admin@fh.com', '$2b$10$fPQfjRIY9lVjklUy5E2yjOH8WsJnqhKgzT7XUD9YBJTO5/oINW6lC', NULL, 1, NULL, NULL),
(109, 'user', 'user', 'user@fh.com', '$2b$10$K721NyFjCPYAEJnlOH1gkOZRZ9gvsV13vFtEZ/Nes2R1ec8RSZmOC', NULL, 0, NULL, NULL),
(118, 'Juan Pablo', 'Crespi', 'juan@hotmail.com', '$2b$10$a7T55HuLqxsmzE./aws7wO8csvj4oHYYtoLg7zKKveMVJ2MX8Ftmy', NULL, 0, NULL, NULL),
(120, 'Mariano', 'Zenarola', 'mariano@hotmail.com', '$2b$10$bowfq9I0G4ZzQ3ihr/XJ3uGvp5kcBYMlbUgTK9uJNy.HutxT6dwg.', NULL, 0, NULL, NULL),
(121, 'Cecilia', 'Quesada', 'ceci@hotmail.com', '$2b$10$fGOpET1a91U27G8np4W2qOuFUexbRYgjrK4uvHF4B3xks9Ldp1VN2', NULL, 0, NULL, NULL),
(122, 'Rodrigo', 'Hernandez', 'hernandez@eudaimonia.com.ar', '$2b$10$sYtEcryMvZT9HBc7YAohAO9WEztM5l6BfPQglMtdFbQ9K3JzYT2g2', NULL, 0, NULL, NULL),
(123, 'Lucas', 'Hernandez', 'lucas@gmail.com', '$2b$10$ERggH4FZ9cqVyRSOyZ4jOeGp2RKuY7zj2jkPpajU8AfFrbX98CEdS', NULL, 0, NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
