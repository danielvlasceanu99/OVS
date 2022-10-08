-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: ovswebdb
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `app_user`
--

DROP TABLE IF EXISTS `app_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `enabled` bit(1) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `locked` bit(1) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_user`
--

LOCK TABLES `app_user` WRITE;
/*!40000 ALTER TABLE `app_user` DISABLE KEYS */;
INSERT INTO `app_user` VALUES (1,'emailmarius@gmail.com',_binary '','Gorzko','Marius',_binary '\0','$2a$10$MSVKQo94dgKjoae.k2rfkOOYYrwHEOmdNMUL7/W5Bklf6JE43mOJq',NULL);
/*!40000 ALTER TABLE `app_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car` (
  `id` bigint NOT NULL,
  `available` int DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `car_type` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `manufacturing_year` int DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `number_of_doors` int DEFAULT NULL,
  `traction_type` varchar(255) DEFAULT NULL,
  `engine_id` int DEFAULT NULL,
  `transmission_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnednv54lgu9rfucgemr5eal0j` (`engine_id`),
  KEY `FKdvm7535riwqbql65a4otb50yh` (`transmission_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` VALUES (1,70,'BMW','SEDAN','white',2021,'i4 eDrive40',5,'AWD',1,1),(2,30,'BMW','SEDAN','gray',2022,'i7 xDrve60',5,'AWD',2,1),(3,80,'BWM','HATCHBACK','white',2021,'Series 2 Active Tourer',5,'AWD',3,2),(4,45,'BMW','SEDAN','black',2022,'S7453 ',5,'AWD',6,3),(5,20,'BMW','SPORTS','white',2022,'M4 CSL',3,'RWD',4,4),(6,76,'BMW','SEDAN','gray',2021,'S6 GT',5,'RWD',5,5),(7,100,'Dacia','HATCHBACK','white',2021,'Spring',4,'FWD',7,1),(8,55,'Dacia','SUV','blue',2021,'Duster',5,'AWD',8,6),(9,65,'Dacia','HATCHBACK','red',2021,'Sandero',5,'FWD',9,7),(10,85,'Dacia','SUV','yellow',2022,'Stepway',5,'FWD',9,6);
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_sequence`
--

DROP TABLE IF EXISTS `car_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_sequence`
--

LOCK TABLES `car_sequence` WRITE;
/*!40000 ALTER TABLE `car_sequence` DISABLE KEYS */;
INSERT INTO `car_sequence` VALUES (11);
/*!40000 ALTER TABLE `car_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confirmation_token`
--

DROP TABLE IF EXISTS `confirmation_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `confirmation_token` (
  `id` bigint NOT NULL,
  `confirmed_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `expires_at` datetime NOT NULL,
  `token` varchar(255) NOT NULL,
  `app_user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKo9fl25wqyh7w7mnfkdqen1rcm` (`app_user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confirmation_token`
--

LOCK TABLES `confirmation_token` WRITE;
/*!40000 ALTER TABLE `confirmation_token` DISABLE KEYS */;
INSERT INTO `confirmation_token` VALUES (1,'2022-06-03 09:34:36','2022-06-03 09:32:20','2022-06-03 09:47:20','b95ffc2f-69d7-4f1b-9b3b-ff2a048506ad',1);
/*!40000 ALTER TABLE `confirmation_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confirmation_token_sequence`
--

DROP TABLE IF EXISTS `confirmation_token_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `confirmation_token_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confirmation_token_sequence`
--

LOCK TABLES `confirmation_token_sequence` WRITE;
/*!40000 ALTER TABLE `confirmation_token_sequence` DISABLE KEYS */;
INSERT INTO `confirmation_token_sequence` VALUES (2);
/*!40000 ALTER TABLE `confirmation_token_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `electric_engine`
--

DROP TABLE IF EXISTS `electric_engine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `electric_engine` (
  `id` bigint NOT NULL,
  `battery_capacity` int DEFAULT NULL,
  `motor_range` int DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `electric_engine`
--

LOCK TABLES `electric_engine` WRITE;
/*!40000 ALTER TABLE `electric_engine` DISABLE KEYS */;
INSERT INTO `electric_engine` VALUES (1,80,550,'DCSM'),(2,30,135,'BDCM'),(3,100,625,'DCSM'),(4,17,135,'BDCM'),(5,30,230,'DCSM');
/*!40000 ALTER TABLE `electric_engine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `electric_engine_sequence`
--

DROP TABLE IF EXISTS `electric_engine_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `electric_engine_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `electric_engine_sequence`
--

LOCK TABLES `electric_engine_sequence` WRITE;
/*!40000 ALTER TABLE `electric_engine_sequence` DISABLE KEYS */;
INSERT INTO `electric_engine_sequence` VALUES (6);
/*!40000 ALTER TABLE `electric_engine_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `engine`
--

DROP TABLE IF EXISTS `engine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `engine` (
  `id` int NOT NULL,
  `horse_power` int DEFAULT NULL,
  `torque` int DEFAULT NULL,
  `electric_engine_id` bigint DEFAULT NULL,
  `fuel_engine_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9ebwiygww7cnukrfsqej5gcm4` (`electric_engine_id`),
  KEY `FKq6jiyhe9wov3i5bu9j2k0lj2o` (`fuel_engine_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `engine`
--

LOCK TABLES `engine` WRITE;
/*!40000 ALTER TABLE `engine` DISABLE KEYS */;
INSERT INTO `engine` VALUES (1,340,430,1,NULL),(2,544,745,3,NULL),(3,136,250,2,1),(4,480,550,NULL,2),(5,256,400,NULL,3),(6,300,470,4,4),(7,51,65,5,NULL),(8,150,250,NULL,5),(9,90,130,NULL,6);
/*!40000 ALTER TABLE `engine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `engine_sequence`
--

DROP TABLE IF EXISTS `engine_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `engine_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `engine_sequence`
--

LOCK TABLES `engine_sequence` WRITE;
/*!40000 ALTER TABLE `engine_sequence` DISABLE KEYS */;
INSERT INTO `engine_sequence` VALUES (10);
/*!40000 ALTER TABLE `engine_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fuel_engine`
--

DROP TABLE IF EXISTS `fuel_engine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fuel_engine` (
  `id` bigint NOT NULL,
  `co2emissions` float DEFAULT NULL,
  `displacement` float DEFAULT NULL,
  `engine_layout` varchar(255) DEFAULT NULL,
  `fuel_consumption` float DEFAULT NULL,
  `fuel_type` varchar(255) DEFAULT NULL,
  `has_supercharge` bit(1) DEFAULT NULL,
  `has_turbine` bit(1) DEFAULT NULL,
  `number_of_cylinders` int DEFAULT NULL,
  `stroke_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fuel_engine`
--

LOCK TABLES `fuel_engine` WRITE;
/*!40000 ALTER TABLE `fuel_engine` DISABLE KEYS */;
INSERT INTO `fuel_engine` VALUES (1,150,1.5,'INLINE',6.5,'GASOLINE',_binary '\0',_binary '\0',4,'FOUR_STROKE'),(2,228,3,'INLINE',10,'GASOLINE',_binary '\0',_binary '\0',6,'FOUR_STROKE'),(3,160,2,'INLINE',7.2,'GASOLINE',_binary '\0',_binary '\0',4,'FOUR_STROKE'),(4,45,3,'INLINE',2,'GASOLINE',_binary '\0',_binary '\0',6,'FOUR_STROKE'),(5,155,1.3,'INLINE',6.8,'GASOLINE',_binary '\0',_binary '\0',4,'FOUR_STROKE'),(6,120,1,'INLINE',5.3,'GASOLINE',_binary '\0',_binary '\0',3,'FOUR_STROKE');
/*!40000 ALTER TABLE `fuel_engine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fuel_engine_sequence`
--

DROP TABLE IF EXISTS `fuel_engine_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fuel_engine_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fuel_engine_sequence`
--

LOCK TABLES `fuel_engine_sequence` WRITE;
/*!40000 ALTER TABLE `fuel_engine_sequence` DISABLE KEYS */;
INSERT INTO `fuel_engine_sequence` VALUES (7);
/*!40000 ALTER TABLE `fuel_engine_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (3);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id` int NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKe2l07hc93u2bbjnl80meu3rn4` (`post_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (1,'BMW_i4_eDrive40-01.jpg',1),(2,'BMW_i4_eDrive40-02.jpg',1),(3,'BMW_i4_eDrive40-03.jpg',1),(4,'BMW_i4_eDrive40-05.jpg',1),(5,'1920px-2019_BMW_740Li_Automatic_facelift_3.0.jpg',2),(6,'2-test-bmw-seria2-active-tourer-1.jpg',3),(7,'3-test-bmw-seria2-active-tourer-2.jpg',3),(8,'12-test-bmw-seria2-active-tourer-11.jpg',3),(13,'P90461764_lowRes_the-new-bmw-m4-csl-n.jpg',5),(12,'P90461762_lowRes_the-new-bmw-m4-csl-n.jpg',5),(14,'P90461767_lowRes_the-new-bmw-m4-csl-n.jpg',5),(15,'Dacia_Spring_Electric-01.jpg',7),(16,'Dacia_Spring_Electric-02.jpg',7),(17,'2ad3a38e24.webp',8),(18,'761183b242.webp',8),(19,'f9cc39cc30.webp',8),(20,'s1.webp',9),(21,'s2.webp',9),(22,'s3.webp',9),(23,'st1.webp',10),(24,'st2.webp',10),(25,'st3.webp',10);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image_sequence`
--

DROP TABLE IF EXISTS `image_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_sequence`
--

LOCK TABLES `image_sequence` WRITE;
/*!40000 ALTER TABLE `image_sequence` DISABLE KEYS */;
INSERT INTO `image_sequence` VALUES (26);
/*!40000 ALTER TABLE `image_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `car_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf35l8fa4iudwnb24scxpo79li` (`car_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'Primul Gran Coupé pur electric, noul BMW i4 oferă o dinamică remarcabilă, un nivel ridicat de confort şi calităţile ideale pentru a-l face automobilul tău de zi cu zi.',52955,'BMW i4 eDrive40',1),(2,'Primul BMW i7 integral electric combină performanţele electrice cu divertismentul multisenzorial pentru a produce o experienţă automobilistică de neuitat.',120000,'BMW i7 xDrve60',2),(3,'Cele mai importante date şi cifre pentru noul BMW Seria 2 Active Tourer: află mai multe despre motorizări, consumul de combustibil, emisiile de CO2 şi dimensiunile automobilului. Verifică toate datele despre performanţă, precum cilindree, cai putere.',32904,'BWM Series 2 Active Tourer',3),(4,'Bucură-te de performanţe uimitoare, savurează fiecare moment. BMW Seria 7 Sedan înseamnă prezenţă sigură pe sine, performanţă excepţională şi confort maxim. Iar noul BMW 750Li, propulsat de un motor pe benzină TwinPower.',101686,'BMW S7453 ',4),(5,'Cea mai performanta versiune a noului model M4, M4 CSL este o versiune aniversara ',141000,'BMW M4 CSL',5),(6,'Sofisticat din fiecare punct de vedere: BMW Seria 6 Gran Turismo oferă design unic şi elegant, confort optim în călătorii şi dinamică de condus încrezătoare.',64439,'BMW S6 GT',6),(7,'Dacia Spring se remarcă printr-un stil dinamic și o motorizare 100% electrică. Acest vehicul dispune de toate calitățile specifice mărcii Dacia pentru un plus de fiabilitate în utilizarea zilnică.',20900,'Dacia Spring',7),(8,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',15500,'Dacia Duster',8),(9,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',13200,'Dacia Sandero',9),(10,'Lorem ipsum something edit it later',13650,'Dacia Stepway',10);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_sequence`
--

DROP TABLE IF EXISTS `post_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_sequence`
--

LOCK TABLES `post_sequence` WRITE;
/*!40000 ALTER TABLE `post_sequence` DISABLE KEYS */;
INSERT INTO `post_sequence` VALUES (11);
/*!40000 ALTER TABLE `post_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refreshtoken`
--

DROP TABLE IF EXISTS `refreshtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refreshtoken` (
  `id` bigint NOT NULL,
  `expiry_date` datetime NOT NULL,
  `token` varchar(255) NOT NULL,
  `app_user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5dsvlaqe85u9s7pvnllq1b8hb` (`app_user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refreshtoken`
--

LOCK TABLES `refreshtoken` WRITE;
/*!40000 ALTER TABLE `refreshtoken` DISABLE KEYS */;
INSERT INTO `refreshtoken` VALUES (1,'2022-06-03 09:37:16','5c0e4b78-f608-412c-8c60-c271d70dfbcd',1),(2,'2022-06-03 15:35:39','41fc3c55-b51c-4b90-a47a-d2d7ab9d4294',1);
/*!40000 ALTER TABLE `refreshtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'USER'),(2,'ADMIN');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` bigint NOT NULL,
  `date` date DEFAULT NULL,
  `price` double DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmrmfqoj19b6njf9alg95nm0g5` (`post_id`),
  KEY `FKegwwjgvn1w2a7ce5b1v63ym4x` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_sequence`
--

DROP TABLE IF EXISTS `transaction_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_sequence`
--

LOCK TABLES `transaction_sequence` WRITE;
/*!40000 ALTER TABLE `transaction_sequence` DISABLE KEYS */;
INSERT INTO `transaction_sequence` VALUES (1);
/*!40000 ALTER TABLE `transaction_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transmission`
--

DROP TABLE IF EXISTS `transmission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transmission` (
  `id` bigint NOT NULL,
  `number_of_gears` int DEFAULT NULL,
  `transmission_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transmission`
--

LOCK TABLES `transmission` WRITE;
/*!40000 ALTER TABLE `transmission` DISABLE KEYS */;
INSERT INTO `transmission` VALUES (1,1,'AUTOMATIC'),(2,7,'DUALCLUTCH'),(3,7,'AUTOMATIC'),(4,8,'DUALCLUTCH'),(5,8,'AUTOMATIC'),(6,6,'MANUAL'),(7,5,'MANUAL');
/*!40000 ALTER TABLE `transmission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transmission_sequence`
--

DROP TABLE IF EXISTS `transmission_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transmission_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transmission_sequence`
--

LOCK TABLES `transmission_sequence` WRITE;
/*!40000 ALTER TABLE `transmission_sequence` DISABLE KEYS */;
INSERT INTO `transmission_sequence` VALUES (8);
/*!40000 ALTER TABLE `transmission_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `app_user_id` bigint NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`app_user_id`,`role_id`),
  KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,2);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-03 15:59:55
