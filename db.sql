docker run --name CAPSTONE_BE_Movie -e MYSQL_ROOT_PASSWORD=12345 -d -p 3308:3306 mysql:latest

CREATE DATABASE IF NOT EXISTS movie_db;

CREATE DATABASE IF NOT EXISTS movie_booking_db

CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE movie_booking_db;

-- =========================
-- BẢNG HỆ THỐNG RẠP
-- =========================
CREATE TABLE he_thong_rap (
    ma_he_thong_rap INT AUTO_INCREMENT PRIMARY KEY,
    ten_he_thong_rap VARCHAR(255) NOT NULL,
    logo VARCHAR(500)
);

-- =========================
-- BẢNG CỤM RẠP
-- =========================
CREATE TABLE cum_rap (
    ma_cum_rap INT AUTO_INCREMENT PRIMARY KEY,
    ten_cum_rap VARCHAR(255) NOT NULL,
    dia_chi VARCHAR(500),
    ma_he_thong_rap INT NOT NULL,

    CONSTRAINT fk_cumrap_hethongrap
    FOREIGN KEY (ma_he_thong_rap)
    REFERENCES he_thong_rap(ma_he_thong_rap)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- =========================
-- BẢNG RẠP PHIM
-- =========================
CREATE TABLE rap_phim (
    ma_rap INT AUTO_INCREMENT PRIMARY KEY,
    ten_rap VARCHAR(255) NOT NULL,
    ma_cum_rap INT NOT NULL,

    CONSTRAINT fk_rapphim_cumrap
    FOREIGN KEY (ma_cum_rap)
    REFERENCES cum_rap(ma_cum_rap)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- =========================
-- BẢNG PHIM
-- =========================
CREATE TABLE phim (
    ma_phim INT AUTO_INCREMENT PRIMARY KEY,
    ten_phim VARCHAR(255) NOT NULL,
    trailer VARCHAR(500),
    hinh_anh VARCHAR(500),
    mo_ta TEXT,
    ngay_khoi_chieu DATE,
    danh_gia INT DEFAULT 0,
    hot BOOLEAN DEFAULT FALSE,
    dang_chieu BOOLEAN DEFAULT FALSE,
    sap_chieu BOOLEAN DEFAULT FALSE
);

-- =========================
-- BẢNG BANNER
-- =========================
CREATE TABLE banner (
    ma_banner INT AUTO_INCREMENT PRIMARY KEY,
    ma_phim INT NOT NULL,
    hinh_anh VARCHAR(500),

    CONSTRAINT fk_banner_phim
    FOREIGN KEY (ma_phim)
    REFERENCES phim(ma_phim)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- =========================
-- BẢNG GHẾ
-- =========================
CREATE TABLE ghe (
    ma_ghe INT AUTO_INCREMENT PRIMARY KEY,
    ten_ghe VARCHAR(50) NOT NULL,
    loai_ghe VARCHAR(50),
    ma_rap INT NOT NULL,

    CONSTRAINT fk_ghe_rapphim
    FOREIGN KEY (ma_rap)
    REFERENCES rap_phim(ma_rap)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- =========================
-- BẢNG LỊCH CHIẾU
-- =========================
CREATE TABLE lich_chieu (
    ma_lich_chieu INT AUTO_INCREMENT PRIMARY KEY,
    ma_rap INT NOT NULL,
    ma_phim INT NOT NULL,
    ngay_gio_chieu DATETIME NOT NULL,
    gia_ve INT NOT NULL,

    CONSTRAINT fk_lichchieu_rapphim
    FOREIGN KEY (ma_rap)
    REFERENCES rap_phim(ma_rap)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    CONSTRAINT fk_lichchieu_phim
    FOREIGN KEY (ma_phim)
    REFERENCES phim(ma_phim)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- =========================
-- BẢNG NGƯỜI DÙNG
-- =========================
CREATE TABLE nguoi_dung (
    tai_khoan INT AUTO_INCREMENT PRIMARY KEY,
    ho_ten VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    so_dt VARCHAR(20),
    mat_khau VARCHAR(255) NOT NULL,
    loai_nguoi_dung VARCHAR(50)
);

-- =========================
-- BẢNG ĐẶT VÉ
-- =========================
CREATE TABLE dat_ve (
    tai_khoan INT NOT NULL,
    ma_lich_chieu INT NOT NULL,
    ma_ghe INT NOT NULL,

    PRIMARY KEY (tai_khoan, ma_lich_chieu, ma_ghe),

    CONSTRAINT fk_datve_nguoidung
    FOREIGN KEY (tai_khoan)
    REFERENCES nguoi_dung(tai_khoan)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    CONSTRAINT fk_datve_lichchieu
    FOREIGN KEY (ma_lich_chieu)
    REFERENCES lich_chieu(ma_lich_chieu)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    CONSTRAINT fk_datve_ghe
    FOREIGN KEY (ma_ghe)
    REFERENCES ghe(ma_ghe)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);