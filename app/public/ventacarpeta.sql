-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-09-2024 a las 14:36:55
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ventacarpeta`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `telefono` int(15) NOT NULL,
  `dni` int(15) NOT NULL,
  `metodo_pago` varchar(30) NOT NULL,
  `id_vehiculo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `nombre`, `apellido`, `telefono`, `dni`, `metodo_pago`, `id_vehiculo`) VALUES
(1, 'Maria', 'lopez', 1182345678, 42345678, 'Tarjeta de crédito', 7),
(2, 'Oscar', 'Martinez', 1159876543, 37654321, 'Efectivo', 3),
(3, 'Cristian', 'Martegani', 1172345678, 23456789, 'Transferencia', 14),
(4, 'Lorena', 'Pinto', 1103456789, 34567890, 'Tarjeta de débito', 9),
(5, 'Federico', 'Hernández', 1194567890, 45678901, 'Efectivo', 20),
(6, 'Rocio', 'Zeballos', 1135678901, 26789012, 'Transferencia', 2),
(7, 'Hernan', 'Muños', 1156789012, 37890123, 'Tarjeta de crédito', 13),
(8, 'Sofia', 'Benedetto', 1117890123, 28901234, 'Transferencia', 11),
(9, 'Jose', 'Ramos', 1128901234, 29012345, 'Efectivo', 18),
(10, 'Javier', 'Milei', 1179012345, 20123456, 'Tarjeta de débito', 15),
(11, 'Ricardo', 'Zenon', 1100123456, 32345678, 'Transferencia', 4),
(12, 'Fabian', 'Ortega', 1134234567, 33456789, 'Tarjeta de crédito', 6),
(13, 'Lucia', 'Ramírez', 1162345678, 34567890, 'Transferencia', 10),
(14, 'Matias', 'Jiménez', 1153456789, 45678901, 'Efectivo', 8),
(15, 'Joel', 'Santos', 1124567890, 46789012, 'Tarjeta de débito', 12),
(16, 'Lucía', 'Ortega', 1175678901, 47890123, 'Transferencia', 5),
(17, 'Martín', 'Lema', 1146789012, 48901234, 'Tarjeta de crédito', 17),
(18, 'Gabriela', 'Benavidez', 1187890123, 40012345, 'Transferencia', 19),
(19, 'Oscar', 'Vietto', 1188901234, 20123456, 'Efectivo', 16),
(20, 'Ambar', 'Calderon', 1123012345, 19111213, 'Tarjeta de débito', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `id_empleado` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `dni` int(15) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefono` int(15) NOT NULL,
  `contrasena` varchar(350) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `id_grupo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`id_empleado`, `nombre`, `apellido`, `dni`, `email`, `telefono`, `contrasena`, `id_rol`, `id_grupo`) VALUES
