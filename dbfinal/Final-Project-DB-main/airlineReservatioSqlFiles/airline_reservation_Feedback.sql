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
-- Table structure for table `Feedback`
--

DROP TABLE IF EXISTS `Feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Feedback` (
  `email` varchar(255) NOT NULL,
  `airline_name` varchar(255) NOT NULL,
  `flight_num` varchar(10) NOT NULL,
  `dept_time` time NOT NULL,
  `dept_date` date NOT NULL,
  `comment` varchar(200) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  PRIMARY KEY (`email`,`airline_name`,`flight_num`,`dept_time`,`dept_date`),
  KEY `airline_name` (`airline_name`,`flight_num`,`dept_time`,`dept_date`),
  CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`airline_name`, `flight_num`, `dept_time`, `dept_date`) REFERENCES `Flight` (`airline_name`, `flight_num`, `dept_time`, `dept_date`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`email`) REFERENCES `Customer` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Feedback`
--

LOCK TABLES `Feedback` WRITE;
/*!40000 ALTER TABLE `Feedback` DISABLE KEYS */;
INSERT INTO `Feedback` VALUES ('carrie.song@nyu.edu','China Eastern','MU579','08:40:00','2021-07-01','wasld',3.5),('carrie.song@nyu.edu','China Eastern','MU588','16:03:00','2021-11-08','Nice flight',4.5),('carrie.song@nyu.edu','China Eastern','MU631','15:25:00','2021-12-24','shafkbhk',4),('justinlin@gmail.com','China Eastern','MU631','15:25:00','2021-12-24','Great flight',4.5),('justinlin@gmail.com','Delta','DL689','13:00:00','2021-09-11','Fair',3),('sophie.zhang@nyu.edu','China Eastern','MU588','16:03:00','2021-11-08','Comfortable flight',4),('sophie.zhang@nyu.edu','China Eastern','MU6391','06:30:00','2021-11-12','BAD FLIGHT',1);
/*!40000 ALTER TABLE `Feedback` ENABLE KEYS */;
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
