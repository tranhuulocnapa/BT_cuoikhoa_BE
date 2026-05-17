USE movie_booking_db;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM dat_ve;
DELETE FROM lich_chieu;
DELETE FROM ghe;
DELETE FROM banner;
DELETE FROM rap_phim;
DELETE FROM cum_rap;
DELETE FROM he_thong_rap;
DELETE FROM phim;
DELETE FROM nguoi_dung;

ALTER TABLE lich_chieu AUTO_INCREMENT = 1;
ALTER TABLE ghe AUTO_INCREMENT = 1;
ALTER TABLE banner AUTO_INCREMENT = 1;
ALTER TABLE rap_phim AUTO_INCREMENT = 1;
ALTER TABLE cum_rap AUTO_INCREMENT = 1;
ALTER TABLE he_thong_rap AUTO_INCREMENT = 1;
ALTER TABLE phim AUTO_INCREMENT = 1;
ALTER TABLE nguoi_dung AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO nguoi_dung
  (tai_khoan, ho_ten, email, so_dt, mat_khau, loai_nguoi_dung)
VALUES
  (1, 'Admin Movie', 'admin@test.com', '0909000001', '$2b$10$PVL.gmbEQFTbDtebpUvHveNz4DwBVcy7xitHgD2855Kwmf9Z1Bdvm', 'QuanTri'),
  (2, 'Nguyen Van A', 'user@test.com', '0909000002', '$2b$10$Vh81KbXpYXEyQP21GpS17ub5L8OzKHlslUgLn78aD9/RTHJ/kjo4q', 'KhachHang'),
  (3, 'Tran Thi B', 'member@test.com', '0909000003', '$2b$10$Vh81KbXpYXEyQP21GpS17ub5L8OzKHlslUgLn78aD9/RTHJ/kjo4q', 'KhachHang'),
  (4, 'Le Minh C', 'guest@test.com', '0909000004', '$2b$10$Vh81KbXpYXEyQP21GpS17ub5L8OzKHlslUgLn78aD9/RTHJ/kjo4q', 'KhachHang');

INSERT INTO phim
  (ma_phim, ten_phim, trailer, hinh_anh, mo_ta, ngay_khoi_chieu, danh_gia, hot, dang_chieu, sap_chieu)
VALUES
  (1, 'Lat Mat 8', 'https://www.youtube.com/watch?v=latmat8', 'https://picsum.photos/seed/lat-mat-8/320/480', 'Phim hanh dong gia dinh Viet Nam.', '2026-04-18', 9, TRUE, TRUE, FALSE),
  (2, 'Mai', 'https://www.youtube.com/watch?v=mai', 'https://picsum.photos/seed/mai/320/480', 'Cau chuyen tam ly tinh cam ve gia dinh va lua chon.', '2026-03-01', 8, TRUE, TRUE, FALSE),
  (3, 'Dune: Part Three', 'https://www.youtube.com/watch?v=dune3', 'https://picsum.photos/seed/dune-3/320/480', 'Hanh trinh moi tren hanh tinh cat.', '2026-06-20', 10, TRUE, FALSE, TRUE),
  (4, 'Inside Out 3', 'https://www.youtube.com/watch?v=insideout3', 'https://picsum.photos/seed/inside-out-3/320/480', 'Nhung cam xuc moi trong hanh trinh truong thanh.', '2026-07-12', 9, FALSE, FALSE, TRUE),
  (5, 'Godzilla x Kong: New Empire', 'https://www.youtube.com/watch?v=godzilla-kong', 'https://picsum.photos/seed/godzilla-kong/320/480', 'Dai chien quai vat tren man anh rong.', '2026-02-10', 8, TRUE, TRUE, FALSE),
  (6, 'Kung Fu Panda 5', 'https://www.youtube.com/watch?v=kungfu-panda-5', 'https://picsum.photos/seed/kungfu-panda-5/320/480', 'Po tro lai voi mot thu thach moi.', '2026-05-05', 7, FALSE, TRUE, FALSE),
  (7, 'Avatar: Fire and Ash', 'https://www.youtube.com/watch?v=avatar-fire-ash', 'https://picsum.photos/seed/avatar-fire-ash/320/480', 'Phan tiep theo tai Pandora.', '2026-12-19', 10, TRUE, FALSE, TRUE),
  (8, 'Detective Conan Movie', 'https://www.youtube.com/watch?v=conan-movie', 'https://picsum.photos/seed/conan-movie/320/480', 'Vu an moi cua Conan va doi tham tu nhi.', '2026-05-28', 8, FALSE, TRUE, FALSE);

