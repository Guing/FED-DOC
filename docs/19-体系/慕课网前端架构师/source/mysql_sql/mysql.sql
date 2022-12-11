-- --------------------------------------------------------
-- 主机:                           blackfe.com
-- 服务器版本:                        8.0.28 - MySQL Community Server - GPL
-- 服务器操作系统:                      Linux
-- HeidiSQL 版本:                  9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出 imooc_web_architect_cli 的数据库结构
DROP DATABASE IF EXISTS `imooc_web_architect_cli`;
CREATE DATABASE IF NOT EXISTS `imooc_web_architect_cli`; 

-- 导出 editor-server 的数据库结构
DROP DATABASE IF EXISTS `editor-server`;
CREATE DATABASE IF NOT EXISTS `editor-server` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `editor-server`;

-- 导出  表 editor-server.admins 结构
DROP TABLE IF EXISTS `admins`;
CREATE TABLE IF NOT EXISTS `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL COMMENT '用户名，唯一',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `nickName` varchar(255) DEFAULT NULL COMMENT '昵称',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 正在导出表  editor-server.admins 的数据：~1 rows (大约)
DELETE FROM `admins`;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` (`id`, `username`, `password`, `nickName`, `createdAt`, `updatedAt`) VALUES
	(1, 'hello', '4a1e85c105bbaf1a25d72ed50dbc0bb8', '', '2022-06-12 12:47:55', '2022-06-12 12:47:55');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;

-- 导出  表 editor-server.channels 结构
DROP TABLE IF EXISTS `channels`;
CREATE TABLE IF NOT EXISTS `channels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '渠道名称',
  `workId` int NOT NULL COMMENT '作品 id',
  `status` int NOT NULL DEFAULT '1' COMMENT '状态：0-删除，1-正常',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 正在导出表  editor-server.channels 的数据：~2 rows (大约)
DELETE FROM `channels`;
/*!40000 ALTER TABLE `channels` DISABLE KEYS */;
INSERT INTO `channels` (`id`, `name`, `workId`, `status`, `createdAt`, `updatedAt`) VALUES
	(1, 'test', 1, 0, '2022-04-26 03:19:50', '2022-04-26 03:21:30'),
	(2, 'test1', 1, 1, '2022-04-26 03:21:34', '2022-04-26 03:22:20');
/*!40000 ALTER TABLE `channels` ENABLE KEYS */;

-- 导出  表 editor-server.users 结构
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL COMMENT '用户名，唯一',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `phoneNumber` varchar(255) NOT NULL COMMENT '手机号，唯一',
  `nickName` varchar(255) DEFAULT NULL COMMENT '昵称',
  `gender` varchar(255) NOT NULL DEFAULT '0' COMMENT '性别（1 男性，2 女性，0 保密）',
  `picture` varchar(255) DEFAULT NULL COMMENT '头像，图片地址',
  `city` varchar(255) DEFAULT NULL COMMENT '城市',
  `latestLoginAt` datetime DEFAULT NULL COMMENT '最后登录时间',
  `isFrozen` tinyint(1) DEFAULT '0' COMMENT '用户是否冻结',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`,`phoneNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 正在导出表  editor-server.users 的数据：~2 rows (大约)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `password`, `phoneNumber`, `nickName`, `gender`, `picture`, `city`, `latestLoginAt`, `isFrozen`, `createdAt`, `updatedAt`) VALUES
	(1, '13432271733', 'd4c21eae72c17d2a109c04d57160ed68', '13432271733', '733', '0', NULL, NULL, '2022-04-26 02:17:28', 0, '2022-04-26 02:17:28', '2022-04-26 02:33:40'),
	(2, '13432271711', 'b1ed434ce1ad93291cbf9e161bef8e0c', '13432271711', '乐高1711', '0', NULL, NULL, '2022-06-10 03:39:59', 0, '2022-04-26 03:09:37', '2022-06-10 03:39:59');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- 导出  表 editor-server.works 结构
DROP TABLE IF EXISTS `works`;
CREATE TABLE IF NOT EXISTS `works` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL COMMENT 'uuid，h5 url 中使用，隐藏真正的 id，避免被爬虫',
  `title` varchar(255) NOT NULL COMMENT '标题',
  `desc` varchar(255) DEFAULT NULL COMMENT '副标题',
  `contentId` varchar(255) NOT NULL COMMENT '内容 id ，内容存储在 mongodb 中',
  `publishContentId` varchar(255) DEFAULT NULL COMMENT '发布内容 id ，内容存储在 mongodb 中，未发布的为空',
  `author` varchar(255) NOT NULL COMMENT '作者 username',
  `coverImg` varchar(255) DEFAULT NULL COMMENT '封面图片 url',
  `isTemplate` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否是模板',
  `status` varchar(255) NOT NULL DEFAULT '1' COMMENT '状态：0-删除，1-未发布，2-发布，3-强制下线',
  `copiedCount` int NOT NULL DEFAULT '0' COMMENT '被复制的次数',
  `latestPublishAt` datetime DEFAULT NULL COMMENT '最后一次发布的时间',
  `isHot` tinyint(1) DEFAULT '0' COMMENT 'hot 标签，模板使用',
  `isNew` tinyint(1) DEFAULT '0' COMMENT 'new 标签，模板使用',
  `orderIndex` int DEFAULT '0' COMMENT '排序参数',
  `isPublic` tinyint(1) DEFAULT '0' COMMENT '是否公开显示，在首页公共的模板列表',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `contentId` (`contentId`),
  UNIQUE KEY `publishContentId` (`publishContentId`),
  KEY `author` (`author`),
  CONSTRAINT `works_ibfk_1` FOREIGN KEY (`author`) REFERENCES `users` (`username`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 正在导出表  editor-server.works 的数据：~4 rows (大约)
DELETE FROM `works`;
/*!40000 ALTER TABLE `works` DISABLE KEYS */;
INSERT INTO `works` (`id`, `uuid`, `title`, `desc`, `contentId`, `publishContentId`, `author`, `coverImg`, `isTemplate`, `status`, `copiedCount`, `latestPublishAt`, `isHot`, `isNew`, `orderIndex`, `isPublic`, `createdAt`, `updatedAt`) VALUES
	(1, '37a6', ' hello', 'wrold', '62675c4f2321b52a901b1eba', NULL, '13432271711', NULL, 0, '1', 1, NULL, 0, 0, 0, 0, '2022-04-26 02:43:27', '2022-04-26 03:09:51'),
	(2, '9807', ' hello-复制', 'wrold', '6267617c2321b52a901b1ec3', '626763062321b52a901b1ed0', '13432271733', NULL, 1, '2', 0, '2022-04-26 03:16:32', 0, 0, 0, 0, '2022-04-26 03:05:32', '2022-04-26 03:16:32'),
	(3, 'bb92', 'xiaohei', 'a GG', '628f468692d8502bdc17bc41', '628f46b592d8502bdc17bc44', '13432271711', NULL, 0, '2', 0, '2022-05-26 09:21:57', 0, 0, 0, 0, '2022-05-26 09:21:10', '2022-05-26 09:21:57'),
	(4, '7c77', '未命名作品', '未命名作品', '6290992d0d685700664ef262', NULL, '13432271711', NULL, 0, '1', 0, NULL, 0, 0, 0, 0, '2022-05-27 09:26:05', '2022-06-10 03:40:11');
/*!40000 ALTER TABLE `works` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
