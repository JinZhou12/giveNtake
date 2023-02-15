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
-- Table structure for table `Customer`
--

DROP TABLE IF EXISTS `Customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Customer` (
  `email` varchar(255) NOT NULL,
  `cust_password` varchar(320) NOT NULL,
  `cust_name` varchar(70) NOT NULL,
  `building_num` int(11) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(200) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `phone_num` bigint(20) DEFAULT NULL,
  `passport_num` varchar(10) DEFAULT NULL,
  `passport_exp` date DEFAULT NULL,
  `passport_country` varchar(90) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer`
--

LOCK TABLES `Customer` WRITE;
/*!40000 ALTER TABLE `Customer` DISABLE KEYS */;
INSERT INTO `Customer` VALUES ('carrie.song@nyu.edu','255bcbcc2f7e29e97abc34caeae260b8','Carrie Song',210,'Smith ST','Brooklyn','NY',3527192834,'E12782123','2035-03-12','China','1999-11-19'),('justinlin@gmail.com','9680f36936828e59077215bb95dd4957','Justin Lin',12,'123 St\n','Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu','NY\n',6325811239,'E16270918','2027-09-30','US','1999-02-18'),('sophie.zhang@nyu.edu','990eb595c3ce1399729eb704be68f74d','Sophie Zhang',347,'Manhattan ST','New York','NY',2871627352,'E26215098','2030-10-01','China','2001-01-24');
/*!40000 ALTER TABLE `Customer` ENABLE KEYS */;
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
