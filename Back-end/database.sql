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
                         `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
                         `describe` longtext CHARACTER SET latin1 COLLATE latin1_bin,
                         `open_day` date NOT NULL,
                         `close_day` date NOT NULL,
                         `status` bit(1) NOT NULL,
                         PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,'Lớp L01.1 năm học 2018 - 2019',NULL,'2018-02-10','2019-02-10',_binary ''),(2,'Lớp L01.2 năm học 2018 - 2019',NULL,'2018-02-10','2019-04-12',_binary ''),(3,'Lớp L01.3 năm học 2018 - 2019',NULL,'2018-02-10','2019-02-11',_binary ''),(4,'Lớp L01.4 năm học 2018 - 2019',NULL,'2018-02-10','2019-03-21',_binary ''),(5,'Lớp L01.5 năm học 2018 - 2019',NULL,'2018-02-10','2019-01-23',_binary '\0'),(6,'Lớp L01.1 năm học 2017 - 2018',NULL,'2017-05-12','2018-03-24',_binary '\0'),(7,'Lớp L01.2 năm học 2017 - 2018',NULL,'2017-05-12','2018-02-27',_binary '\0'),(8,'Lớp L01.3  năm học 2017 - 2018',NULL,'2017-05-12','2018-03-02',_binary '\0'),(9,'Lớp L01.4  năm học 2017 - 2018',NULL,'2017-05-12','2018-03-09',_binary '\0'),(10,'Lớp L01.5  năm học 2017 - 2018',NULL,'2017-05-12','2018-03-14',_binary '\0');
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_user`
--

DROP TABLE IF EXISTS `class_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
SET character_set_client = utf8mb4 ;
CREATE TABLE `class_user` (
                              `id` bigint(20) NOT NULL AUTO_INCREMENT,
                              `class_id` bigint(20) NOT NULL,
                              `user_id` bigint(20) NOT NULL,
                              PRIMARY KEY (`id`),
                              KEY `fk_class_user_idx` (`user_id`),
                              KEY `fk_user_class_idx` (`class_id`),
                              CONSTRAINT `class_user_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
                              CONSTRAINT `user_class___fk` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_user`
--

LOCK TABLES `class_user` WRITE;
/*!40000 ALTER TABLE `class_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `class_user` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_classes`
--

DROP TABLE IF EXISTS `course_classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
SET character_set_client = utf8mb4 ;
CREATE TABLE `course_classes` (
                                  `id` bigint(20) NOT NULL,
                                  `course_id` bigint(20) DEFAULT NULL,
                                  `class_id` bigint(20) DEFAULT NULL,
                                  PRIMARY KEY (`id`),
                                  KEY `course_classes__fk` (`class_id`),
                                  KEY `class_course___fk` (`course_id`),
                                  CONSTRAINT `class_course___fk` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
                                  CONSTRAINT `course_classes__fk` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_classes`
--

LOCK TABLES `course_classes` WRITE;
/*!40000 ALTER TABLE `course_classes` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `years`
--

LOCK TABLES `years` WRITE;
/*!40000 ALTER TABLE `years` DISABLE KEYS */;
INSERT INTO `years` VALUES (1,'Khóa học năm học 2018 - 2019','2018','2018-02-01','2019-05-22',NULL,10,_binary ''),(2,'Khóa học năm học 2017 - 2018','2017','2018-02-02','2018-03-01','<p>bbb</p>',10,_binary ''),(3,'Khóa học năm học 2016 - 2017','2016','2018-02-02','2018-03-01','<p>ccc</p>',10,_binary '\0'),(4,'Khóa học năm học 2015 - 2016','2015',NULL,NULL,NULL,10,_binary ''),(5,'Khóa học năm học 2014 - 2015','2014','2019-05-23','2019-05-31','<p>ccc</p>',10,_binary '\0'),(6,'Năm học 2018','2013','2019-05-17','2019-05-16','',3,_binary ''),(7,'Năm học mới 2020 - 2021','2012','2019-05-16','2019-05-16','<p>xin ch&agrave;o</p>\n',3,_binary '\0'),(8,'Năm học 2022','2022','2019-05-15','2019-05-23','<p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>\n',5,_binary ''),(9,'Năm học 2023','2023',NULL,NULL,'',0,_binary ''),(10,'Năm học 2024','2024','2019-05-10','2019-05-24','<p>xin ch&agrave;p</p>\n',5,_binary '\0'),(11,'Năm học 2018','2028',NULL,NULL,'',2,_binary '');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `years_course`
--

LOCK TABLES `years_course` WRITE;
/*!40000 ALTER TABLE `years_course` DISABLE KEYS */;
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

-- Dump completed on 2019-05-29 12:38:10