(1, 'Juan', 'Pérez', 22399678, 'juan@gmail.com', 1112345678, 'juan', 1, 2),
(2, 'María', 'García', 23450079, 'maria@gmail.com', 1113456789, 'maria', 2, 3),
(3, 'Carlos', 'López', 34067890, 'carlos@gmail.com', 1114567890, 'carlos', 3, 4),
(4, 'Ana', 'Martínez', 40558901, 'ana@gmail.com', 1115678901, 'ana', 4, 5),
(5, 'Luis', 'Hernández', 26744012, 'luis@gmail.com', 1106789012, 'luis', 1, 3),
(6, 'Laura', 'Gómez', 27810123, 'laura@gmail.com', 1137890123, 'laura', 2, 4),
(7, 'Pedro', 'Álvarez', 38901231, 'pedro@gmail.com', 1199901234, 'pedro', 3, 2),
(8, 'Sofia', 'Morales', 29012344, 'sofia@gmail.com', 1174012345, 'sofia', 4, 5),
(9, 'Jorge', 'Ramos', 30123459, 'jorge@gmail.com', 1123123456, 'jorge', 1, 4),
(10, 'Isabel', 'Flores', 20123436, 'isabel@gmail.com', 1122234567, 'isabel', 2, 5),
(11, 'Ricardo', 'Vega', 31232567, 'ricardo@gmail.com', 1167345678, 'ricardo', 3, 3),
(12, 'Carmen', 'Ruiz', 32345671, 'carmen@gmail.com', 1147456789, 'carmen', 4, 2),
(13, 'Andrés', 'Ramírez', 23456729, 'andres@gmail.com', 1149567890, 'andres', 1, 5),
(14, 'Elena', 'Jiménez', 34567000, 'elena@gmail.com', 1188678901, 'elena', 2, 3),
(15, 'Francisco', 'Gutiérrez', 25602901, 'francisco@gmail.com', 1106789012, 'francisco', 3, 4),
(16, 'Lucía', 'Ortega', 36703012, 'lucia@gmail.com', 1137890123, 'lucia', 4, 5),
(17, 'Martín', 'Castro', 27890107, 'martin@gmail.com', 1118901234, 'martin', 1, 2),
(18, 'Gabriela', 'Ponce', 28900134, 'gabriela@gmail.com', 1199012345, 'gabriela', 2, 4),
(19, 'Oscar', 'Sánchez', 39012945, 'oscar@gmail.com', 1120123456, 'oscar', 3, 5),
(20, 'Paola', 'Torres', 20127756, 'paola@gmail.com', 1134234567, 'paola', 4, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

CREATE TABLE `grupo` (
  `id_grupo` int(11) NOT NULL,
  `nombre_grupo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `grupo`
--

INSERT INTO `grupo` (`id_grupo`, `nombre_grupo`) VALUES
(2, 'Grupo A'),
(3, 'Grupo B'),
(4, 'Grupo C'),
(5, 'Grupo D');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_roles`
--

CREATE TABLE `historial_roles` (
  `id_historial` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `id_empleado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial_roles`
--

INSERT INTO `historial_roles` (`id_historial`, `fecha`, `id_empleado`) VALUES
(1, '2024-01-15', 1),
(2, '2024-02-20', 5),
(3, '2024-03-10', 8),
(4, '2024-04-25', 12),
(5, '2024-05-30', 16),
(6, '2024-06-14', 3),
(7, '2024-07-22', 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicidad`
--

CREATE TABLE `publicidad` (
  `id_publicidad` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_final` date NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `id_empleado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publicidad`
--

INSERT INTO `publicidad` (`id_publicidad`, `nombre`, `fecha_inicio`, `fecha_final`, `descripcion`, `id_empleado`) VALUES
(1, 'Campaña Verano 2024', '2024-06-01', '2024-08-31', 'Promoción de verano con descuentos especiales.', 20),
(2, 'Lanzamiento Producto X', '2024-03-01', '2024-06-01', 'Nuevo producto en el mercado con oferta de lanzamiento.', 16),
(3, 'Oferta Fin de Año', '2024-12-01', '2024-12-31', 'Descuentos navideños y promociones especiales.', 12),
(4, 'Evento Aniversario', '2024-09-01', '2024-10-01', 'Celebración del aniversario con eventos y premios.', 8),
(5, 'Black Friday', '2024-11-24', '2024-11-30', 'Grandes descuentos por Black Friday.', 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicidad_vehiculo`
--

CREATE TABLE `publicidad_vehiculo` (
  `id_publicidad` int(11) NOT NULL,
  `id_vehiculo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publicidad_vehiculo`
--

INSERT INTO `publicidad_vehiculo` (`id_publicidad`, `id_vehiculo`) VALUES
(1, 3),
(1, 7),
(1, 20),
(1, 13),
(1, 5),
(2, 8),
(2, 1),
(2, 4),
(2, 9),
(3, 2),
(3, 20),
(4, 6),
(4, 11),
(4, 17),
(4, 19),
(5, 16),
(5, 11),
(5, 14),
(5, 6),
(5, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_llamada`
--

CREATE TABLE `registro_llamada` (
  `id_registro llamada` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `id_empleado` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro_llamada`
--

INSERT INTO `registro_llamada` (`id_registro llamada`, `fecha`, `id_empleado`, `id_cliente`) VALUES
(1, '2024-01-05 00:00:00', 1, 12),
(2, '2024-01-10 00:00:00', 3, 5),
(3, '2024-01-15 00:00:00', 1, 8),
(4, '2024-01-20 00:00:00', 12, 15),
(5, '2024-01-25 00:00:00', 1, 5),
(6, '2024-02-01 00:00:00', 1, 12),
(7, '2024-02-05 00:00:00', 16, 20),
(8, '2024-02-10 00:00:00', 1, 18),
(9, '2024-02-15 00:00:00', 1, 12),
(10, '2024-02-20 00:00:00', 13, 18),
(11, '2024-03-01 00:00:00', 1, 11),
(12, '2024-03-05 00:00:00', 4, 16),
(13, '2024-03-10 00:00:00', 1, 11),
(14, '2024-03-15 00:00:00', 1, 16),
(15, '2024-03-20 00:00:00', 15, 1),
(16, '2024-04-01 00:00:00', 11, 13),
(17, '2024-04-05 00:00:00', 6, 19),
(18, '2024-04-10 00:00:00', 1, 1),
(19, '2024-04-15 00:00:00', 1, 1),
(20, '2024-04-20 00:00:00', 12, 11),
(21, '2024-05-01 00:00:00', 13, 20),
(22, '2024-05-05 00:00:00', 7, 6),
(23, '2024-05-10 00:00:00', 1, 14),
(24, '2024-05-15 00:00:00', 16, 3),
(25, '2024-05-20 00:00:00', 1, 12),
(26, '2024-06-01 00:00:00', 9, 5),
(27, '2024-06-05 00:00:00', 1, 7),
(28, '2024-06-10 00:00:00', 17, 13),
(29, '2024-06-15 00:00:00', 1, 20),
(30, '2024-06-20 00:00:00', 1, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre_rol`) VALUES
(1, 'Administrador'),
(2, 'Gerente'),
(3, 'Vendedor'),
(4, 'CM');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

CREATE TABLE `vehiculo` (
  `id_vehiculo` int(11) NOT NULL,
  `modelo` varchar(30) NOT NULL,
  `marca` varchar(30) NOT NULL,
  `tipo_vehiculo` varchar(30) NOT NULL,
  `precio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vehiculo`
--

INSERT INTO `vehiculo` (`id_vehiculo`, `modelo`, `marca`, `tipo_vehiculo`, `precio`) VALUES
(1, 'Corolla', 'Toyota', 'Sedan', 20000.00),
(2, 'Civic', 'Honda', 'Sedan', 21000.00),
(3, 'F-150', 'Ford', 'Truck', 35000.00),
(4, 'Silverado', 'Chevrolet', 'Truck', 36000.00),
(5, 'X5', 'BMW', 'SUV', 60000.00),
(6, 'Q7', 'Audi', 'SUV', 65000.00),
(7, 'Golf', 'Volkswagen', 'Hatchback', 22000.00),
(8, 'Elantra', 'Hyundai', 'Sedan', 19000.00),
(9, 'Altima', 'Nissan', 'Sedan', 23000.00),
(10, 'Wrangler', 'Jeep', 'SUV', 40000.00),
(11, 'Soul', 'Kia', 'Hatchback', 21000.00),
(12, 'CX-5', 'Mazda', 'SUV', 30000.00),
(13, 'Outback', 'Subaru', 'SUV', 32000.00),
(14, 'E-Class', 'Mercedes-Benz', 'Sedan', 55000.00),
(15, 'RX', 'Lexus', 'SUV', 58000.00),
(16, '911', 'Porsche', 'Coupe', 90000.00),
(17, 'F-Type', 'Jaguar', 'Coupe', 85000.00),
(18, 'Discovery', 'Land Rover', 'SUV', 70000.00),
(19, 'Pacifica', 'Chrysler', 'Minivan', 35000.00),
(20, 'Sienna', 'Toyota', 'Minivan', 36000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

CREATE TABLE `venta` (
  `id_venta` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `valor_carpeta` decimal(10,2) NOT NULL,
  `id_empleado` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `venta`
--

INSERT INTO `venta` (`id_venta`, `fecha`, `valor_carpeta`, `id_empleado`, `id_cliente`) VALUES
(1, '2024-09-20', 90000.00, 1, 12),
(2, '2024-09-25', 300000.00, 1, 1),
(3, '2024-10-09', 400000.00, 13, 18),
(4, '2024-09-30', 50000.00, 4, 16),
(5, '2024-10-16', 100000.00, 11, 13),
(6, '2024-10-06', 40000.00, 10, 6);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`),
  ADD KEY `id_vehiculo` (`id_vehiculo`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`id_empleado`),
  ADD KEY `id_rol` (`id_rol`),
  ADD KEY `id_grupo` (`id_grupo`);

--
-- Indices de la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`id_grupo`);

--
-- Indices de la tabla `historial_roles`
--
ALTER TABLE `historial_roles`
  ADD PRIMARY KEY (`id_historial`),
  ADD KEY `id_empleado` (`id_empleado`);

--
-- Indices de la tabla `publicidad`
--
ALTER TABLE `publicidad`
  ADD PRIMARY KEY (`id_publicidad`),
  ADD KEY `id_empleado` (`id_empleado`);

--
-- Indices de la tabla `publicidad_vehiculo`
--
ALTER TABLE `publicidad_vehiculo`
  ADD KEY `id_publicidad` (`id_publicidad`),
  ADD KEY `id_vehiculo` (`id_vehiculo`);

--
-- Indices de la tabla `registro_llamada`
--
ALTER TABLE `registro_llamada`
  ADD PRIMARY KEY (`id_registro llamada`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_empleado` (`id_empleado`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD PRIMARY KEY (`id_vehiculo`);

--
-- Indices de la tabla `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `id_empleado` (`id_empleado`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `grupo`
--
ALTER TABLE `grupo`
  MODIFY `id_grupo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `historial_roles`
--
ALTER TABLE `historial_roles`
  MODIFY `id_historial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `publicidad`
--
ALTER TABLE `publicidad`
  MODIFY `id_publicidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `registro_llamada`
--
ALTER TABLE `registro_llamada`
  MODIFY `id_registro llamada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  MODIFY `id_vehiculo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `venta`
--
ALTER TABLE `venta`
  MODIFY `id_venta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`id_vehiculo`) REFERENCES `vehiculo` (`id_vehiculo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD CONSTRAINT `empleado_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `empleado_ibfk_2` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id_grupo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `historial_roles`
--
ALTER TABLE `historial_roles`
  ADD CONSTRAINT `historial_roles_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id_empleado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `publicidad`
--
ALTER TABLE `publicidad`
  ADD CONSTRAINT `publicidad_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id_empleado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `publicidad_vehiculo`
--
ALTER TABLE `publicidad_vehiculo`
  ADD CONSTRAINT `publicidad_vehiculo_ibfk_1` FOREIGN KEY (`id_publicidad`) REFERENCES `publicidad` (`id_publicidad`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publicidad_vehiculo_ibfk_2` FOREIGN KEY (`id_vehiculo`) REFERENCES `vehiculo` (`id_vehiculo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `registro_llamada`
--
ALTER TABLE `registro_llamada`
  ADD CONSTRAINT `registro_llamada_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `registro_llamada_ibfk_2` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id_empleado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `venta`
--
ALTER TABLE `venta`
  ADD CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id_empleado`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `venta_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
