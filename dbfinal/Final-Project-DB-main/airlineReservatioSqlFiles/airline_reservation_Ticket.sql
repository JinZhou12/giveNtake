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
-- Table structure for table `Ticket`
--

DROP TABLE IF EXISTS `Ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ticket` (
  `ID` varchar(20) NOT NULL,
  `sold_price` int(11) NOT NULL,
  `card_number` varchar(20) NOT NULL,
  `card_type` varchar(10) NOT NULL,
  `exp_date` date NOT NULL,
  `name_on_card` varchar(70) NOT NULL,
  `purchase_date` date NOT NULL,
  `purchase_time` time NOT NULL,
  `airline_name` varchar(255) DEFAULT NULL,
  `flight_num` varchar(10) DEFAULT NULL,
  `dept_date` date DEFAULT NULL,
  `dept_time` time DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `airline_name` (`airline_name`,`flight_num`,`dept_time`,`dept_date`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`airline_name`, `flight_num`, `dept_time`, `dept_date`) REFERENCES `Flight` (`airline_name`, `flight_num`, `dept_time`, `dept_date`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ticket`
--

LOCK TABLES `Ticket` WRITE;
/*!40000 ALTER TABLE `Ticket` DISABLE KEYS */;
INSERT INTO `Ticket` VALUES ('199844',5000,'1111','Debit','2021-12-01','Carrie Song','2021-12-03','23:04:44','China Eastern','MU631','2021-12-24','15:25:00'),('345-2984372924',150,'1287 4012 9068 0127','Credit','2023-12-01','Justin Lin','2021-08-30','16:29:00','Delta','DL689','2021-09-11','13:00:00'),('781-1234567890',6600,'2536 1277 9182 1283','Credit','2027-02-01','Carrie Song','2021-11-09','00:15:00','China Eastern','MU588','2021-11-08','16:03:00'),('781-1287346178',6600,'4012 7234 1286 9182','Credit','2025-01-01','Sophie Zhang','2021-11-01','20:30:00','China Eastern','MU588','2021-11-08','16:03:00'),('781-1468234879',5000,'2536 1277 9182 1283','Credit','2027-02-01','Carrie Song','2021-06-15','21:00:00','China Eastern','MU579','2021-07-01','08:40:00'),('781-1726351728',315,'4012 7234 1286 9182','Credit','2025-01-01','Sophie Zhang','2021-10-08','20:11:00','China Eastern','MU6391','2021-11-12','06:30:00'),('781-2627162510',5200,'1287 4012 9068 0127','Credit','2023-12-01','Justin Lin','2021-09-11','08:23:00','China Eastern','MU631','2021-12-24','15:25:00'),('781-3248756293',5200,'4012 7234 1286 9182','Credit','2025-01-01','Sophie Zhang','2021-09-11','08:30:00','China Eastern','MU631','2021-12-24','15:25:00');
/*!40000 ALTER TABLE `Ticket` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-04  0:21:54
