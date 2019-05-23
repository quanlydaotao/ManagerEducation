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
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (3,'AD00001','$2a$10$mUM7YmKTsSCjXhSrSN8lFuh5oWKznS2L9CJ3kcxjAOQIkZjzNhCju','Administrator','Administrator1','admin@localhost12','',_binary '','vi','66054647439288278176',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0363201502','17895465464','2019-04-02',_binary '\0','Khác','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-01-01'),(60,'AD00029','$2a$10$ow9th9V6SJDVJATzI8DCFu442pv9Z.ewt4ydjHsKYJfjeiEYtHHSq','Nguyễn Thị','Kim Anh','','144cb8381aea8b7eb240d8c884e65495.jpg',_binary '','vi','66054647439288278176',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0363203500','17895465464','2019-05-16',_binary '','Kinh','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-08'),(61,'AD01010','$2a$10$UjWOxdIm5yK5LNMK/1R6b.6bAccea2SJMQtkZ5cRItLMD33qqTpEC','Đỗ Minh','Chiến','','9dd4e461268c8034f5c8564e155c67a6.jpg',_binary '','vi','31970701169615766420',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0363125500','17895465464',NULL,_binary '','Kinh','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-16'),(62,'HV00001','$2a$10$YR1CtAx4WithRR9oD6Dpj.W1Uo9is66q.TRVrZBcSVWryiv2Q6Ht.','Hoàng Ngọc','Khánh','ngockhanh@gmail.com','2d7ccddb12b3e78ca6f3141b582c9cb7.jpg',_binary '','vi','26049563882408803755',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0363204500','17895465464','2019-05-15',_binary '','Kinh','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-08'),(63,'PH00001','$2a$10$v/Yc/E8wnpTjJNEs.oLwWuKFEkPOPvTO7QZbjtwXxcGN0sweydYQK','Hà Đức','Chinh','','',_binary '','vi','82452427898800304721',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0363205501','17895465464',NULL,_binary '','Kinh','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-09'),(64,'AD12002','$2a$10$y77LTMktGOOcxXSOcKEpw.eWT.WE8KGtxN4TA7RWHkUHMVpdBrY/q','Nguyễn Duy','Mạnh','','9dd4e461268c8034f5c8564e155c67a6.jpg',_binary '','vi','25965059104381355961',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0363205500','17895465464','2019-05-10',_binary '\0','Kinh','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-10'),(65,'PH00003','$2a$10$yd9jABlNRl0yI6PditUN6Ox2vmIDTwI40wV9fGxeBV5WeWPWM4aJ6','Bùi Tiến ','Dũng','','',_binary '','vi','67868836006875664890',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0363205504','17895465464',NULL,_binary '','Kinh','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-17'),(66,'PH00004','$2a$10$QJJLFnJT.TOjMcAv/wb8KONwRjXE6l5RBH7rFdSswEnooZk.Wsr9a','Đỗ Duy ','Mạnh','','',_binary '','vi','87101525490942370949',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0363205505','17895465464',NULL,_binary '','Kinh','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-03'),(70,'PH00010','$2a$10$7.1qFhE7u3A52ROJ0W.lWeiQDudtbXHDx344D4WfjEdAn5WAzgQau','Đào Huy','Đức','admin111@localhost','78f35718d521c40179d0cba7daeed1ab.jpg',_binary '\0','vi','95075080757985370559',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0361209300','17895465464','2019-05-11',_binary '\0','Khác','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-31'),(71,'AD00018','$2a$10$gzupojFW8DKrAkT0R0j5JueMia651RSDYwegHX45We5yrPixH0LWu','Nguyễn Văn','Lâm','','ad9a4c35262c91e7f46c6c98a92a74ea.jpg',_binary '','vi','66841631765330910825',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0361209301','17895465464',NULL,_binary '','Kinh','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-28'),(73,'AD00042','$2a$10$HffNCkQMwfo2MkAUYAZa2uc.2TdW5bmbKNmB4QSpqVazLdMatm7.i','Đào Huy','Đức','','59b514174bffe4ae402b3d63aad79fe0.jpg',_binary '','vi','94395005279266750900',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0363105500','17895465464',NULL,_binary '','Kinh','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-13'),(74,'PH00624','$2a$10$bLHgJmWNUCCrzMe1PMjyBO3m/m8nZthq7yZohDHGUJCDZ0VpRoAM.','Đào Huy','Hoàng','huydu21c003@hocvienact.edu.vn','fd456406745d816a45cae554c788e754.jpg',_binary '\0','vi','09250693261408654747',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0363905000','17895465464','2019-05-16',_binary '','Khác','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-14'),(75,'AD00992','$2a$10$P76caHfPwrsr.Y/ODqNDkuqnJacpMb68KBy4afI9oKKEKLJYPJYOO','Chu Thị Minh','Hiền','','9dd4e461268c8034f5c8564e155c67a6.jpg',_binary '','vi','98875201186547163375',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0363219500','17895465464',NULL,_binary '','Kinh','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-08'),(76,'HV00019','$2a$10$T0lSQYRE9coExEFInOJyheoovtjnDrvjAJ9jH9Ab5Qwy.YJcGPIPq','Hà Phương','Thảo','','d3177ef218ce60fd77ca058fcf114e56.jpg',_binary '','vi','46818252465772649187',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0363425500','17895465464',NULL,_binary '','Kinh','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-09'),(77,'HV00112','$2a$10$Q9ChFOI0xhIMnuSgw11iTeLMeSPK2Uh86kJMUACk/5HzF860hOTa.','Ngô Đức','Huy','','18d23b3304ea8c3b46638fb463024197.jpeg',_binary '','vi','40591345469505876365',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0363955500','17895465464',NULL,_binary '','Kinh','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-17'),(79,'HV00219','$2a$10$o6dvkplP.ilvKalWgnjyTuJR.QajMInS0JFoZWsyfKtKyYOHytKmi','Đào Huy','Đức','huyduc567576@hocvienact.edu.vn','',_binary '\0','vi','63084590744959913136',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0363205809','17825465864','2019-05-16',_binary '\0','Khác','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-10'),(80,'HV00999','$2a$10$iVEq.2kSj.1N.BpYfgvN9eQ7aHPcJqwgWPn2iH1zs/XueIvIIDcxW','Đào Huy','Đức','huydu12c@hocvienact.edu.vn','78f35718d521c40179d0cba7daeed1ab.jpg',_binary '\0','vi','45495829085546032806',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0361125500','17895465464',NULL,_binary '\0','Khác','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-10'),(81,'HV90012','$2a$10$UvwmgiiIh13X1qkfefM6tOXdyGXDlXBwNeUUJ7BWqtJufNtfMeJUi','Đào Huy','Đức','huy21duc@hocvienact.edu.vn','78f35718d521c40179d0cba7daeed1ab.jpg',_binary '\0','vi','75235338894015903530',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0363988901','17895465464','2019-05-09',_binary '\0','Khác','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-10'),(82,'AD00901','$2a$10$ROjShUcpVmcM0Ma5umujMOplTP4nyqrn5Xlh5SQdw0S3bMCF8ivvi','Đào Huy','Đức','','e5ddc542c3f194e21f9d085a8f1f01ae.jpg',_binary '','vi','21925455121001819079',NULL,'Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','0367285900','17895465464','2019-05-09',_binary '','Khác','Thôn 4, Nông Trường, Triệu Sơn, Thanh Hóa','2019-05-25');
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
INSERT INTO `user_authority` VALUES (3,'ROLE_ADMIN'),(60,'ROLE_ADMIN'),(61,'ROLE_ADMIN'),(64,'ROLE_ADMIN'),(71,'ROLE_ADMIN'),(73,'ROLE_ADMIN'),(75,'ROLE_ADMIN'),(82,'ROLE_ADMIN'),(63,'ROLE_PARENTS'),(65,'ROLE_PARENTS'),(66,'ROLE_PARENTS'),(70,'ROLE_PARENTS'),(74,'ROLE_PARENTS'),(62,'ROLE_STUDENT'),(76,'ROLE_STUDENT'),(77,'ROLE_STUDENT'),(79,'ROLE_STUDENT'),(80,'ROLE_STUDENT'),(81,'ROLE_STUDENT');
/*!40000 ALTER TABLE `user_authority` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-23 18:02:05
