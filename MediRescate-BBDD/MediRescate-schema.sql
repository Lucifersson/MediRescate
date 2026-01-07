-- Configuración inicial para evitar problemas de dependencias al borrar
SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------
-- Eliminación de tablas existentes (Orden inverso por FK)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `Actividad`;
DROP TABLE IF EXISTS `Usuario`;
DROP TABLE IF EXISTS `Ambulancia`;
DROP TABLE IF EXISTS `Emergencia`;

SET FOREIGN_KEY_CHECKS = 1;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `Ambulancia`
-- --------------------------------------------------------

CREATE TABLE `Ambulancia` (
  `id_ambulancia` int(10) NOT NULL AUTO_INCREMENT,
  `matricula` varchar(10) NOT NULL,
  `modelo_vehiculo` varchar(10) NOT NULL,
  PRIMARY KEY (`id_ambulancia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `Emergencia`
-- --------------------------------------------------------

CREATE TABLE `Emergencia` (
  `id_emergencia` int(10) NOT NULL AUTO_INCREMENT,
  `emergencia` varchar(50) NOT NULL,
  `latitud` decimal(10,8) NOT NULL,
  `longitud` decimal(10,8) NOT NULL,
  `hora_emergencia` date NOT NULL,
  `estado` varchar(20) NOT NULL,
  PRIMARY KEY (`id_emergencia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `Usuario`
-- --------------------------------------------------------

CREATE TABLE `Usuario` (
  `id_empleado` int(10) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `cargo` varchar(20) NOT NULL,
  `ultima_conexion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id_empleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `Actividad`
-- --------------------------------------------------------

CREATE TABLE `Actividad` (
  `id_actividad` int(10) NOT NULL AUTO_INCREMENT,
  `id_empleado` int(10) NOT NULL,
  `id_ambulancia` int(10) NOT NULL,
  `id_emergencia` int(10) NOT NULL,
  PRIMARY KEY (`id_actividad`),
  KEY `id_empleado` (`id_empleado`),
  KEY `id_ambulancia` (`id_ambulancia`),
  KEY `id_emergencia` (`id_emergencia`),
  CONSTRAINT `Actividad_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `Usuario` (`id_empleado`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Actividad_ibfk_2` FOREIGN KEY (`id_ambulancia`) REFERENCES `Ambulancia` (`id_ambulancia`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Actividad_ibfk_3` FOREIGN KEY (`id_emergencia`) REFERENCES `Emergencia` (`id_emergencia`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

COMMIT;