INSERT INTO banner
  (ma_banner, ma_phim, hinh_anh)
VALUES
  (1, 1, 'https://picsum.photos/seed/banner-lat-mat-8/1200/400'),
  (2, 2, 'https://picsum.photos/seed/banner-mai/1200/400'),
  (3, 3, 'https://picsum.photos/seed/banner-dune-3/1200/400'),
  (4, 5, 'https://picsum.photos/seed/banner-godzilla-kong/1200/400'),
  (5, 7, 'https://picsum.photos/seed/banner-avatar/1200/400');

INSERT INTO he_thong_rap
  (ma_he_thong_rap, ten_he_thong_rap, logo)
VALUES
  (1, 'CGV', 'https://picsum.photos/seed/logo-cgv/120/120'),
  (2, 'BHD Star', 'https://picsum.photos/seed/logo-bhd/120/120'),
  (3, 'Galaxy Cinema', 'https://picsum.photos/seed/logo-galaxy/120/120');

INSERT INTO cum_rap
  (ma_cum_rap, ten_cum_rap, dia_chi, ma_he_thong_rap)
VALUES
  (1, 'CGV Vincom Dong Khoi', '72 Le Thanh Ton, Quan 1, TP.HCM', 1),
  (2, 'CGV Su Van Hanh', '11 Su Van Hanh, Quan 10, TP.HCM', 1),
  (3, 'BHD Star Bitexco', '2 Hai Trieu, Quan 1, TP.HCM', 2),
  (4, 'BHD Star Pham Hung', 'C6/27 Pham Hung, Binh Chanh, TP.HCM', 2),
  (5, 'Galaxy Nguyen Du', '116 Nguyen Du, Quan 1, TP.HCM', 3);

INSERT INTO rap_phim
  (ma_rap, ten_rap, ma_cum_rap)
VALUES
  (1, 'Rap 1', 1),
  (2, 'Rap 2', 1),
  (3, 'Rap 3', 2),
  (4, 'Rap 1', 3),
  (5, 'Rap 2', 3),
  (6, 'Rap 1', 4),
  (7, 'Rap 1', 5),
  (8, 'Rap 2', 5);

INSERT INTO ghe
  (ma_ghe, ten_ghe, loai_ghe, ma_rap)
