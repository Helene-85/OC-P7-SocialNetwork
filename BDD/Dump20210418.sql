-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `message_id` int NOT NULL,
  `comment` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comments_users1_idx` (`user_id`),
  KEY `fk_comments_messages1_idx` (`message_id`),
  CONSTRAINT `fk_comments_messages1` FOREIGN KEY (`message_id`) REFERENCES `messages` (`id`),
  CONSTRAINT `fk_comments_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (19,3,24,'Super idée ! Hâte de partager avec les collègues !','2021-03-30 16:37:50','2021-03-30 16:37:50'),(22,1,25,'Bienvenue Tigrou !','2021-03-30 16:50:27','2021-03-30 16:50:27'),(23,25,24,'Formidable !','2021-03-30 16:53:15','2021-03-30 16:53:15'),(24,3,27,'Wahou je ne savais pas pour l\'élixir de longue vie ! Je comprends mieux pour son âge !','2021-03-31 23:13:44','2021-03-31 23:13:44'),(25,8,28,'OK Rogue, on fera attention :) Et toi souris un peu aussi mec !','2021-03-31 23:18:51','2021-03-31 23:18:51'),(26,8,27,'Ouais je ne sais pas si on peut faire confiance à internet...','2021-03-31 23:19:20','2021-03-31 23:19:20'),(27,8,26,'Trop mignonne cette loutre !','2021-03-31 23:19:42','2021-03-31 23:19:42'),(28,8,25,'Ouais non en fait, la méthode en cascade est tellement meilleure !','2021-03-31 23:20:07','2021-03-31 23:20:07'),(29,8,24,'Merci merci, en espérant que ce ne soit pas l\'occasion de nous espionner...','2021-03-31 23:20:28','2021-03-31 23:20:28'),(30,10,30,'Et moi le triple héhé ^^','2021-03-31 23:23:21','2021-03-31 23:23:21'),(31,10,29,'Entièrement d\'accord avec toi. Rien que ce matin, le feu en bas de l\'immeuble est resté rouge 4 minutes et 32 secondes et je ne sais pas pourquoi.','2021-03-31 23:24:27','2021-03-31 23:24:27'),(32,25,30,'En 1985 le café était beaucoup moins cher. J\'y vais régulièrement pour faire mes courses.','2021-03-31 23:25:51','2021-03-31 23:25:51'),(35,27,28,'Je suis d\'accord Rogue, je propose que ce midi on joue au roi du silence ! Ça te dit ?','2021-03-31 23:43:58','2021-03-31 23:43:58'),(36,27,26,'Quelle étrange créature. Est-elle au moins capable de voyager dans l\'espace-temps ?','2021-03-31 23:44:39','2021-03-31 23:44:39'),(37,27,24,'Quelle initiative sensationnelle vraiment vous m\'épatez !','2021-03-31 23:45:16','2021-03-31 23:45:16'),(39,1,30,'N\'hésitez pas à aller dans le nouveau tea lounge aussi ;)','2021-03-31 23:47:15','2021-03-31 23:47:15'),(41,1,27,'Très beau travail de recherche Hermione !','2021-03-31 23:48:06','2021-03-31 23:48:06'),(42,1,26,'Magnifique cette petite créature :)','2021-03-31 23:48:30','2021-03-31 23:48:30'),(43,1,25,'Tigrou votre enthousiasme fait plaisir à lire !','2021-03-31 23:49:59','2021-03-31 23:49:59'),(44,5,30,'Je préfère le café avec de l\'épice !','2021-04-01 20:36:03','2021-04-01 20:36:03'),(47,27,29,'On sait très bien pourquoi ! Parce qu\'il faut attendre un point c\'est tout. Vous allez trop loin vraiment.','2021-04-06 17:35:37','2021-04-06 17:35:37'),(48,3,35,'Je suis bien d\'accord avec toi ! Cependant je ne peux pas m\'empêcher de sauter partout !','2021-04-14 10:40:50','2021-04-14 10:40:50'),(49,3,34,'Magnifique comme le miel !','2021-04-14 10:41:13','2021-04-14 10:41:13'),(50,6,37,'Bienvenue Julie Zilla !!! Trop canon ton dinosaure ! On dirait un Magyar à pointes !','2021-04-14 10:50:56','2021-04-14 10:50:56');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message_reaction_user`
--

DROP TABLE IF EXISTS `message_reaction_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message_reaction_user` (
  `user_id` int NOT NULL,
  `message_id` int NOT NULL,
  `reaction_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`message_id`,`reaction_id`),
  KEY `fk_reactions_users1_idx` (`user_id`),
  KEY `fk_reactions_messages1_idx` (`message_id`),
  KEY `fk_reactions_reactions1_idx` (`reaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message_reaction_user`
--

LOCK TABLES `message_reaction_user` WRITE;
/*!40000 ALTER TABLE `message_reaction_user` DISABLE KEYS */;
INSERT INTO `message_reaction_user` VALUES (1,17,1),(1,19,1),(1,21,1),(1,25,1),(1,26,1),(1,27,1),(1,28,1),(1,29,1),(1,30,1),(1,31,1),(1,34,1),(3,17,1),(3,19,2),(3,21,1),(3,24,1),(3,25,1),(3,26,1),(3,27,1),(3,34,1),(3,35,2),(3,37,1),(3,38,1),(5,24,1),(5,25,1),(5,27,1),(5,28,2),(5,29,1),(5,31,1),(6,24,1),(6,25,2),(6,26,1),(6,37,1),(7,24,2),(7,25,2),(7,26,2),(7,27,2),(8,24,1),(8,25,2),(8,26,1),(8,27,1),(10,24,1),(10,25,1),(10,26,1),(10,28,1),(10,29,1),(10,30,1),(25,24,2),(25,25,2),(25,26,1),(25,27,1),(25,28,2),(25,29,1),(25,30,1),(25,37,1),(27,24,1),(27,25,1),(27,26,1),(27,27,2),(27,28,1),(27,29,2),(27,30,2),(31,24,1),(31,25,1),(31,26,1),(31,27,1),(31,29,1),(31,30,1),(31,34,1),(31,35,1);
/*!40000 ALTER TABLE `message_reaction_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_messages_users1_idx` (`user_id`),
  CONSTRAINT `fk_messages_users1_idx` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (24,1,'Bienvenue sur Groupo’Link :)\nVous pouvez dès à présent partager des messages, avec ou sans images et commenter les messages de vos collègues.\nEn tant qu’administratrice du réseau social Groupo’Link, je veillerai au respect des individus et de l’entreprise.\nMerci de rester bienveillant à l’égard de vos collaborateurs et de Groupomania.\nEn cas de non respect de ces quelques règles, je me réserve le droit de supprimer tout message ou commentaire inadéquat.','http://localhost:3000/images/welcome1617113496058.jpg','2021-03-30 16:11:36','2021-03-30 16:11:36',1),(25,3,'Bonjour :) En forme pour une nouvelle semaine méthode agile !! ','http://localhost:3000/images/tigrouPost1617115771500.jpeg','2021-03-30 16:49:31','2021-03-30 16:49:31',1),(26,5,'Savez-vous qu\'à l\'instar du corbeau ou de l\'éléphant, la loutre fait partie du club très fermé des animaux qui peuvent se servir d\'outils? Dans le monde animal, cette caractéristique est le signe d\'une grande intelligence <3','http://localhost:3000/images/message001617224671162.jpeg','2021-03-31 23:04:31','2021-03-31 23:04:31',1),(27,6,'Oh lala ça fait une heure que je fais des recherches sur internet pour comprendre qui est Nicolas Flamel... Bon, en fait, Nicolas Flamel est un alchimiste français qui a fabriqué la Pierre philosophale, une pierre permettant de transformer n\'importe quel métal en or et de rendre immortel grâce à l\'élixir de longue vie... ','http://localhost:3000/images/message011617225137110.jpeg','2021-03-31 23:12:17','2021-03-31 23:12:17',1),(28,7,'Je n\'en peux plus de tout ce bruit à la cantine.. S\'il vous plait, ouvrez la page 394 et mangez en silence :/','http://localhost:3000/images/message071617225359466.jpeg','2021-03-31 23:15:59','2021-03-31 23:15:59',0),(29,8,'Ce qu’ils veulent, je vais vous dire : c’est que l’informatique soit fondue dans les comportements. Ils veulent une techno sans couture, qu’on remarque plus, qu’on sente plus. La meilleure des technos, c’est la techno qui disparaît. « Tout se contente de fonctionner », voilà. Comme ça, tu peux pas te plaindre. Tu peux râler sur personne. Tu sais même plus pourquoi le feu reste au rouge alors que t’attends depuis cinq bonnes minutes !','http://localhost:3000/images/message081617225481646.jpeg','2021-03-31 23:18:01','2021-03-31 23:18:01',1),(30,9,'Chaque jour, plus de deux milliards de tasses de café sont bues dans le monde. Cela représente près de 1684 tasses bues chaque seconde ! Si toutes les personnes étaient comme moi, ce serait au moins le double !','http://localhost:3000/images/message041617225754023.jpeg','2021-03-31 23:22:34','2021-03-31 23:22:34',1),(34,27,'Je voulais partager ces incroyables couleurs avec vous :) Elles me fascinent !!','http://localhost:3000/images/steinar-engeland-UtEUUNHvMLs-unsplash1617722444148.jpeg','2021-04-06 17:20:44','2021-04-06 17:20:44',1),(35,7,'Je n\'en peux plus de tout ce bruit à la cantine... S\'il vous plait, ouvrez la page 394 et mangez en silence :/','http://localhost:3000/images/message071618327938862.jpeg','2021-04-13 17:32:19','2021-04-13 17:32:19',1),(36,3,'Marre de Groupamania !',NULL,'2021-04-14 10:43:06','2021-04-14 10:43:06',0),(37,30,'Salut Salut moi c\'est Julie Zilla !!','http://localhost:3000/images/71EiDOa5vFL1618390182489._AC_SY355_','2021-04-14 10:49:42','2021-04-14 10:49:42',1),(38,31,'Hello World ! Je suis Chanou et j\'adore les tortures ! Je suis allée aux Galapagos pour en sauver :)','http://localhost:3000/images/tortue1618404458023.webp','2021-04-14 14:47:38','2021-04-14 14:47:38',1),(39,33,'Coucou moi c\'est Géraldine !!',NULL,'2021-04-18 12:04:37','2021-04-18 12:04:37',1);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reaction_type_id`
--

DROP TABLE IF EXISTS `reaction_type_id`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reaction_type_id` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reaction` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reaction_type_id`
--

LOCK TABLES `reaction_type_id` WRITE;
/*!40000 ALTER TABLE `reaction_type_id` DISABLE KEYS */;
INSERT INTO `reaction_type_id` VALUES (1,'like'),(2,'dislike');
/*!40000 ALTER TABLE `reaction_type_id` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(55) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profilPic` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `uniqueEmail` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin Hélène','admin@mail.com','$2b$10$QLSWBbzw6MP7erBN5AmPS..roCPxWW1agD8YG7S3.dtTKAMfOJRU6','photo_helene_bunel1617099783629.jpg',1,1),(3,'Tigroudou','tigrou@mail.com','$2b$10$rZWxoIq9ggnUaU5.owWDUOwomshmXRWfu10G1lS7crJ3f/gHZjon.','tigrou1617225187102.jpg',0,1),(5,'Shani','shani@mail.com','$2b$10$8Lq.VsNi3HE2dSxQevPgy.DDXhWv8/PI1paSmR8nvgZHHxjnv2Deu','shani1617302115898.jpg',0,1),(6,'Hermione','hermione@mail.com','$2b$10$N1C46RgCNlX0kfIVWWrLA.AlbSBfPKpan/JUSMJBg6PkAZ9J/gjeK','hermione1617224798669.jpg',0,1),(7,'Rogue','rogue@mail.com','$2b$10$SBpyFoa7whqYrGE2pL0N4u1kYRW4ETVqjH.IQn.NrHDLaZQ2fHfSy','rogue1617225275041.jpg',0,1),(8,'Lorca','lorca@mail.com','$2b$10$zX1TWWx4N8GFN.M0DU2tP.4zfF8LDyXMOgBcegVHsy5wng2Aze8q.','lorca1617225503210.jpg',0,1),(9,'Saskia','saskia@mail.com','$2b$10$fHzHrDnF7HYnlZJGwd4pBehlACmIvQAEP6E2T6wJIXlM/7f/LzJ9i','saskia1617225658500.jpg',0,1),(10,'Hernan','hernan@mail.com','$2b$10$uba.qUOzxGQEV.2uuPXk.ulXjfGkYjTpkcsBn4nI2RXfYOEDu9Ws6','hernan1617225787284.jpg',0,1),(25,' Dr. Emmett Brown','doc@mail.com','$2b$10$9cBuForgs7NKRDNH9mrIW.AEWAxKc21hvnyVKGQGUNTcU4UXPMgRK','doc1617225917081.jpeg',0,1),(27,'Michael Burnham','mika@mail.com','$2b$10$dl9sftvV0QqfPmFgi8o7seTXFzClxkyDl8hWj87RDKkP4KNQ/ZLsu','Michael_Burnham1617226860554.png',0,1),(30,'Julie Zilla','julie@mail.com','$2b$10$iP0M1HfcmT9786tEFjIqsOXztt6i9YOLUT58bSmkiT9Tjy6o1WrcO','Capture_d’écran_2021-04-14_à_101618390061845.47',0,1),(31,'Chanou','chanou@mail.com','$2b$10$lTaWNe/fIjHx0Ujf20cxk.bCmMPfpvHfBuYzsWHu09/WVSdIyHyRS','chanou1618404414088.webp',0,1),(33,'Géraldine','gege@mail.com','$2b$10$.a/JBKfxnWj8eaGdqTPFt.ti6jQ.XYEzpJ6zE582nhf5DAEWAI.0G','tortue1618740249729.webp',0,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-18 12:14:03
