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
  `ma_banner` int NOT NULL AUTO_INCREMENT,
  `ma_phim` int NOT NULL,
  `hinh_anh` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`ma_banner`),
  KEY `fk_banner_phim` (`ma_phim`),
  CONSTRAINT `fk_banner_phim` FOREIGN KEY (`ma_phim`) REFERENCES `phim` (`ma_phim`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `cum_rap`;
CREATE TABLE `cum_rap` (
  `ma_cum_rap` int NOT NULL AUTO_INCREMENT,
  `ten_cum_rap` varchar(255) NOT NULL,
  `dia_chi` varchar(500) DEFAULT NULL,
  `ma_he_thong_rap` int NOT NULL,
  PRIMARY KEY (`ma_cum_rap`),
  KEY `fk_cumrap_hethongrap` (`ma_he_thong_rap`),
  CONSTRAINT `fk_cumrap_hethongrap` FOREIGN KEY (`ma_he_thong_rap`) REFERENCES `he_thong_rap` (`ma_he_thong_rap`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `dat_ve`;
CREATE TABLE `dat_ve` (
  `tai_khoan` int NOT NULL,
  `ma_lich_chieu` int NOT NULL,
  `ma_ghe` int NOT NULL,
  PRIMARY KEY (`tai_khoan`,`ma_lich_chieu`,`ma_ghe`),
  KEY `fk_datve_lichchieu` (`ma_lich_chieu`),
  KEY `fk_datve_ghe` (`ma_ghe`),
  CONSTRAINT `fk_datve_ghe` FOREIGN KEY (`ma_ghe`) REFERENCES `ghe` (`ma_ghe`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_datve_lichchieu` FOREIGN KEY (`ma_lich_chieu`) REFERENCES `lich_chieu` (`ma_lich_chieu`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_datve_nguoidung` FOREIGN KEY (`tai_khoan`) REFERENCES `nguoi_dung` (`tai_khoan`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `ghe`;
CREATE TABLE `ghe` (
  `ma_ghe` int NOT NULL AUTO_INCREMENT,
  `ten_ghe` varchar(50) NOT NULL,
  `loai_ghe` varchar(50) DEFAULT NULL,
  `ma_rap` int NOT NULL,
  PRIMARY KEY (`ma_ghe`),
  KEY `fk_ghe_rapphim` (`ma_rap`),
  CONSTRAINT `fk_ghe_rapphim` FOREIGN KEY (`ma_rap`) REFERENCES `rap_phim` (`ma_rap`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `he_thong_rap`;
CREATE TABLE `he_thong_rap` (
  `ma_he_thong_rap` int NOT NULL AUTO_INCREMENT,
  `ten_he_thong_rap` varchar(255) NOT NULL,
  `logo` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`ma_he_thong_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `lich_chieu`;
CREATE TABLE `lich_chieu` (
  `ma_lich_chieu` int NOT NULL AUTO_INCREMENT,
  `ma_rap` int NOT NULL,
  `ma_phim` int NOT NULL,
  `ngay_gio_chieu` datetime NOT NULL,
  `gia_ve` int NOT NULL,
  PRIMARY KEY (`ma_lich_chieu`),
  KEY `fk_lichchieu_rapphim` (`ma_rap`),
  KEY `fk_lichchieu_phim` (`ma_phim`),
  CONSTRAINT `fk_lichchieu_phim` FOREIGN KEY (`ma_phim`) REFERENCES `phim` (`ma_phim`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_lichchieu_rapphim` FOREIGN KEY (`ma_rap`) REFERENCES `rap_phim` (`ma_rap`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `nguoi_dung`;
CREATE TABLE `nguoi_dung` (
  `tai_khoan` int NOT NULL AUTO_INCREMENT,
  `ho_ten` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `so_dt` varchar(20) DEFAULT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `loai_nguoi_dung` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`tai_khoan`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `phim`;
CREATE TABLE `phim` (
  `ma_phim` int NOT NULL AUTO_INCREMENT,
  `ten_phim` varchar(255) NOT NULL,
  `trailer` varchar(500) DEFAULT NULL,
  `hinh_anh` varchar(500) DEFAULT NULL,
  `mo_ta` text,
  `ngay_khoi_chieu` date DEFAULT NULL,
  `danh_gia` int DEFAULT '0',
  `hot` tinyint(1) DEFAULT '0',
  `dang_chieu` tinyint(1) DEFAULT '0',
  `sap_chieu` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `rap_phim`;
CREATE TABLE `rap_phim` (
  `ma_rap` int NOT NULL AUTO_INCREMENT,
  `ten_rap` varchar(255) NOT NULL,
  `ma_cum_rap` int NOT NULL,
  PRIMARY KEY (`ma_rap`),
  KEY `fk_rapphim_cumrap` (`ma_cum_rap`),
  CONSTRAINT `fk_rapphim_cumrap` FOREIGN KEY (`ma_cum_rap`) REFERENCES `cum_rap` (`ma_cum_rap`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(1, 1, 'https://example.com/banner-endgame.jpg'),
(2, 2, 'https://example.com/banner-spiderman.jpg'),
(3, 3, 'https://example.com/banner-batman.jpg');
INSERT INTO `cum_rap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(1, 'CGV Vincom Đồng Khởi', 'Quận 1, TP.HCM', 1),
(2, 'CGV Aeon Tân Phú', 'Tân Phú, TP.HCM', 1),
(3, 'Lotte Gò Vấp', 'Gò Vấp, TP.HCM', 2),
(4, 'Lotte Quận 7', 'Quận 7, TP.HCM', 2),
(5, 'Galaxy Nguyễn Du', 'Quận 1, TP.HCM', 3);
INSERT INTO `dat_ve` (`tai_khoan`, `ma_lich_chieu`, `ma_ghe`) VALUES
(1, 1, 1),
(1, 1, 2),
(2, 2, 3),
(3, 3, 4),
(4, 1, 3);
INSERT INTO `ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(1, 'A1', 'Thuong', 1),
(2, 'A2', 'Thuong', 1),
(3, 'A3', 'VIP', 1),
(4, 'B1', 'Thuong', 2),
(5, 'B2', 'VIP', 2),
(6, 'C1', 'Thuong', 3),
(7, 'C2', 'VIP', 3),
(8, 'D1', 'Thuong', 4),
(9, 'D2', 'VIP', 4),
(10, 'E1', 'Thuong', 5),
(11, 'E2', 'VIP', 5);
INSERT INTO `he_thong_rap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(1, 'CGV', 'https://example.com/logo-cgv.png'),
(2, 'Lotte Cinema', 'https://example.com/logo-lotte.png'),
(3, 'Galaxy Cinema', 'https://example.com/logo-galaxy.png');
INSERT INTO `lich_chieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(1, 1, 1, '2026-05-20 18:00:00', 90000),
(2, 1, 2, '2026-05-20 21:00:00', 100000),
(3, 2, 1, '2026-05-21 19:30:00', 85000),
(4, 3, 3, '2026-12-10 20:00:00', 120000),
(5, 4, 2, '2026-05-22 17:00:00', 95000);
INSERT INTO `nguoi_dung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(1, 'Nguyễn Văn A', 'user@example.com', '0123456789', '$2b$10$k9Qo4Ud2grRHC5Tmwclpe.xoO7r5SVZ4foJJR9Ojc10JXmsiyXnEG', 'KhachHang'),
(2, 'Trần Văn B', 'admin@example.com', '0988888888', '$2b$10$k9Qo4Ud2grRHC5Tmwclpe.xoO7r5SVZ4foJJR9Ojc10JXmsiyXnEG', 'QuanTri'),
(3, 'Lê Thị C', 'customer@example.com', '0977777777', '$2b$10$k9Qo4Ud2grRHC5Tmwclpe.xoO7r5SVZ4foJJR9Ojc10JXmsiyXnEG', 'KhachHang'),
(4, 'Test User', 'testuser1234@example.com', NULL, '$2b$10$.LyTEkYhHfy.4bw9EG0xX.O.cJ.NDC4sIEP/2e0OxR1cT7Jw84fM.', 'KhachHang');
INSERT INTO `phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(1, 'Avengers Endgame', 'https://youtube.com/endgame', 'https://example.com/endgame.jpg', 'Biệt đội siêu anh hùng chiến đấu với Thanos', '2025-01-10', 9, 1, 1, 0),
(2, 'Spider Man No Way Home', 'https://youtube.com/spiderman', 'https://example.com/spiderman.jpg', 'Người Nhện đa vũ trụ', '2025-02-15', 8, 1, 1, 0),
(3, 'Batman', 'https://youtube.com/batman', 'https://example.com/batman.jpg', 'Kỵ sĩ bóng đêm', '2025-12-01', 0, 0, 0, 1);
INSERT INTO `rap_phim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(1, 'Rạp 1', 1),
(2, 'Rạp 2', 1),
(3, 'Rạp 1', 2),
(4, 'Rạp 1', 3),
(5, 'Rạp 2', 3),
(6, 'Rạp 1', 4),
(7, 'Rạp 1', 5);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;