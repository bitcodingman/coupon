-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- 생성 시간: 18-08-20 02:11
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
(1, 1, 1, 5, '아메리카노', 1),
(2, 1, 1, 10, '수박주스', 1),
(3, 1, 2, 10, '군만두', 2),
(4, 1, 2, 20, '탕수육', 2),
(5, 2, 3, 5, '아메리카노', 1),
(6, 2, 3, 10, '카페라떼', 1),
(7, 2, 4, 10, '떡볶이 1인분', 2),
(8, 2, 4, 20, '돈까스', 2),
(9, 3, 5, 10, '군만두', 2),
(10, 3, 5, 20, '탕수육', 2),
(11, 3, 5, 30, '양장피', 2);

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
  `couponPublishDate` varchar(50) DEFAULT NULL,
  `couponUseDate` varchar(50) DEFAULT NULL,
  `couponFinishDate` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `item_img`
--

CREATE TABLE `item_img` (
  `itemImgId` int(11) NOT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `itemImg` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `stamp`
--

CREATE TABLE `stamp` (
  `stampId` int(11) NOT NULL,
  `storeId` int(11) DEFAULT NULL,
  `stampTerm` varchar(40) DEFAULT NULL,
  `stampMaximum` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `stamp`
--

INSERT INTO `stamp` (`stampId`, `storeId`, `stampTerm`, `stampMaximum`) VALUES
(1, 1, '음료 1잔', 10),
(2, 1, '식사 한끼', 20),
(3, 2, '음료1잔', 10),
(4, 2, '식사한끼', 20),
(5, 3, '5000원 결제시', 30);

-- --------------------------------------------------------

--
-- 테이블 구조 `stamp_save`
--

CREATE TABLE `stamp_save` (
  `stampSaveId` int(11) NOT NULL,
  `stampId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `storeId` int(11) DEFAULT NULL,
  `stampPublishDate` varchar(50) DEFAULT NULL,
  `stampFinishDate` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `stamp_save_history`
--

CREATE TABLE `stamp_save_history` (
  `stampSaveId` int(11) DEFAULT NULL,
  `stampSaveNo` int(10) DEFAULT NULL,
  `stampSaveDate` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  MODIFY `couponId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- 테이블의 AUTO_INCREMENT `coupon_list`
--
ALTER TABLE `coupon_list`
  MODIFY `couponListId` int(11) NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `item_img`
--
ALTER TABLE `item_img`
  MODIFY `itemImgId` int(11) NOT NULL AUTO_INCREMENT;

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