VALUES
  (1, 'A01', 'Thuong', 1), (2, 'A02', 'Thuong', 1), (3, 'A03', 'Thuong', 1), (4, 'A04', 'Thuong', 1), (5, 'A05', 'Thuong', 1),
  (6, 'B01', 'Vip', 1), (7, 'B02', 'Vip', 1), (8, 'B03', 'Vip', 1), (9, 'B04', 'Vip', 1), (10, 'B05', 'Vip', 1),
  (11, 'A01', 'Thuong', 2), (12, 'A02', 'Thuong', 2), (13, 'A03', 'Thuong', 2), (14, 'A04', 'Thuong', 2), (15, 'A05', 'Thuong', 2),
  (16, 'B01', 'Vip', 2), (17, 'B02', 'Vip', 2), (18, 'B03', 'Vip', 2), (19, 'B04', 'Vip', 2), (20, 'B05', 'Vip', 2),
  (21, 'A01', 'Thuong', 3), (22, 'A02', 'Thuong', 3), (23, 'A03', 'Thuong', 3), (24, 'A04', 'Thuong', 3), (25, 'A05', 'Thuong', 3),
  (26, 'B01', 'Vip', 3), (27, 'B02', 'Vip', 3), (28, 'B03', 'Vip', 3), (29, 'B04', 'Vip', 3), (30, 'B05', 'Vip', 3),
  (31, 'A01', 'Thuong', 4), (32, 'A02', 'Thuong', 4), (33, 'A03', 'Thuong', 4), (34, 'A04', 'Thuong', 4), (35, 'A05', 'Thuong', 4),
  (36, 'B01', 'Vip', 4), (37, 'B02', 'Vip', 4), (38, 'B03', 'Vip', 4), (39, 'B04', 'Vip', 4), (40, 'B05', 'Vip', 4),
  (41, 'A01', 'Thuong', 5), (42, 'A02', 'Thuong', 5), (43, 'A03', 'Thuong', 5), (44, 'A04', 'Thuong', 5), (45, 'A05', 'Thuong', 5),
  (46, 'B01', 'Vip', 5), (47, 'B02', 'Vip', 5), (48, 'B03', 'Vip', 5), (49, 'B04', 'Vip', 5), (50, 'B05', 'Vip', 5),
  (51, 'A01', 'Thuong', 6), (52, 'A02', 'Thuong', 6), (53, 'A03', 'Thuong', 6), (54, 'A04', 'Thuong', 6), (55, 'A05', 'Thuong', 6),
  (56, 'B01', 'Vip', 6), (57, 'B02', 'Vip', 6), (58, 'B03', 'Vip', 6), (59, 'B04', 'Vip', 6), (60, 'B05', 'Vip', 6),
  (61, 'A01', 'Thuong', 7), (62, 'A02', 'Thuong', 7), (63, 'A03', 'Thuong', 7), (64, 'A04', 'Thuong', 7), (65, 'A05', 'Thuong', 7),
  (66, 'B01', 'Vip', 7), (67, 'B02', 'Vip', 7), (68, 'B03', 'Vip', 7), (69, 'B04', 'Vip', 7), (70, 'B05', 'Vip', 7),
  (71, 'A01', 'Thuong', 8), (72, 'A02', 'Thuong', 8), (73, 'A03', 'Thuong', 8), (74, 'A04', 'Thuong', 8), (75, 'A05', 'Thuong', 8),
  (76, 'B01', 'Vip', 8), (77, 'B02', 'Vip', 8), (78, 'B03', 'Vip', 8), (79, 'B04', 'Vip', 8), (80, 'B05', 'Vip', 8);

INSERT INTO lich_chieu
  (ma_lich_chieu, ma_rap, ma_phim, ngay_gio_chieu, gia_ve)
VALUES
  (1, 1, 1, '2026-05-18 09:30:00', 75000),
  (2, 1, 2, '2026-05-18 13:00:00', 80000),
  (3, 2, 3, '2026-05-19 19:15:00', 120000),
  (4, 3, 4, '2026-05-20 10:00:00', 90000),
  (5, 4, 5, '2026-05-20 20:30:00', 110000),
  (6, 5, 6, '2026-05-21 16:45:00', 85000),
  (7, 6, 7, '2026-05-22 21:00:00', 130000),
  (8, 7, 8, '2026-05-23 18:00:00', 95000),
  (9, 8, 1, '2026-05-24 14:30:00', 90000),
  (10, 2, 5, '2026-05-25 17:30:00', 100000);

INSERT INTO dat_ve
  (tai_khoan, ma_lich_chieu, ma_ghe)
VALUES
  (2, 1, 1),
  (2, 1, 2),
  (3, 1, 6),
  (3, 3, 16),
  (4, 5, 31),
  (2, 8, 61);
