-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 05, 2024 at 01:19 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `minsu`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `username`, `password`, `email`, `created_at`) VALUES
(1, 'Bahia_Alfia', '$2b$10$j3oMbRInpX3bq9xxVof7le.xR0TnyMbZwIYgpqvoGMQXwidVrZZHm', 'alfiaaronbahia07@gmail.com', '2024-11-06 00:40:04'),
(2, 'lala', '$2b$10$.l27WfAZhF5xBLAoc6Vpm.P6np6iXDcgEnQ2TPL7CURHh4vxjHGfS', 'alfiaaronbahia@gmail.com', '2024-11-08 15:30:35'),
(3, 'shyne', '$2b$10$SWIw0XruA8sL/.MpEfqou.S8EsBRDoYLYsPHxFmp1ywGDAGmp1TW6', 'alfia@gmail.com', '2024-11-09 09:37:22'),
(4, 'chynna', '$2b$10$8jiqBeCkP4.5cBxjJWn9e.RXgM.qJCYrme4l7rzaQQn8AY8sTDS2.', 'chynnaAlemania@gmail.com', '2024-11-09 09:40:28'),
(5, 'user1', '$2b$10$5MMpnrg9DFljni.GnFVJxuNw/JDx77y6YgdoMb232k9nUGNd47ihK', 'user1@gmail.com', '2024-11-10 05:07:21'),
(6, 'sarah', '$2b$10$55W0aegAgx7g1Vkfv0juYuTbUKxIbcqX/0KfIJZs62XhRNcNfpvVK', 'sarahp@gmail.com', '2024-11-24 05:30:18'),
(7, 'admin2', '$2b$10$fuXV1DnJ2IHbhKgDc3ii6.BNAhHxZXkyQ2yFKo0aHmAz4iBqLIakS', 'admin2@gmail.com', '2024-12-01 08:26:10');

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
CREATE TABLE IF NOT EXISTS `appointments` (
  `appointment_id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `appointment_date` datetime NOT NULL,
  `status` enum('Booked','Rescheduled','Canceled') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Booked',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`appointment_id`),
  KEY `patient_id` (`patient_id`)
) ENGINE=MyISAM AUTO_INCREMENT=220215 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`appointment_id`, `patient_id`, `appointment_date`, `status`, `created_at`) VALUES
(31, 220213, '2023-12-01 18:40:21', 'Booked', '2023-12-05 10:40:21'),
(29, 220294, '2024-12-31 18:35:00', 'Booked', '2024-12-01 10:35:29'),
(28, 220279, '2024-12-03 18:33:00', 'Rescheduled', '2024-12-01 10:33:41');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
CREATE TABLE IF NOT EXISTS `inventory` (
  `inventory_id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `quantity` int NOT NULL,
  `expiry_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `quantity_added` int DEFAULT '0',
  PRIMARY KEY (`inventory_id`),
  UNIQUE KEY `unique_item_name` (`item_name`(191))
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`inventory_id`, `item_name`, `category`, `quantity`, `expiry_date`, `created_at`, `updated_at`, `quantity_added`) VALUES
(1, 'Amoxicilin', 'Antibiotic', 46, '2024-11-09', '2024-11-06 12:53:17', '2024-12-04 15:10:13', -9),
(3, 'Albuterol', 'Asthma', 13, '2024-11-23', '2023-11-07 03:37:56', '2024-12-01 08:22:12', 2),
(4, 'Bioflu', 'Antibiotic', 46, '2024-11-08', '2023-11-07 08:52:42', '2024-12-04 14:29:33', -200),
(6, 'Metformin', 'Antidiabetic', 5, '2024-11-20', '2024-11-08 11:29:31', '2024-11-08 11:29:31', 0);

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
CREATE TABLE IF NOT EXISTS `patients` (
  `patient_id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(150) NOT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `contact` varchar(11) NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `guardian` varchar(150) NOT NULL,
  `guardian_contact` varchar(11) NOT NULL,
  `bloodType` char(3) NOT NULL,
  `height` decimal(5,2) NOT NULL,
  `weight` decimal(5,2) NOT NULL,
  `department` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`patient_id`),
  UNIQUE KEY `unique_fullName` (`fullName`)
) ENGINE=MyISAM AUTO_INCREMENT=227894 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`patient_id`, `fullName`, `gender`, `address`, `contact`, `email`, `guardian`, `guardian_contact`, `bloodType`, `height`, `weight`, `department`, `created_at`) VALUES
(220213, 'Juan Dela Cruzan', 'Female', 'masitaw', '09111111111', 'zyggizyg@gmail.com', 'Ms. Cruz', '09111111112', 'B+', 167.00, 56.00, 'BSCrim', '2023-12-01 08:13:36'),
(220294, 'Daryl Tupas', 'Male', 'dyan sabi sa tabi talaga', '09065148161', 'hak857@gmail.com', 'Felix Jr.', '09111111113', 'B+', 167.00, 56.00, 'BSIT', '2024-12-01 10:35:12'),
(220279, 'Chynna Alemania Cabatay', 'Male', 'Silonay', '09117891311', 'chynnaalemania50@gmail.com', 'Felix Jr.', '09111111112', 'A-', 167.00, 56.00, 'BSIT', '2024-12-01 10:32:03');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
CREATE TABLE IF NOT EXISTS `services` (
  `service_id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `service_type` varchar(50) NOT NULL,
  `patient_name` varchar(100) NOT NULL,
  `doctor_in_charge` varchar(100) NOT NULL,
  `medical_notes` text NOT NULL,
  `blood_pressure` varchar(50) NOT NULL,
  `respiratory_rate` varchar(50) NOT NULL,
  `pulse_rate` varchar(50) NOT NULL,
  `temperature` varchar(50) NOT NULL,
  `medication` text NOT NULL,
  `patient_id` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `inventory_id` int DEFAULT NULL,
  PRIMARY KEY (`service_id`),
  KEY `patient_id` (`patient_id`),
  KEY `fk_inventory_id` (`inventory_id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_id`, `date`, `service_type`, `patient_name`, `doctor_in_charge`, `medical_notes`, `blood_pressure`, `respiratory_rate`, `pulse_rate`, `temperature`, `medication`, `patient_id`, `created_at`, `inventory_id`) VALUES
(5, '2024-11-09', 'check-up', 'Chynna Alemania', 'Dr. Custodio', 'jajakakls', '180/90', '85', '80', '43', 'Amoxicilin', 221234, '2024-12-01 07:10:11', 1),
(6, '2024-11-09', 'check-up', 'daryll Tupaz', 'Dr. Custodio', 'hjhk', '180/90', '85', '80', '43', 'Albuterol', 224567, '2023-12-01 07:10:11', 3),
(4, '2024-11-09', 'check-up', 'Alfia A. Bahia', 'Dr. Custodio', 'nothing', '180/90', '85', '80', '43', 'Bioflu', 220298, '2024-12-01 07:10:11', 4),
(7, '2024-11-07', 'Check Up', 'Alfia A. Bahia', 'Dr. Custodio', 'iwdiqd', '34', '123', '12', '12122', 'Metformin', 220298, '2024-12-01 07:10:11', 6),
(13, '2024-12-12', 'Check Up', 'Juan Dela Cruzan', 'Dr. Custodio', 'joo', '34', '123', '12', '36.5', 'Bioflu', 220213, '2024-12-04 14:29:33', 4),
(12, '2024-12-31', 'Check Up', 'Chynna Alemania Cabatay', 'Dr. Custodio', 'bkii', '34', '123', '12', '36.5', 'Amoxicilin', 220279, '2024-12-02 13:13:18', 1),
(14, '2024-12-05', 'Check Up', 'Juan Dela Cruzan', 'Dr. Custodio', 'bbjbijn', '34', '123', '12', '36.5', 'Amoxicilin', 220213, '2024-12-04 14:59:54', 1),
(15, '2024-12-26', 'Check Up', 'Daryl Tupas', 'Dr. Custodio', 'memfm', '34', '123', '12', '36.5', 'Amoxicilin', 220294, '2024-12-04 15:10:13', 1);

-- --------------------------------------------------------

--
-- Table structure for table `services_inventory`
--

DROP TABLE IF EXISTS `services_inventory`;
CREATE TABLE IF NOT EXISTS `services_inventory` (
  `service_id` int NOT NULL,
  `inventory_id` int NOT NULL,
  PRIMARY KEY (`service_id`,`inventory_id`),
  KEY `inventory_id` (`inventory_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
