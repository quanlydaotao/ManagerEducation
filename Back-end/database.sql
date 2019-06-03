-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: manage
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `authority`
--

DROP TABLE IF EXISTS `authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `authority` (
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authority`
--

LOCK TABLES `authority` WRITE;
/*!40000 ALTER TABLE `authority` DISABLE KEYS */;
INSERT INTO `authority` VALUES ('ROLE_ADMIN'),('ROLE_PARENTS'),('ROLE_STUDENT'),('ROLE_TEACHER');
/*!40000 ALTER TABLE `authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `class` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `class_code` varchar(50) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `describe` longtext CHARACTER SET latin1 COLLATE latin1_bin,
  `open_day` date NOT NULL,
  `close_day` date NOT NULL,
  `status` bit(1) NOT NULL,
  `class_room` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `class_class_code_uindex` (`class_code`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (17,'AT0802-A','Lớp L08.2A  năm học 2008',NULL,'2017-05-12','2018-03-14',_binary '\0','203-TA1'),(18,'AT0802-B','Lớp L08.2B  năm học 2008',NULL,'2017-05-12','2018-03-14',_binary '\0','203-TA1'),(19,'AT0802-C','Lớp L08.2C  năm học 2008',NULL,'2017-05-12','2018-03-14',_binary '\0','203-TA1'),(20,'AT0802-D','Lớp L08.2D  năm học 2008',NULL,'2017-05-12','2018-03-14',_binary '\0','203-TA1'),(21,'AT0802-E','Lớp L08.2E  năm học 2008',NULL,'2017-05-12','2018-03-14',_binary '\0','203-TA1'),(22,'AT0802-F','Lớp L08.2F  năm học 2008',NULL,'2017-05-12','2018-03-14',_binary '\0','203-TA1'),(23,'AT0806-A','Lớp L08.6A  năm học 2008',NULL,'2017-05-12','2018-03-14',_binary '\0','203-TA1'),(24,'AT0806-B','Lớp L08.6B  năm học 2008',NULL,'2017-05-12','2018-03-14',_binary '\0','203-TA1'),(25,'AT0806-C','Lớp L08.6C  năm học 2008',NULL,'2017-05-12','2018-03-14',_binary '\0','203-TA1'),(26,'AT0806-D','Lớp L08.6D  năm học 2008',NULL,'2017-05-12','2018-03-14',_binary '\0','203-TA1'),(27,'AT0806-E','Lớp L08.6E  năm học 2008',NULL,'2017-05-12','2018-03-14',_binary '\0','203-TA1'),(28,'AT0806-F','Lớp L08.6F  năm học 2008',NULL,'2017-05-12','2018-03-14',_binary '\0','203-TA1'),(29,'AT0807-A','Lớp L08.7A  năm học 2008',NULL,'2017-05-12','2018-03-14',_binary '\0','203-TA1'),(30,'AT0807-B','Lớp L08.7B  năm học 2008',NULL,'2017-05-12','2018-03-14',_binary '\0','203-TA1'),(31,'AT0807-C','Lớp L08.7C  năm học 2008',NULL,'2017-05-12','2018-03-14',_binary '\0','203-TA1'),(32,'AT0807-D','Lớp L08.7D  năm học 2008',NULL,'2017-05-12','2018-03-14',_binary '\0','203-TA1'),(33,'AT0807-E','Lớp L08.7E  năm học 2008',NULL,'2017-05-12','2018-03-14',_binary '\0','203-TA1'),(34,'AT1801-A','Lớp L18.1A  năm học 2018',NULL,'2017-05-12','2018-03-14',_binary '','203-TA1'),(35,'AT1801-B','Lớp L18.1B  năm học 2018',NULL,'2017-05-12','2018-03-14',_binary '','203-TA1'),(36,'AT1802-A','Lớp L18.2A  năm học 2018',NULL,'2017-05-12','2018-03-14',_binary '','203-TA1'),(37,'AT1802-B','Lớp L18.2B  năm học 2018',NULL,'2017-05-12','2018-03-14',_binary '','203-TA1'),(38,'AT1802-C','Lớp L18.2C  năm học 2018',NULL,'2017-05-12','2018-03-14',_binary '','203-TA1'),(39,'AT1802-D','Lớp L18.2D  năm học 2018',NULL,'2017-05-12','2018-03-14',_binary '','203-TA1'),(40,'AT1803-A','Lớp L18.3A  năm học 2018',NULL,'2017-05-12','2018-03-14',_binary '','203-TA1'),(41,'AT1803-B','Lớp L18.3B  năm học 2018',NULL,'2017-05-12','2018-03-14',_binary '','203-TA1'),(42,'AT1803-C','Lớp L18.3C  năm học 2018',NULL,'2017-05-12','2018-03-14',_binary '','203-TA1'),(43,'AT1807-A','Lớp L18.7A  năm học 2018',NULL,'2017-05-12','2018-03-14',_binary '','203-TA1'),(44,'AT1807-B','Lớp L18.7B  năm học 2018',NULL,'2017-05-12','2018-03-14',_binary '','203-TA1'),(45,'AT1807-C','Lớp L18.7C  năm học 2018',NULL,'2017-05-12','2018-03-14',_binary '','203-TA1'),(46,'AT1807-D','Lớp L18.7D  năm học 2018',NULL,'2017-05-12','2018-03-14',_binary '','203-TA1'),(47,'CT1901-A','Lớp CT19.1A  năm học 2019',NULL,'2017-05-12','2018-03-14',_binary '','203-TA1'),(48,'CT1901-B','Lớp CT19.1B  năm học 2019',NULL,'2017-05-12','2018-03-14',_binary '','203-TA1'),(49,'CT1901-C','Lớp CT19.1C  năm học 2019',NULL,'2017-05-12','2018-03-14',_binary '','203-TA1'),(50,'CT1901-D','Lớp CT19.1D  năm học 2019',NULL,'2017-05-12','2018-03-14',_binary '','203-TA1'),(51,'CT1901-E','Lớp CT19.1E  năm học 2019',NULL,'2017-05-12','2018-03-14',_binary '','203-TA1'),(52,'CT1902-A','Lớp CT19.2A  năm học 2019',NULL,'2019-06-02','2019-06-02',_binary '','203-TA1'),(53,'CT1902-B','Lớp CT19.2B  năm học 2019',NULL,'2019-06-02','2019-06-02',_binary '','203-TA1'),(54,'CT1903-A','Lớp CT19.3A  năm học 2019',NULL,'2019-06-02','2019-06-02',_binary '','203-TA1'),(55,'CT1903-B','Lớp CT19.3B  năm học 2019',NULL,'2019-06-02','2019-06-02',_binary '','203-TA1'),(56,'CT1903-C','Lớp CT19.3C năm học 2019',NULL,'2019-06-02','2019-06-02',_binary '','203-TA1'),(57,'CT1905-A','Lớp CT19.5A  năm học 2019',NULL,'2019-06-02','2019-06-02',_binary '','203-TA1'),(58,'CT1905-B','Lớp CT19.5B  năm học 2019',NULL,'2019-06-02','2019-06-02',_binary '','203-TA1'),(59,'CT1906-A','Lớp CT19.6A  năm học 2019',NULL,'2019-06-02','2019-06-02',_binary '','203-TA1'),(60,'CT1906-B','Lớp CT19.6B  năm học 2019',NULL,'2019-06-02','2019-06-02',_binary '','203-TA1'),(61,'CT1908-A','Lớp CT19.8A  năm học 2019',NULL,'2019-06-02','2019-06-02',_binary '','203-TA1'),(62,'CT1908-B','Lớp CT19.8B  năm học 2019',NULL,'2019-06-02','2019-06-02',_binary '','203-TA1'),(63,'CT1908-C','Lớp CT19.8C  năm học 2019',NULL,'2019-06-02','2019-06-02',_binary '','203-TA1'),(64,'CT1908-D','Lớp CT19.8D  năm học 2019',NULL,'2019-06-02','2019-06-02',_binary '','203-TA1'),(65,'CT1908-E','Lớp CT19.8E  năm học 2019',NULL,'2019-06-02','2019-06-02',_binary '','203-TA1'),(66,'CT1908-F','Lớp CT19.8F  năm học 2019',NULL,'2019-06-02','2019-06-02',_binary '','203-TA1');
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes_users`
--

DROP TABLE IF EXISTS `classes_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `classes_users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `class_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_class_user_idx` (`user_id`),
  KEY `fk_user_class_idx` (`class_id`),
  CONSTRAINT `class_user_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `user_class___fk` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes_users`
--

LOCK TABLES `classes_users` WRITE;
/*!40000 ALTER TABLE `classes_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `classes_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `course` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `max_classes` int(11) NOT NULL,
  `date_open` timestamp NULL DEFAULT NULL,
  `date_close` timestamp NULL DEFAULT NULL,
  `status` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `course_name_uindex` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (32,'AT08-02',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(33,'AT08-03',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(34,'AT08-04',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(35,'AT08-05',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(36,'AT08-06',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(37,'AT08-07',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(38,'AT09-01',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(39,'AT09-02',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(40,'AT09-03',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(41,'AT09-04',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(42,'AT09-05',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(43,'AT09-06',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(44,'AT09-07',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(45,'AT09-08',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(46,'AT10-01',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(47,'AT10-02',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(48,'AT10-03',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(49,'AT10-04',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(50,'AT10-05',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(51,'AT10-06',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(52,'AT10-07',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(53,'AT11-01',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(54,'AT11-02',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(55,'AT11-03',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(56,'AT11-04',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(57,'AT11-05',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(58,'AT11-06',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(59,'AT17-01',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(60,'AT17-02',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(61,'AT17-03',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '\0'),(62,'AT17-04',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary ''),(63,'AT17-05',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary ''),(64,'AT18-01',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary ''),(65,'AT18-02',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary ''),(66,'AT18-03',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary ''),(67,'AT18-04',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary ''),(68,'AT18-05',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary ''),(69,'AT18-06',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary ''),(70,'AT18-07',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary ''),(71,'AT18-08',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary ''),(72,'CT19-01',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary ''),(73,'CT19-02',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary ''),(74,'CT19-03',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary ''),(75,'CT19-04',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary ''),(76,'CT19-05',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary ''),(77,'CT19-06',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary ''),(78,'CT19-07',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary ''),(79,'CT19-08',13,'2019-08-02 09:59:18','2019-09-02 09:59:34',_binary '');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_classes`
--

DROP TABLE IF EXISTS `course_classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `course_classes` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `course_id` bigint(20) DEFAULT NULL,
  `class_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `course_classes__fk` (`class_id`),
  KEY `class_course___fk` (`course_id`),
  CONSTRAINT `class_course___fk` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `course_classes__fk` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_classes`
--

LOCK TABLES `course_classes` WRITE;
/*!40000 ALTER TABLE `course_classes` DISABLE KEYS */;
INSERT INTO `course_classes` VALUES (10,32,17),(11,32,18),(12,32,19),(13,32,20),(14,32,21),(15,32,22),(16,36,23),(17,36,24),(18,36,25),(19,36,26),(20,36,27),(21,36,28),(22,37,29),(23,37,30),(24,37,31),(25,37,32),(26,37,33),(27,64,34),(28,64,35),(29,65,36),(30,65,37),(31,65,38),(32,65,39),(33,66,40),(34,66,41),(35,66,42),(36,70,43),(37,70,44),(38,70,45),(39,70,46),(40,72,47),(41,72,48),(42,72,49),(43,72,50),(44,72,51),(45,73,52),(46,73,53),(47,74,54),(48,74,55),(49,74,56),(50,76,57),(51,76,58),(52,77,59),(53,77,60),(54,79,61),(55,79,62),(56,79,63),(57,79,64),(58,79,65),(59,79,66);
/*!40000 ALTER TABLE `course_classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `login` varchar(50) NOT NULL,
  `password_hash` varchar(60) NOT NULL,
  `first_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `last_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(254) DEFAULT NULL,
  `image_url` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `activated` bit(1) NOT NULL,
  `lang_key` varchar(6) DEFAULT NULL,
  `activation_key` varchar(20) DEFAULT NULL,
  `reset_key` varchar(20) DEFAULT NULL,
  `address` varchar(254) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `phone_number` varchar(20) NOT NULL,
  `identity_card_number` varchar(20) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `sex` bit(1) DEFAULT b'1',
  `nations` varchar(50) DEFAULT NULL,
  `address1` varchar(254) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `date_signed` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_user_login` (`login`),
  UNIQUE KEY `user_phone_number_uindex` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (61,'AD01010','$2a$10$UjWOxdIm5yK5LNMK/1R6b.6bAccea2SJMQtkZ5cRItLMD33qqTpEC','Đỗ Minh','Chiến','','9dd4e461268c8034f5c8564e155c67a6.jpg',_binary '','vi','31970701169615766420',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0363125500','17895465464',NULL,_binary '','Kinh','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-16'),(62,'HV00001','$2a$10$YR1CtAx4WithRR9oD6Dpj.W1Uo9is66q.TRVrZBcSVWryiv2Q6Ht.','Hoàng Ngọc','Khánh','ngockhanh@gmail.com','2d7ccddb12b3e78ca6f3141b582c9cb7.jpg',_binary '','vi','26049563882408803755',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0363204500','17895465464','2019-05-15',_binary '','Kinh','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-08'),(64,'AD12002','$2a$10$y77LTMktGOOcxXSOcKEpw.eWT.WE8KGtxN4TA7RWHkUHMVpdBrY/q','Nguyễn Duy','Mạnh','','9dd4e461268c8034f5c8564e155c67a6.jpg',_binary '','vi','25965059104381355961',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0363205500','17895465464','2019-05-10',_binary '\0','Kinh','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-10'),(73,'AD00001','$2a$10$HffNCkQMwfo2MkAUYAZa2uc.2TdW5bmbKNmB4QSpqVazLdMatm7.i','Đào Huy','Đức','','59b514174bffe4ae402b3d63aad79fe0.jpg',_binary '','vi','94395005279266750900',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0363105500','17895465464',NULL,_binary '','Kinh','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-13'),(74,'PH00624','$2a$10$bLHgJmWNUCCrzMe1PMjyBO3m/m8nZthq7yZohDHGUJCDZ0VpRoAM.','Đào Huy','Hoàng','huydu21c003@hocvienact.edu.vn','fd456406745d816a45cae554c788e754.jpg',_binary '\0','vi','09250693261408654747',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0363905000','17895465464','2019-05-16',_binary '','Khác','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-14'),(75,'AD00992','$2a$10$P76caHfPwrsr.Y/ODqNDkuqnJacpMb68KBy4afI9oKKEKLJYPJYOO','Chu Thị Minh','Hiền','','9dd4e461268c8034f5c8564e155c67a6.jpg',_binary '','vi','98875201186547163375',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0363219500','17895465464',NULL,_binary '','Kinh','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-08'),(86,'AD00991','$2a$10$qCf9FelIp0qSLqcex2nfJuIaMDt1ad7Q5gHJpZgqJ8luAGmK3tnsm','Administrator','Administrator','admi4n112@localhost','2c88954b0f97cc778494cc2b4358c8a8.png',_binary '\0','vi','16564255829183682463','00586276569043613681','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0361234600','17895465464','2019-05-09',_binary '\0','Khác','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-28');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_authority`
--

DROP TABLE IF EXISTS `user_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_authority` (
  `user_id` bigint(20) NOT NULL,
  `authority_name` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`,`authority_name`),
  KEY `fk_authority_name` (`authority_name`),
  CONSTRAINT `fk_authority_name` FOREIGN KEY (`authority_name`) REFERENCES `authority` (`name`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_authority`
--

LOCK TABLES `user_authority` WRITE;
/*!40000 ALTER TABLE `user_authority` DISABLE KEYS */;
INSERT INTO `user_authority` VALUES (61,'ROLE_ADMIN'),(64,'ROLE_ADMIN'),(73,'ROLE_ADMIN'),(75,'ROLE_ADMIN'),(86,'ROLE_ADMIN'),(74,'ROLE_PARENTS'),(62,'ROLE_STUDENT');
/*!40000 ALTER TABLE `user_authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `years`
--

DROP TABLE IF EXISTS `years`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `years` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `start_years` varchar(10) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `open_day` date DEFAULT NULL,
  `close_day` date DEFAULT NULL,
  `describe` mediumtext CHARACTER SET latin1 COLLATE latin1_bin,
  `maximum_classes` int(11) NOT NULL,
  `status` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `years_start_years_uindex` (`start_years`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `years`
--

LOCK TABLES `years` WRITE;
/*!40000 ALTER TABLE `years` DISABLE KEYS */;
INSERT INTO `years` VALUES (5,'Khóa học năm học 2008','2008','2008-05-23','2019-05-31','<p>ccc</p>',7,_binary '\0'),(6,'Khóa học năm học 2009','2009','2019-05-17','2019-05-16','',8,_binary '\0'),(7,'Khóa học năm học 2010','2010','2019-05-16','2019-05-16','<p>xin ch&agrave;o</p>\n',7,_binary '\0'),(8,'Khóa học năm học 2011','2011','2019-05-15','2019-05-23','<p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>\n',7,_binary '\0'),(9,'Khóa học năm học 2012','2012','2019-06-02','2019-06-02','',7,_binary '\0'),(10,'Khóa học năm học 2013','2013','2019-05-10','2019-05-24','<p>xin ch&agrave;p</p>\n',8,_binary '\0'),(11,'Khóa học năm học 2014','2014','2019-06-02','2019-06-02','',9,_binary '\0'),(12,'Khóa học năm học 2015','2015','2019-06-02','2019-06-02',NULL,9,_binary '\0'),(13,'Khóa học năm học 2016','2016','2019-06-02','2019-06-02',NULL,9,_binary '\0'),(14,'Khóa học năm học 2017','2017','2019-06-02','2019-06-02',NULL,10,_binary '\0'),(15,'Khóa học năm học 2018','2018','2019-06-02','2019-06-02',NULL,9,_binary '\0'),(16,'Khóa học năm học 2019','2019','2019-06-02','2019-06-02',NULL,10,_binary '');
/*!40000 ALTER TABLE `years` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `years_course`
--

DROP TABLE IF EXISTS `years_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `years_course` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `years_id` bigint(20) DEFAULT NULL,
  `course_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_class_years_idx` (`years_id`),
  KEY `years_course__fk` (`course_id`),
  CONSTRAINT `course_years___fk` FOREIGN KEY (`years_id`) REFERENCES `years` (`id`),
  CONSTRAINT `years_course__fk` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `years_course`
--

LOCK TABLES `years_course` WRITE;
/*!40000 ALTER TABLE `years_course` DISABLE KEYS */;
INSERT INTO `years_course` VALUES (21,5,32),(22,5,33),(23,5,34),(24,5,35),(25,5,36),(26,5,37),(27,6,38),(28,6,39),(29,6,40),(30,6,41),(31,6,42),(32,6,43),(33,6,44),(34,6,45),(35,7,46),(36,7,47),(37,7,48),(38,7,49),(39,7,50),(40,7,51),(41,7,52),(42,8,53),(43,8,54),(44,8,55),(45,8,56),(46,8,57),(47,8,58),(48,14,59),(49,14,60),(50,14,61),(51,14,62),(52,14,63),(53,15,64),(54,15,65),(55,15,66),(56,15,67),(57,15,68),(58,15,69),(59,15,70),(60,16,76),(61,16,77),(62,16,78),(63,16,79),(64,16,72),(65,16,73),(66,16,74),(67,16,75);
/*!40000 ALTER TABLE `years_course` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-03 13:29:45
