-- MySQL dump 10.17  Distrib 10.3.23-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: delilahResto
-- ------------------------------------------------------
-- Server version	10.3.23-MariaDB-1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `Descripcion_pedidos`
--

LOCK TABLES `Descripcion_pedidos` WRITE;
/*!40000 ALTER TABLE `Descripcion_pedidos` DISABLE KEYS */;
INSERT INTO `Descripcion_pedidos` VALUES (1,1,2,1,'2020-09-21 03:38:52','2020-09-21 03:38:52'),(2,1,1,3,'2020-09-21 03:38:52','2020-09-21 03:38:52'),(3,2,4,1,'2020-09-21 03:39:05','2020-09-21 03:39:05'),(4,2,10,2,'2020-09-21 03:39:05','2020-09-21 03:39:05'),(5,3,10,1,'2020-09-21 03:39:44','2020-09-21 03:39:44'),(6,3,7,2,'2020-09-21 03:39:44','2020-09-21 03:39:44'),(7,4,6,2,'2020-09-21 03:41:34','2020-09-21 03:41:34'),(8,4,2,1,'2020-09-21 03:41:34','2020-09-21 03:41:34'),(9,4,1,1,'2020-09-21 03:41:34','2020-09-21 03:41:34');
/*!40000 ALTER TABLE `Descripcion_pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Estados`
--

LOCK TABLES `Estados` WRITE;
/*!40000 ALTER TABLE `Estados` DISABLE KEYS */;
INSERT INTO `Estados` VALUES (1,'NUEVO','2020-09-20 18:06:08','2020-09-20 18:19:35'),(2,'Entregado','2020-09-20 18:06:08','2020-09-20 18:06:08'),(3,'Preparando','2020-09-20 18:06:08','2020-09-20 18:06:08'),(4,'Enviando','2020-09-20 18:06:08','2020-09-20 18:06:08'),(5,'Confirmado','2020-09-20 18:06:08','2020-09-20 18:06:08');
/*!40000 ALTER TABLE `Estados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Favoritos`
--

LOCK TABLES `Favoritos` WRITE;
/*!40000 ALTER TABLE `Favoritos` DISABLE KEYS */;
INSERT INTO `Favoritos` VALUES (1,3,3,'2020-09-20 21:46:16','2020-09-20 21:46:16'),(2,3,4,'2020-09-20 21:46:29','2020-09-20 21:46:29'),(3,3,10,'2020-09-20 21:46:34','2020-09-20 21:46:34'),(5,5,2,'2020-09-20 21:51:36','2020-09-20 21:51:36'),(6,5,8,'2020-09-20 21:51:42','2020-09-20 21:51:42');
/*!40000 ALTER TABLE `Favoritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `FormaDePagos`
--

LOCK TABLES `FormaDePagos` WRITE;
/*!40000 ALTER TABLE `FormaDePagos` DISABLE KEYS */;
INSERT INTO `FormaDePagos` VALUES (1,'Efectivo','2020-09-20 18:06:08','2020-09-20 18:06:08'),(2,'Tarjeta','2020-09-20 18:06:08','2020-09-20 18:06:08');
/*!40000 ALTER TABLE `FormaDePagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Pedidos`
--

LOCK TABLES `Pedidos` WRITE;
/*!40000 ALTER TABLE `Pedidos` DISABLE KEYS */;
INSERT INTO `Pedidos` VALUES (1,1,3,1,'2020-09-21 03:38:52','2020-09-21 03:38:52'),(2,1,3,1,'2020-09-21 03:39:05','2020-09-21 03:39:05'),(3,1,3,1,'2020-09-21 03:39:44','2020-09-21 03:39:44'),(4,1,5,1,'2020-09-21 03:41:34','2020-09-21 03:41:34');
/*!40000 ALTER TABLE `Pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Platos`
--

LOCK TABLES `Platos` WRITE;
/*!40000 ALTER TABLE `Platos` DISABLE KEYS */;
INSERT INTO `Platos` VALUES (1,'Hamburguesa con queso',6000,'Jugosa carne 100% de res de 125 gramos, con queso mozzarella delicioso, verduras y salsas.','https://dummyimage.com/150x150/000/fff','2020-09-20 20:39:37','2020-09-20 20:39:37'),(2,'Hamburguesa con queso y Tocineta',8000,'100% carne de res, con queso mozzarella, tocineta, verduras y salsas.','https://dummyimage.com/150x150/000/fff','2020-09-20 20:40:31','2020-09-20 20:40:31'),(3,'Hamburguesa Pollo',6000,'Jugosa pechuga de pollo a la plancha de 154 gramos, con salsa BBQ, verduras y mayonesa.','https://dummyimage.com/150x150/000/fff','2020-09-20 20:40:51','2020-09-20 20:40:51'),(4,'Hamburguesa Todo Terreno',12000,'Doble carne 100% de res de 1/2 libra a la parrilla, con tocineta, queso mozzarella, verduras, pepinillos y salsa BBQ.','https://dummyimage.com/150x150/000/fff','2020-09-20 20:41:18','2020-09-20 20:41:18'),(5,'A la parrilla',10000,'1/3 de libra, 100% carne de res a la parrilla con salsa BBQ, tocineta, queso americano, cebolla en pétalos y salsas.','https://dummyimage.com/150x150/000/fff','2020-09-20 20:41:42','2020-09-20 20:41:42'),(6,'Hamburguesa Mexicana',10000,'Pechuga de pollo de 154 gramos, frijol refrito, delicioso guacamole, tortillas de maíz, lechuga, tomate, mayonesa y pan tipo brioche.','https://dummyimage.com/150x150/000/fff','2020-09-20 20:42:14','2020-09-20 20:42:14'),(7,'Hamburguesa Hawaiana',8000,'Jugosa carne 100% de res de 125 gramos, queso mozzarella, dulce piña, lechuga fresca y salsas.','https://dummyimage.com/150x150/000/fff','2020-09-20 20:42:31','2020-09-20 20:42:31'),(8,'Hamburguesa Criolla',8000,'Jugosa carne 100% de res de 125 gramos, queso mozzarella, huevo frito, cebolla grillé, tomate, fresca lechuga y salsas.','https://dummyimage.com/150x150/000/fff','2020-09-20 20:42:52','2020-09-20 20:42:52'),(9,'Hamburguesa Callejera',8000,'Jugosa carne 100% de res de 125 gramos, queso mozzarella, papas chip, salsas y pan ajonjolí.','https://dummyimage.com/150x150/000/fff','2020-09-20 20:43:10','2020-09-20 20:43:10'),(10,'Hamburguesa Doble Doble',12000,'Dos jugosas carnes 100% de res de 90 gramos cada una, dos tajadas de queso mozzarella, cebolla caramelizada, lechuga fresca, tomate fresco, mayonesa y pan ajonjolí.','https://dummyimage.com/150x150/000/fff','2020-09-20 20:43:30','2020-09-20 20:43:30'),(11,'Wrap Pollo',12000,'Deliciosa pechuga de pollo de 154 gramos asada a la parrilla, lechuga, tomate, cebolla y mayonesa.','https://dummyimage.com/150x150/000/fff','2020-09-20 20:44:26','2020-09-20 20:44:26'),(12,'Picada',21200,'125 gramos de lomo de res, 160 gramos de pollo y crujientes cascos de papa acompañado de un delicioso aderezo.','https://dummyimage.com/150x150/000/fff','2020-09-20 20:45:10','2020-09-20 20:45:10');
/*!40000 ALTER TABLE `Platos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Roles`
--

LOCK TABLES `Roles` WRITE;
/*!40000 ALTER TABLE `Roles` DISABLE KEYS */;
INSERT INTO `Roles` VALUES (1,'Administrador','2020-09-20 18:06:08','2020-09-20 18:06:08'),(2,'Cliente','2020-09-20 18:06:08','2020-09-20 18:06:08');
/*!40000 ALTER TABLE `Roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
INSERT INTO `Usuarios` VALUES (1,'admin','Kelli','Cutting','admin@reverbnation.com','379-339-0649','2017 Tomscot Court','$2a$10$RB/HpZ2NNsoBP59bFJNRfOZMd9oFU7oRoKcLiraUAVipWkL.swNWq',1,'2020-09-20 16:55:41','2020-09-20 16:55:41'),(3,'cliente','Kelli','Cutting','cliente1@reverbnation.com','379-339-0649','2017 Tomscot Court','$2a$10$3zzUfVSBlqcOiKJbk08CX.dO96vO/d8gEhhW5tpYH9muS1ofYApni',2,'2020-09-20 17:14:22','2020-09-20 17:19:37'),(5,'cliente2','Keanu','Reves','cliente2@reverbnation.com','379-339-0649','2017 hollywood Str','$2a$10$ihuH5Iw6rqaZcrtjSYp.c.6VUErpRgTe8ty/KvkaJmYA.Xp.68yMm',2,'2020-09-20 20:53:07','2020-09-20 20:53:07');
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-22 22:29:28
