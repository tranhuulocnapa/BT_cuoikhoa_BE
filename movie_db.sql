/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_banner` int NOT NULL,
  `ma_phim` int NOT NULL,
  `hinh_anh` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_ma_banner` (`ma_banner`),
  KEY `fk_banner_phim` (`ma_phim`),
  CONSTRAINT `fk_banner_phim` FOREIGN KEY (`ma_phim`) REFERENCES `phim` (`ma_phim`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `cum_rap`;
CREATE TABLE `cum_rap` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_cum_rap` int NOT NULL,
  `ten_cum_rap` varchar(255) NOT NULL,
  `dia_chi` varchar(500) DEFAULT NULL,
  `ma_he_thong_rap` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_ma_cum_rap` (`ma_cum_rap`),
  KEY `fk_cumrap_hethongrap` (`ma_he_thong_rap`),
  CONSTRAINT `fk_cumrap_hethongrap` FOREIGN KEY (`ma_he_thong_rap`) REFERENCES `he_thong_rap` (`ma_he_thong_rap`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `dat_ve`;
CREATE TABLE `dat_ve` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tai_khoan` varchar(255) NOT NULL,
  `ma_lich_chieu` int NOT NULL,
  `ma_ghe` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_dat_ve_booking` (`tai_khoan`,`ma_lich_chieu`,`ma_ghe`),
  KEY `fk_datve_ghe` (`ma_ghe`),
  KEY `fk_datve_lichchieu` (`ma_lich_chieu`),
  CONSTRAINT `fk_datve_ghe` FOREIGN KEY (`ma_ghe`) REFERENCES `ghe` (`ma_ghe`) ON DELETE CASCADE,
  CONSTRAINT `fk_datve_lichchieu` FOREIGN KEY (`ma_lich_chieu`) REFERENCES `lich_chieu` (`ma_lich_chieu`) ON DELETE CASCADE,
  CONSTRAINT `fk_datve_nguoidung` FOREIGN KEY (`tai_khoan`) REFERENCES `nguoi_dung` (`tai_khoan`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `ghe`;
CREATE TABLE `ghe` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_ghe` int NOT NULL,
  `ten_ghe` varchar(50) NOT NULL,
  `loai_ghe` varchar(50) DEFAULT NULL,
  `ma_rap` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_ma_ghe` (`ma_ghe`),
  KEY `fk_ghe_rapphim` (`ma_rap`),
  CONSTRAINT `fk_ghe_rapphim` FOREIGN KEY (`ma_rap`) REFERENCES `rap_phim` (`ma_rap`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `he_thong_rap`;
CREATE TABLE `he_thong_rap` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_he_thong_rap` int NOT NULL,
  `ten_he_thong_rap` varchar(255) NOT NULL,
  `logo` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_ma_he_thong_rap` (`ma_he_thong_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `lich_chieu`;
CREATE TABLE `lich_chieu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_lich_chieu` int NOT NULL,
  `ma_rap` int NOT NULL,
  `ma_phim` int NOT NULL,
  `ngay_gio_chieu` datetime NOT NULL,
  `gia_ve` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_ma_lich_chieu` (`ma_lich_chieu`),
  KEY `fk_lichchieu_phim` (`ma_phim`),
  KEY `fk_lichchieu_rapphim` (`ma_rap`),
  CONSTRAINT `fk_lichchieu_phim` FOREIGN KEY (`ma_phim`) REFERENCES `phim` (`ma_phim`) ON DELETE CASCADE,
  CONSTRAINT `fk_lichchieu_rapphim` FOREIGN KEY (`ma_rap`) REFERENCES `rap_phim` (`ma_rap`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `nguoi_dung`;
CREATE TABLE `nguoi_dung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tai_khoan` varchar(255) NOT NULL,
  `ma_nhom` varchar(50) DEFAULT 'GP01',
  `ho_ten` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `so_dt` varchar(20) DEFAULT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `loai_nguoi_dung` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `uk_tai_khoan` (`tai_khoan`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `phim`;
CREATE TABLE `phim` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_phim` int NOT NULL,
  `ten_phim` varchar(255) NOT NULL,
  `trailer` varchar(500) DEFAULT NULL,
  `hinh_anh` varchar(500) DEFAULT NULL,
  `mo_ta` text,
  `ngay_khoi_chieu` date DEFAULT NULL,
  `danh_gia` int DEFAULT '0',
  `hot` tinyint(1) DEFAULT '0',
  `dang_chieu` tinyint(1) DEFAULT '0',
  `sap_chieu` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_ma_phim` (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `rap_phim`;
CREATE TABLE `rap_phim` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_rap` int NOT NULL,
  `ten_rap` varchar(255) NOT NULL,
  `ma_cum_rap` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_ma_rap` (`ma_rap`),
  KEY `fk_rapphim_cumrap` (`ma_cum_rap`),
  CONSTRAINT `fk_rapphim_cumrap` FOREIGN KEY (`ma_cum_rap`) REFERENCES `cum_rap` (`ma_cum_rap`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `banner` (`id`, `ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(4, 4, 5, 'https://picsum.photos/seed/banner-godzilla-kong/1200/400'),
(5, 5, 7, 'https://picsum.photos/seed/banner-avatar/1200/400');
INSERT INTO `cum_rap` (`id`, `ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(1, 1, 'CGV Vincom Dong Khoi', '72 Le Thanh Ton, Quan 1, TP.HCM', 1),
(2, 2, 'CGV Su Van Hanh', '11 Su Van Hanh, Quan 10, TP.HCM', 1),
(3, 3, 'BHD Star Bitexco', '2 Hai Trieu, Quan 1, TP.HCM', 2),
(4, 4, 'BHD Star Pham Hung', 'C6/27 Pham Hung, Binh Chanh, TP.HCM', 2),
(5, 5, 'Galaxy Nguyen Du', '116 Nguyen Du, Quan 1, TP.HCM', 3);

INSERT INTO `ghe` (`id`, `ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(1, 1, 'A01', 'Thuong', 1),
(2, 2, 'A02', 'Thuong', 1),
(3, 3, 'A03', 'Thuong', 1),
(4, 4, 'A04', 'Thuong', 1),
(5, 5, 'A05', 'Thuong', 1),
(6, 6, 'B01', 'Vip', 1),
(7, 7, 'B02', 'Vip', 1),
(8, 8, 'B03', 'Vip', 1),
(9, 9, 'B04', 'Vip', 1),
(10, 10, 'B05', 'Vip', 1),
(11, 11, 'A01', 'Thuong', 2),
(12, 12, 'A02', 'Thuong', 2),
(13, 13, 'A03', 'Thuong', 2),
(14, 14, 'A04', 'Thuong', 2),
(15, 15, 'A05', 'Thuong', 2),
(16, 16, 'B01', 'Vip', 2),
(17, 17, 'B02', 'Vip', 2),
(18, 18, 'B03', 'Vip', 2),
(19, 19, 'B04', 'Vip', 2),
(20, 20, 'B05', 'Vip', 2),
(21, 21, 'A01', 'Thuong', 3),
(22, 22, 'A02', 'Thuong', 3),
(23, 23, 'A03', 'Thuong', 3),
(24, 24, 'A04', 'Thuong', 3),
(25, 25, 'A05', 'Thuong', 3),
(26, 26, 'B01', 'Vip', 3),
(27, 27, 'B02', 'Vip', 3),
(28, 28, 'B03', 'Vip', 3),
(29, 29, 'B04', 'Vip', 3),
(30, 30, 'B05', 'Vip', 3),
(31, 31, 'A01', 'Thuong', 4),
(32, 32, 'A02', 'Thuong', 4),
(33, 33, 'A03', 'Thuong', 4),
(34, 34, 'A04', 'Thuong', 4),
(35, 35, 'A05', 'Thuong', 4),
(36, 36, 'B01', 'Vip', 4),
(37, 37, 'B02', 'Vip', 4),
(38, 38, 'B03', 'Vip', 4),
(39, 39, 'B04', 'Vip', 4),
(40, 40, 'B05', 'Vip', 4),
(41, 41, 'A01', 'Thuong', 5),
(42, 42, 'A02', 'Thuong', 5),
(43, 43, 'A03', 'Thuong', 5),
(44, 44, 'A04', 'Thuong', 5),
(45, 45, 'A05', 'Thuong', 5),
(46, 46, 'B01', 'Vip', 5),
(47, 47, 'B02', 'Vip', 5),
(48, 48, 'B03', 'Vip', 5),
(49, 49, 'B04', 'Vip', 5),
(50, 50, 'B05', 'Vip', 5),
(51, 51, 'A01', 'Thuong', 6),
(52, 52, 'A02', 'Thuong', 6),
(53, 53, 'A03', 'Thuong', 6),
(54, 54, 'A04', 'Thuong', 6),
(55, 55, 'A05', 'Thuong', 6),
(56, 56, 'B01', 'Vip', 6),
(57, 57, 'B02', 'Vip', 6),
(58, 58, 'B03', 'Vip', 6),
(59, 59, 'B04', 'Vip', 6),
(60, 60, 'B05', 'Vip', 6),
(61, 61, 'A01', 'Thuong', 7),
(62, 62, 'A02', 'Thuong', 7),
(63, 63, 'A03', 'Thuong', 7),
(64, 64, 'A04', 'Thuong', 7),
(65, 65, 'A05', 'Thuong', 7),
(66, 66, 'B01', 'Vip', 7),
(67, 67, 'B02', 'Vip', 7),
(68, 68, 'B03', 'Vip', 7),
(69, 69, 'B04', 'Vip', 7),
(70, 70, 'B05', 'Vip', 7),
(71, 71, 'A01', 'Thuong', 8),
(72, 72, 'A02', 'Thuong', 8),
(73, 73, 'A03', 'Thuong', 8),
(74, 74, 'A04', 'Thuong', 8),
(75, 75, 'A05', 'Thuong', 8),
(76, 76, 'B01', 'Vip', 8),
(77, 77, 'B02', 'Vip', 8),
(78, 78, 'B03', 'Vip', 8),
(79, 79, 'B04', 'Vip', 8),
(80, 80, 'B05', 'Vip', 8);
INSERT INTO `he_thong_rap` (`id`, `ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(1, 1, 'CGV', 'https://picsum.photos/seed/logo-cgv/120/120'),
(2, 2, 'BHD Star', 'https://picsum.photos/seed/logo-bhd/120/120'),
(3, 3, 'Galaxy Cinema', 'https://picsum.photos/seed/logo-galaxy/120/120');
INSERT INTO `lich_chieu` (`id`, `ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(4, 4, 3, 4, '2026-05-20 10:00:00', 90000),
(5, 5, 4, 5, '2026-05-20 20:30:00', 110000),
(6, 6, 5, 6, '2026-05-21 16:45:00', 85000),
(7, 7, 6, 7, '2026-05-22 21:00:00', 130000),
(8, 8, 7, 8, '2026-05-23 18:00:00', 95000),
(10, 10, 2, 5, '2026-05-25 17:30:00', 100000),
(13, 11, 1, 4, '2024-01-01 13:00:00', 100000);
INSERT INTO `nguoi_dung` (`id`, `tai_khoan`, `ma_nhom`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(7, 'loc123', 'GP01', 'Nguyễn Văn A', 'loc123@example.com', '0123456789', '$2b$10$72hBMXYXJ/oDIBQz4N.9T.cUraHNrJ7hRVUze0Gzcu/edjhV1EJzC', 'KhachHang'),
(8, 'user1234', 'GP01', 'Nguyễn Văn A', 'user1@example.com', '0123456789', '$2b$10$M.lg0zwaQeoAeQVEQrbzuuJWHNLakMB5DgCQ73NA474RXl1iJxO6q', 'KhachHang'),
(9, 'user1235', 'GP01', 'Nguyễn Văn A', 'user5@example.com', '0123456789', '$2b$10$6VZChQt7DNYdhFA58p0/zOmCnmP52vwObwZ8c8KK0xI9M2ou4Gu3S', 'KhachHang'),
(10, 'testuser001', 'GP01', 'Test User', 'testuser001@example.com', '0123456789', '$2b$10$KZVHmnQ.RW2ysSEhAR7y4.UbvljkHpV7B9rExZ2.rnV23Xi1oNs.O', 'KhachHang');
INSERT INTO `phim` (`id`, `ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(4, 4, 'Inside Out 3', 'https://www.youtube.com/watch?v=insideout3', 'https://picsum.photos/seed/inside-out-3/320/480', 'Nhung cam xuc moi trong hanh trinh truong thanh.', '2026-07-12', 9, 0, 0, 1),
(5, 5, 'Godzilla x Kong: New Empire', 'https://www.youtube.com/watch?v=godzilla-kong', 'https://picsum.photos/seed/godzilla-kong/320/480', 'Dai chien quai vat tren man anh rong.', '2026-02-10', 8, 1, 1, 0),
(6, 6, 'Kung Fu Panda 5', 'https://www.youtube.com/watch?v=kungfu-panda-5', 'https://picsum.photos/seed/kungfu-panda-5/320/480', 'Po tro lai voi mot thu thach moi.', '2026-05-05', 7, 0, 1, 0),
(7, 7, 'Avatar: Fire and Ash', 'https://www.youtube.com/watch?v=avatar-fire-ash', 'https://picsum.photos/seed/avatar-fire-ash/320/480', 'Phan tiep theo tai Pandora.', '2026-12-19', 10, 1, 0, 1),
(8, 8, 'Detective Conan Movie', 'https://www.youtube.com/watch?v=conan-movie', 'https://picsum.photos/seed/conan-movie/320/480', 'Vu an moi cua Conan va doi tham tu nhi.', '2026-05-28', 8, 0, 1, 0);
INSERT INTO `rap_phim` (`id`, `ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(1, 1, 'Rap 1', 1),
(2, 2, 'Rap 2', 1),
(3, 3, 'Rap 3', 2),
(4, 4, 'Rap 1', 3),
(5, 5, 'Rap 2', 3),
(6, 6, 'Rap 1', 4),
(7, 7, 'Rap 1', 5),
(8, 8, 'Rap 2', 5);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;