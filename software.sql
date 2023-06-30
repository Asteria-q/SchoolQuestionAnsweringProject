-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: SoftwareProj_db
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add key word',7,'add_keyword'),(26,'Can change key word',7,'change_keyword'),(27,'Can delete key word',7,'delete_keyword'),(28,'Can view key word',7,'view_keyword'),(29,'Can add tag',8,'add_tag'),(30,'Can change tag',8,'change_tag'),(31,'Can delete tag',8,'delete_tag'),(32,'Can view tag',8,'view_tag'),(33,'Can add user',9,'add_user'),(34,'Can change user',9,'change_user'),(35,'Can delete user',9,'delete_user'),(36,'Can view user',9,'view_user'),(37,'Can add question',10,'add_question'),(38,'Can change question',10,'change_question'),(39,'Can delete question',10,'delete_question'),(40,'Can view question',10,'view_question'),(41,'Can add answer',11,'add_answer'),(42,'Can change answer',11,'change_answer'),(43,'Can delete answer',11,'delete_answer'),(44,'Can view answer',11,'view_answer'),(45,'Can add reported',12,'add_reported'),(46,'Can change reported',12,'change_reported'),(47,'Can delete reported',12,'delete_reported'),(48,'Can view reported',12,'view_reported'),(49,'Can add my group',13,'add_mygroup'),(50,'Can change my group',13,'change_mygroup'),(51,'Can delete my group',13,'delete_mygroup'),(52,'Can view my group',13,'view_mygroup'),(53,'Can add user like',14,'add_userlike'),(54,'Can change user like',14,'change_userlike'),(55,'Can delete user like',14,'delete_userlike'),(56,'Can view user like',14,'view_userlike');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$390000$lBCVFKWO1nOS1E3Pmr0MUb$nQ6UdkolKf6qwtFZewl0m1FcJ07qhSPL1NQOL+mAGWI=','2023-06-05 16:02:47.475918',1,'admin','','','1931552252@qq.com',1,1,'2023-05-11 22:40:29.557738');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2023-05-12 00:16:50.283683','1','KeyWord object (1)',1,'[{\"added\": {}}]',7,1),(2,'2023-05-16 19:36:20.895582','1','Question object (1)',3,'',10,1),(3,'2023-05-16 19:50:37.417771','2','Question object (2)',3,'',10,1),(4,'2023-05-16 22:01:19.279767','1','User object (1)',3,'',9,1),(5,'2023-05-17 11:35:34.423325','2','User object (2)',3,'',9,1),(6,'2023-05-18 00:00:52.471982','1','Reported object (1)',3,'',12,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(11,'myApp','answer'),(7,'myApp','keyword'),(13,'myApp','mygroup'),(10,'myApp','question'),(12,'myApp','reported'),(8,'myApp','tag'),(9,'myApp','user'),(14,'myApp','userlike'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2023-05-11 22:09:42.531316'),(2,'auth','0001_initial','2023-05-11 22:09:42.774935'),(3,'admin','0001_initial','2023-05-11 22:09:42.843934'),(4,'admin','0002_logentry_remove_auto_add','2023-05-11 22:09:42.851936'),(5,'admin','0003_logentry_add_action_flag_choices','2023-05-11 22:09:42.858935'),(6,'contenttypes','0002_remove_content_type_name','2023-05-11 22:09:42.904935'),(7,'auth','0002_alter_permission_name_max_length','2023-05-11 22:09:42.935936'),(8,'auth','0003_alter_user_email_max_length','2023-05-11 22:09:42.954935'),(9,'auth','0004_alter_user_username_opts','2023-05-11 22:09:42.963936'),(10,'auth','0005_alter_user_last_login_null','2023-05-11 22:09:42.995936'),(11,'auth','0006_require_contenttypes_0002','2023-05-11 22:09:42.998936'),(12,'auth','0007_alter_validators_add_error_messages','2023-05-11 22:09:43.004936'),(13,'auth','0008_alter_user_username_max_length','2023-05-11 22:09:43.043075'),(14,'auth','0009_alter_user_last_name_max_length','2023-05-11 22:09:43.077075'),(15,'auth','0010_alter_group_name_max_length','2023-05-11 22:09:43.093077'),(16,'auth','0011_update_proxy_permissions','2023-05-11 22:09:43.100075'),(17,'auth','0012_alter_user_first_name_max_length','2023-05-11 22:09:43.152075'),(18,'myApp','0001_initial','2023-05-11 22:09:43.276198'),(19,'myApp','0002_alter_question_tags_alter_user_displayinfo_and_more','2023-05-11 22:09:43.348478'),(20,'myApp','0003_alter_answer_aid_alter_keyword_kid_and_more','2023-05-11 22:09:43.651478'),(21,'myApp','0004_alter_question_tags_alter_user_tags','2023-05-11 22:09:43.708478'),(22,'myApp','0005_alter_question_tags_alter_user_tags','2023-05-11 22:09:43.764479'),(23,'myApp','0006_alter_user_sex','2023-05-11 22:09:43.797478'),(24,'myApp','0007_alter_question_tags_alter_user_tags','2023-05-11 22:09:43.855479'),(25,'myApp','0008_alter_user_image','2023-05-11 22:09:43.885479'),(26,'myApp','0009_alter_question_picture','2023-05-11 22:09:43.915477'),(27,'myApp','0010_alter_question_picture','2023-05-11 22:09:43.943480'),(28,'myApp','0011_remove_reported_username','2023-05-11 22:09:43.955479'),(29,'myApp','0012_alter_user_image','2023-05-11 22:09:43.987481'),(30,'myApp','0013_alter_question_picture_alter_user_image','2023-05-11 22:09:44.033469'),(31,'myApp','0014_mygroup','2023-05-11 22:09:44.068915'),(32,'myApp','0015_question_likenum_alter_question_clicknum','2023-05-11 22:09:44.094988'),(33,'myApp','0016_userlike','2023-05-11 22:09:44.202200'),(34,'myApp','0017_rename_answer_userlike_likeanswer_and_more','2023-05-11 22:09:44.365199'),(35,'sessions','0001_initial','2023-05-11 22:09:44.386199');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('asy2mj60m4sfzjmjmunhajjvyhhm60so','.eJyVVNtum0AQ_RWLZ192YS8QpZHS17YPlVr1oUTWsjuYrTFQFmRZkf-9TLCiALFTnkaaOTvnzGXn2duqtsm2rYN6a41351Fv-daXKL2HAgPmjyp25VqXRVPbZI2Q9SXq1t9KA_nnC3aQIFMu614LIWRgEhlwHYRKE0kjzoTUTPg8YTw1QHikWYiBQEGa0gSAJEZwmhqqfUx6gKJ1Xa7fz7FXqAPE3t0i9uK4FVwSNIGAznCIgs7IRFE0jIjYW3ZA20nvn6RqkapVk61y65o-eMACHIaH2X92NfSIts5710aZgy02h9NjVW2wxs2V_MrtXR8CazBCCfHPy8WA4HsLrrH48jrJ3wtmDlEwJnos3PF2LeoFMYeEjUl-qN0thkbt5qTn4_Rf4PSrrM0tij2cjh1kDo0Y0-DQv9o9fDT4vMPMIZLnJ3Rsj2B3WYNOMgTQsZJugRkEuNXCVxyXOyLsylbf24XOlXOf4hhVrExbNmUBqEarvPuYql4ZdXIYfrjf2Ifbm4-cEpBTSpJMhLAU8HsJItJbbaqhKusGZs0jmrSJDgFh3yZVVX0uvDZ9kpF8hocgEhyvQ5go9mI0nWpxKAZHunKZhdx82BrJ_fClGYHEqfgUTRiK8P062-kZQdFvz8drefS9LRjySdDsP47akGtXl201IfMnzfaHAHJ-8s7_AKIJ4Ng:1pztSr:Wg0Wj3zUuzJVeUGufi7sMkE3WwTnJpAGzxekYNafROQ','2023-06-02 14:19:45.229558'),('r5tiwbamfb3qnvbau2dlya8j49dujdf8','.eJyVVE1vm0AQ_SsWZ3-wy8JClEZKr20PlVr1UCJrYAezNQbKgiwr8n_vTrCiALFTTiPNvJ335mPn2dlC1-bbzmCz1cq5c5izfOtLIN1jSQH1B8pdtU6rsm10sibI-hI162-VwuLzBTtIkIPJ7es0YX6aSRYFwDyGAReAqa9klKUsUkKKjGEkfcE5KmAqDEM_yzgPpRBR6iZASQ9Ydsbm-v0cOyUcMHbuFrETx13gS5eMF6A1PkaeNTIBRka4QewsLVBb6f2TDBYZrNp8VWjT9sEDFWAoPMz-09bQI7qm6F0bUAddbg6nx7reUI2bK_nB7E0fQq0owlyXn5eLAcH3Dk2r6eV1kr8XzBwib0z0WJrj7VrgBTGHRIxJfsDuFkMLuznp_XH6L3j6VTXqFsUeT0cLmUMTjGlo6F_1Hj8afGExc4jk-Ykc2yPqXd6S0x0C2FiJXWCBHm11wMGn5Y5ccWWr7_UiLcCYT3FMKlaqq9qqRFKTQmE_JjQrBSdD4Yf7jX64vfnEKZE4pXSTiRCRIX2vwA2yW21qsK6aFmfNI5q0iQ0BYd8mqOs-F12bPslIvqBDEAU-XYcwAfFiUjbVYkgMjXRlco2F-rA10ufhSzM8SVPhjEwYBuH7dXbTM0Ki356P1_LYe1sw5JOYiv84akOuXVN19YSMT5rNhwD3_OSc_wEKi-ET:1q65At:LU0j3KSiTgPVsWA3KrTnmdrFKT3A0a1EK0AJqEfM1ig','2023-06-19 16:02:47.562942');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `myapp_answer`
--

DROP TABLE IF EXISTS `myapp_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `myapp_answer` (
  `AID` int NOT NULL AUTO_INCREMENT,
  `AnsContent` longtext NOT NULL,
  `AnsTime` datetime(6) NOT NULL,
  `LikeNum` int NOT NULL,
  `QID_id` int NOT NULL,
  `UID_id` int NOT NULL,
  PRIMARY KEY (`AID`),
  KEY `myApp_answer_QID_id_50a5bd58_fk` (`QID_id`),
  KEY `myApp_answer_UID_id_46efd0cd_fk` (`UID_id`),
  CONSTRAINT `myApp_answer_QID_id_50a5bd58_fk` FOREIGN KEY (`QID_id`) REFERENCES `myapp_question` (`QID`),
  CONSTRAINT `myApp_answer_UID_id_46efd0cd_fk` FOREIGN KEY (`UID_id`) REFERENCES `myapp_user` (`UID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `myapp_answer`
--

LOCK TABLES `myapp_answer` WRITE;
/*!40000 ALTER TABLE `myapp_answer` DISABLE KEYS */;
INSERT INTO `myapp_answer` VALUES (1,'好好学没问题，相信我兄弟','2023-05-17 22:55:39.000000',1,3,3);
/*!40000 ALTER TABLE `myapp_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `myapp_keyword`
--

DROP TABLE IF EXISTS `myapp_keyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `myapp_keyword` (
  `KID` int NOT NULL AUTO_INCREMENT,
  `KeyWorldContent` varchar(20) NOT NULL,
  PRIMARY KEY (`KID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `myapp_keyword`
--

LOCK TABLES `myapp_keyword` WRITE;
/*!40000 ALTER TABLE `myapp_keyword` DISABLE KEYS */;
INSERT INTO `myapp_keyword` VALUES (1,'垃圾');
/*!40000 ALTER TABLE `myapp_keyword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `myapp_mygroup`
--

DROP TABLE IF EXISTS `myapp_mygroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `myapp_mygroup` (
  `group_ptr_id` int NOT NULL,
  PRIMARY KEY (`group_ptr_id`),
  CONSTRAINT `myApp_mygroup_group_ptr_id_b373a757_fk_auth_group_id` FOREIGN KEY (`group_ptr_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `myapp_mygroup`
--

LOCK TABLES `myapp_mygroup` WRITE;
/*!40000 ALTER TABLE `myapp_mygroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `myapp_mygroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `myapp_question`
--

DROP TABLE IF EXISTS `myapp_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `myapp_question` (
  `QID` int NOT NULL AUTO_INCREMENT,
  `QueTime` datetime(6) NOT NULL,
  `Title` varchar(50) NOT NULL,
  `QueContent` longtext NOT NULL,
  `AnswersNum` int NOT NULL,
  `ClickNum` int NOT NULL,
  `Picture` varchar(400) DEFAULT NULL,
  `Tags` bigint NOT NULL,
  `UID_id` int NOT NULL,
  `LikeNum` int NOT NULL,
  PRIMARY KEY (`QID`),
  KEY `myApp_question_UID_id_348b3a65_fk` (`UID_id`),
  CONSTRAINT `myApp_question_UID_id_348b3a65_fk` FOREIGN KEY (`UID_id`) REFERENCES `myapp_user` (`UID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `myapp_question`
--

LOCK TABLES `myapp_question` WRITE;
/*!40000 ALTER TABLE `myapp_question` DISABLE KEYS */;
INSERT INTO `myapp_question` VALUES (3,'2023-05-17 17:51:35.000000','计网考试怎么办啊','理论考试好烦啊',1,68,'',128,3,0),(4,'2023-05-17 23:05:18.000000','软工延迟了','今天软工延迟了一周，哦耶',0,5,'',66,3,0),(5,'2023-05-17 23:17:22.000000','开始卖室友','室友有信仰，人民有希望，国家才能幸福',0,34,'',9,3,0);
/*!40000 ALTER TABLE `myapp_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `myapp_reported`
--

DROP TABLE IF EXISTS `myapp_reported`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `myapp_reported` (
  `RID` int NOT NULL AUTO_INCREMENT,
  `ID` int NOT NULL,
  `Type` int NOT NULL,
  `RepTime` datetime(6) NOT NULL,
  `Reason` longtext NOT NULL,
  `isSolved` tinyint(1) NOT NULL,
  `UID_id` int NOT NULL,
  PRIMARY KEY (`RID`),
  KEY `myApp_reported_UID_id_4c881f79_fk` (`UID_id`),
  CONSTRAINT `myApp_reported_UID_id_4c881f79_fk` FOREIGN KEY (`UID_id`) REFERENCES `myapp_user` (`UID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `myapp_reported`
--

LOCK TABLES `myapp_reported` WRITE;
/*!40000 ALTER TABLE `myapp_reported` DISABLE KEYS */;
INSERT INTO `myapp_reported` VALUES (2,5,0,'2023-05-18 00:00:34.000000','敏感信息',1,3),(3,5,0,'2023-05-18 13:40:48.000000','敏感信息',1,3),(4,5,0,'2023-05-18 13:41:05.000000','涉黄',1,3),(5,5,0,'2023-05-19 14:19:35.000000','敏感信息',1,3);
/*!40000 ALTER TABLE `myapp_reported` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `myapp_tag`
--

DROP TABLE IF EXISTS `myapp_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `myapp_tag` (
  `TID` int NOT NULL AUTO_INCREMENT,
  `TagContent` longtext NOT NULL,
  PRIMARY KEY (`TID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `myapp_tag`
--

LOCK TABLES `myapp_tag` WRITE;
/*!40000 ALTER TABLE `myapp_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `myapp_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `myapp_user`
--

DROP TABLE IF EXISTS `myapp_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `myapp_user` (
  `UID` int NOT NULL AUTO_INCREMENT,
  `OpenID` varchar(60) NOT NULL,
  `UserName` varchar(50) NOT NULL,
  `Sex` varchar(2) NOT NULL,
  `Image` varchar(400) NOT NULL,
  `Grade` varchar(4) NOT NULL,
  `Profession` varchar(50) NOT NULL,
  `SelfIntro` varchar(120) NOT NULL,
  `Tags` bigint NOT NULL,
  `DisplayInfo` int NOT NULL,
  PRIMARY KEY (`UID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `myapp_user`
--

LOCK TABLES `myapp_user` WRITE;
/*!40000 ALTER TABLE `myapp_user` DISABLE KEYS */;
INSERT INTO `myapp_user` VALUES (3,'otjFq5YvlRyDe-PaUKmDm2dFXG6w','匿名用户','1','https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0','本科生','计算机技术','这个人好懒呀',46,9);
/*!40000 ALTER TABLE `myapp_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `myapp_userlike`
--

DROP TABLE IF EXISTS `myapp_userlike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `myapp_userlike` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `LikeType` int NOT NULL,
  `LikeAnswer_id` int DEFAULT NULL,
  `LikeQuestion_id` int DEFAULT NULL,
  `LikeUser_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `myApp_userlike_User_id_Answer_id_30462666_uniq` (`LikeUser_id`,`LikeAnswer_id`),
  UNIQUE KEY `myApp_userlike_User_id_Question_id_93d64ba7_uniq` (`LikeUser_id`,`LikeQuestion_id`),
  KEY `myApp_userlike_LikeAnswer_id_7648526f_fk_myApp_answer_AID` (`LikeAnswer_id`),
  KEY `myApp_userlike_LikeQuestion_id_a0cde2f3_fk_myApp_question_QID` (`LikeQuestion_id`),
  CONSTRAINT `myApp_userlike_LikeAnswer_id_7648526f_fk_myApp_answer_AID` FOREIGN KEY (`LikeAnswer_id`) REFERENCES `myapp_answer` (`AID`),
  CONSTRAINT `myApp_userlike_LikeQuestion_id_a0cde2f3_fk_myApp_question_QID` FOREIGN KEY (`LikeQuestion_id`) REFERENCES `myapp_question` (`QID`),
  CONSTRAINT `myApp_userlike_LikeUser_id_c8c34e74_fk_myApp_user_UID` FOREIGN KEY (`LikeUser_id`) REFERENCES `myapp_user` (`UID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `myapp_userlike`
--

LOCK TABLES `myapp_userlike` WRITE;
/*!40000 ALTER TABLE `myapp_userlike` DISABLE KEYS */;
INSERT INTO `myapp_userlike` VALUES (6,1,1,NULL,3);
/*!40000 ALTER TABLE `myapp_userlike` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-06 11:12:32
