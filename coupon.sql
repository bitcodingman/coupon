-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- 생성 시간: 18-09-13 00:38
-- 서버 버전: 5.7.21
-- PHP 버전: 7.1.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `coupon`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `category`
--

CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL,
  `categoryName` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `category`
--

INSERT INTO `category` (`categoryId`, `categoryName`) VALUES
(1, '카페'),
(2, '음식점'),
(3, '유흥'),
(4, '뷰티'),
(5, '기타');

-- --------------------------------------------------------

--
-- 테이블 구조 `coupon_config`
--

CREATE TABLE `coupon_config` (
  `couponId` int(11) NOT NULL,
  `storeId` int(11) DEFAULT NULL,
  `stampId` int(11) DEFAULT NULL,
  `couponPublishTerm` int(10) DEFAULT NULL,
  `couponItemName` varchar(40) DEFAULT NULL,
  `itemImgId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `coupon_config`
--

INSERT INTO `coupon_config` (`couponId`, `storeId`, `stampId`, `couponPublishTerm`, `couponItemName`, `itemImgId`) VALUES
(50, 1, 56, 5, '아메리카노', 4),
(51, 1, 56, 10, '수박주스', 3),
(52, 1, 57, 10, '아이스크림', 15),
(53, 1, 57, 20, '고르곤졸라 피자', 18),
(54, 1, 58, 5, '아메리카노', 4),
(55, 1, 58, 10, '수박주스', 3),
(56, 2, 59, 6, '아메리카노', 4),
(57, 2, 59, 12, '아메리카노', 4),
(58, 2, 59, 18, '수박주스', 3),
(59, 2, 59, 24, '수박주스', 3),
(60, 2, 59, 30, '고르곤졸라 피자', 18),
(61, 1, 60, 10, 'ㅁㄴㅇ', 3);

-- --------------------------------------------------------

--
-- 테이블 구조 `coupon_list`
--

CREATE TABLE `coupon_list` (
  `couponListId` int(11) NOT NULL,
  `stampSaveId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `storeId` int(11) DEFAULT NULL,
  `couponId` int(11) DEFAULT NULL,
  `couponPublishDate` datetime DEFAULT NULL,
  `couponUseDate` datetime DEFAULT NULL,
  `couponFinishDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `coupon_list`
--

INSERT INTO `coupon_list` (`couponListId`, `stampSaveId`, `userId`, `storeId`, `couponId`, `couponPublishDate`, `couponUseDate`, `couponFinishDate`) VALUES
(1, 1, 1, 2, 56, '2018-09-05 12:17:59', NULL, '2018-10-05 12:17:59'),
(2, 1, 1, 2, 57, '2018-09-06 12:17:59', NULL, '2018-10-06 12:17:59');

-- --------------------------------------------------------

--
-- 테이블 구조 `item_img`
--

CREATE TABLE `item_img` (
  `itemImgId` int(11) NOT NULL,
  `imgCategory` varchar(40) DEFAULT NULL,
  `itemImg` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `item_img`
--

INSERT INTO `item_img` (`itemImgId`, `imgCategory`, `itemImg`) VALUES
(1, 'drink', 'drink_01'),
(2, 'drink', 'drink_02'),
(3, 'drink', 'drink_03'),
(4, 'drink', 'drink_04'),
(5, 'drink', 'drink_05'),
(6, 'drink', 'drink_06'),
(7, 'drink', 'drink_07'),
(8, 'food', 'food_01'),
(9, 'food', 'food_02'),
(10, 'food', 'food_03'),
(11, 'food', 'food_04'),
(12, 'food', 'food_05'),
(13, 'food', 'food_06'),
(14, 'food', 'food_07'),
(15, 'food', 'food_08'),
(16, 'food', 'food_09'),
(17, 'food', 'food_10'),
(18, 'food', 'food_11'),
(19, 'food', 'food_12');

-- --------------------------------------------------------

--
-- 테이블 구조 `stamp`
--

CREATE TABLE `stamp` (
  `stampId` int(11) NOT NULL,
  `storeId` int(11) DEFAULT NULL,
  `stampName` varchar(16) DEFAULT NULL,
  `stampTerm` varchar(40) DEFAULT NULL,
  `stampMaximum` int(11) DEFAULT NULL,
  `created` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `stamp`
--

INSERT INTO `stamp` (`stampId`, `storeId`, `stampName`, `stampTerm`, `stampMaximum`, `created`) VALUES
(56, 1, '음료쿠폰A', '음료 1잔당', 10, '2018-08-03 16:34:50'),
(57, 1, '식사쿠폰', '식사 한끼당', 20, '2018-09-03 16:39:06'),
(58, 1, '음료쿠폰B', '음료 1잔당 적립', 10, '2018-09-04 12:17:59'),
(59, 2, '음료쿠폰', '음료 한잔 결제시', 30, '2018-08-04 12:30:38'),
(60, 1, 'ㅁㅁㅁ', 'ㅁㅁㅁㅁㅁ', 10, '2018-09-12 17:37:49');

-- --------------------------------------------------------

--
-- 테이블 구조 `stamp_save`
--

CREATE TABLE `stamp_save` (
  `stampSaveId` int(11) NOT NULL,
  `stampId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `storeId` int(11) DEFAULT NULL,
  `stampPublishDate` datetime DEFAULT NULL,
  `stampFinishDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `stamp_save`
--

INSERT INTO `stamp_save` (`stampSaveId`, `stampId`, `userId`, `storeId`, `stampPublishDate`, `stampFinishDate`) VALUES
(1, 59, 1, 2, '2018-08-05 12:17:59', '2019-08-05 12:17:59');

-- --------------------------------------------------------

--
-- 테이블 구조 `stamp_save_history`
--

CREATE TABLE `stamp_save_history` (
  `historyId` int(11) NOT NULL,
  `stampSaveId` int(11) DEFAULT NULL,
  `stampSaveNo` int(10) DEFAULT NULL,
  `stampSaveDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `stamp_save_history`
--

INSERT INTO `stamp_save_history` (`historyId`, `stampSaveId`, `stampSaveNo`, `stampSaveDate`) VALUES
(1, 1, 2, '2018-08-06 12:17:59'),
(2, 1, 3, '2018-08-07 12:17:59'),
(3, 1, 4, '2018-09-05 12:17:59'),
(4, 1, 6, '2018-09-06 12:17:59');

-- --------------------------------------------------------

--
-- 테이블 구조 `stats`
--

CREATE TABLE `stats` (
  `storeId` int(11) NOT NULL,
  `totalUsedUser` int(10) DEFAULT NULL,
  `inUseUser` int(10) DEFAULT NULL,
  `inStamp` int(10) DEFAULT NULL,
  `totalStamp` int(10) DEFAULT NULL,
  `publishedCoupon` int(10) DEFAULT NULL,
  `usedCoupon` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `store`
--

CREATE TABLE `store` (
  `storeId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `storeName` varchar(50) DEFAULT NULL,
  `storeRegistNo` int(50) DEFAULT NULL,
  `storePhone` varchar(50) DEFAULT NULL,
  `addressSi` varchar(20) DEFAULT NULL,
  `addressGu` varchar(20) DEFAULT NULL,
  `addressDong` varchar(20) DEFAULT NULL,
  `addressDetail` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `store`
--

INSERT INTO `store` (`storeId`, `userId`, `categoryId`, `storeName`, `storeRegistNo`, `storePhone`, `addressSi`, `addressGu`, `addressDong`, `addressDetail`) VALUES
(1, 5, 1, '우리동네 일등커피집', 123456789, '02-1234-5678', '서울특별시', '강서구', '방화동', '123-4번지 1층 101호'),
(2, 6, 2, '놀부 부대찌개', 123456789, '02-1234-5678', '서울특별시', '강서구', '방화동', '123-4번지 1층 101호'),
(3, 7, 3, '제노 PC방', 123456789, '02-1234-5678', '서울특별시', '강서구', '방화동', '123-4번지 1층 101호'),
(4, 8, 4, '네일 맑음', 123456789, '02-1234-5678', '서울특별시', '강서구', '방화동', '123-4번지 1층 101호');

-- --------------------------------------------------------

--
-- 테이블 구조 `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `userType` int(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `pw` varchar(255) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `barcode` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `user`
--

INSERT INTO `user` (`userId`, `userType`, `email`, `pw`, `name`, `barcode`) VALUES
(1, 0, 'aaa1', 'qasw1234', 'aaa1_name', 'aaa1-barcode'),
(2, 0, 'aaa2', 'qasw1234', 'aaa2_name', 'aaa2-barcode'),
(3, 0, 'aaa3', 'qasw1234', 'aaa3_name', 'aaa3-barcode'),
(4, 0, 'aaa4', 'qasw1234', 'aaa4_name', 'aaa4-barcode'),
(5, 1, 'sss1', 'qasw1234', 'sss1_name', NULL),
(6, 1, 'sss2', 'qasw1234', 'sss2_name', NULL),
(7, 1, 'sss3', 'qasw1234', 'sss3_name', NULL),
(8, 1, 'sss4', 'qasw1234', 'sss4_name', NULL);

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`);

--
-- 테이블의 인덱스 `coupon_config`
--
ALTER TABLE `coupon_config`
  ADD PRIMARY KEY (`couponId`);

--
-- 테이블의 인덱스 `coupon_list`
--
ALTER TABLE `coupon_list`
  ADD PRIMARY KEY (`couponListId`);

--
-- 테이블의 인덱스 `item_img`
--
ALTER TABLE `item_img`
  ADD PRIMARY KEY (`itemImgId`);

--
-- 테이블의 인덱스 `stamp`
--
ALTER TABLE `stamp`
  ADD PRIMARY KEY (`stampId`);

--
-- 테이블의 인덱스 `stamp_save`
--
ALTER TABLE `stamp_save`
  ADD PRIMARY KEY (`stampSaveId`);

--
-- 테이블의 인덱스 `stamp_save_history`
--
ALTER TABLE `stamp_save_history`
  ADD PRIMARY KEY (`historyId`);

--
-- 테이블의 인덱스 `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`storeId`);

--
-- 테이블의 인덱스 `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`storeId`);

--
-- 테이블의 인덱스 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `category`
--
ALTER TABLE `category`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 테이블의 AUTO_INCREMENT `coupon_config`
--
ALTER TABLE `coupon_config`
  MODIFY `couponId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- 테이블의 AUTO_INCREMENT `coupon_list`
--
ALTER TABLE `coupon_list`
  MODIFY `couponListId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 테이블의 AUTO_INCREMENT `item_img`
--
ALTER TABLE `item_img`
  MODIFY `itemImgId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- 테이블의 AUTO_INCREMENT `stamp`
--
ALTER TABLE `stamp`
  MODIFY `stampId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- 테이블의 AUTO_INCREMENT `stamp_save`
--
ALTER TABLE `stamp_save`
  MODIFY `stampSaveId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 테이블의 AUTO_INCREMENT `stamp_save_history`
--
ALTER TABLE `stamp_save_history`
  MODIFY `historyId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 테이블의 AUTO_INCREMENT `store`
--
ALTER TABLE `store`
  MODIFY `storeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 테이블의 AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
