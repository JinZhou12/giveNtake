-- MySQL dump 10.13  Distrib 8.0.26, for macos11 (x86_64)
--
-- Host: localhost    Database: airline_reservation
-- ------------------------------------------------------
-- Server version	5.7.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Flight`
--

DROP TABLE IF EXISTS `Flight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Flight` (
  `airline_name` varchar(255) NOT NULL,
  `flight_num` varchar(10) NOT NULL,
  `dept_time` time NOT NULL,
  `dept_date` date NOT NULL,
  `arr_time` time NOT NULL,
  `arr_date` date NOT NULL,
  `base_price` float NOT NULL,
  `airplane_id` varchar(50) DEFAULT NULL,
  `flight_status` varchar(10) NOT NULL,
  `dept_airport` varchar(5) DEFAULT NULL,
  `arr_airport` varchar(5) DEFAULT NULL,
  `airplane_airline_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`airline_name`,`flight_num`,`dept_time`,`dept_date`),
  KEY `airplane_id` (`airplane_id`,`airplane_airline_name`),
  KEY `dept_airport` (`dept_airport`),
  KEY `arr_airport` (`arr_airport`),
  CONSTRAINT `flight_ibfk_1` FOREIGN KEY (`airline_name`) REFERENCES `Airline` (`airline_name`),
  CONSTRAINT `flight_ibfk_2` FOREIGN KEY (`airplane_id`, `airplane_airline_name`) REFERENCES `Airplane` (`ID`, `airline_name`),
  CONSTRAINT `flight_ibfk_3` FOREIGN KEY (`dept_airport`) REFERENCES `Airport` (`airport_code`),
  CONSTRAINT `flight_ibfk_4` FOREIGN KEY (`arr_airport`) REFERENCES `Airport` (`airport_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Flight`
--

LOCK TABLES `Flight` WRITE;
/*!40000 ALTER TABLE `Flight` DISABLE KEYS */;
INSERT INTO `Flight` VALUES ('China Eastern','MU579','08:40:00','2021-07-01','00:50:00','2021-07-02',4900,'Boeing 787-7','On-time','LAX','PVG','Delta'),('China Eastern','MU588','16:03:00','2021-11-08','21:11:00','2021-11-09',6500.32,'Boeing 787-9','On-time','JFK','PVG','China Eastern'),('China Eastern','MU631','15:25:00','2021-12-24','19:15:00','2021-12-25',5000,'Boeing 777-300ER','On-time','PVG','LAX','China Eastern'),('China Eastern','MU6391','06:30:00','2021-11-12','10:05:00','2021-11-12',307,'Airbus A320-200','Delay','PVG','PEK','China Eastern'),('China Eastern','MU6958','21:55:00','2021-11-09','01:20:00','2021-11-10',107.5,'Airbus A320-200','Delay','JFK','LAX','China Eastern'),('Delta','DL123','17:30:00','2021-06-15','21:20:00','2021-06-16',8000,'Boeing 777-200ER','On-time','LAX','PVG','Delta'),('Delta','DL347','15:30:00','2021-04-03','00:30:00','2021-04-04',5800,'Airbus A454-300','On-time','PEK','LAX','Delta'),('Delta','DL456','14:00:00','2021-03-04','23:00:00','2021-03-05',5500,'Boeing 787-7','Delay','LAX','PEK','Delta'),('Delta','DL689','13:00:00','2021-09-11','16:00:00','2021-09-11',150,'Airbus A454-300','On-time','LAX','JFK','Delta');
/*!40000 ALTER TABLE `Flight` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-04  0:21:56
