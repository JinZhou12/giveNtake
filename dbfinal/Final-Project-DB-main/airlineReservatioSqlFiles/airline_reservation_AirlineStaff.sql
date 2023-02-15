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
-- Table structure for table `AirlineStaff`
--

DROP TABLE IF EXISTS `AirlineStaff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AirlineStaff` (
  `username` varchar(255) NOT NULL,
  `staff_password` varchar(320) NOT NULL,
  `first_name` varchar(35) NOT NULL,
  `last_name` varchar(35) NOT NULL,
  `DOB` date DEFAULT NULL,
  `airline_name` varchar(255) NOT NULL,
  PRIMARY KEY (`username`),
  KEY `airline_name` (`airline_name`),
  CONSTRAINT `airlinestaff_ibfk_1` FOREIGN KEY (`airline_name`) REFERENCES `Airline` (`airline_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AirlineStaff`
--

LOCK TABLES `AirlineStaff` WRITE;
/*!40000 ALTER TABLE `AirlineStaff` DISABLE KEYS */;
INSERT INTO `AirlineStaff` VALUES ('Jin Zhou','932172d16dc552369195469d88aec907','Jin','Zhou','2000-11-23','Delta'),('John Smith','d9a5663962b871b8bdce1cd7f4084899','John','Smith','1988-10-18','China Eastern');
/*!40000 ALTER TABLE `AirlineStaff` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-04  0:21:55
