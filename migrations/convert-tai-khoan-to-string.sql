SET FOREIGN_KEY_CHECKS = 0;

ALTER TABLE dat_ve DROP FOREIGN KEY fk_datve_nguoidung;

ALTER TABLE nguoi_dung MODIFY tai_khoan VARCHAR(255) NOT NULL;
ALTER TABLE dat_ve MODIFY tai_khoan VARCHAR(255) NOT NULL;

ALTER TABLE dat_ve
  ADD CONSTRAINT fk_datve_nguoidung
  FOREIGN KEY (tai_khoan)
  REFERENCES nguoi_dung (tai_khoan)
  ON DELETE CASCADE;

SET FOREIGN_KEY_CHECKS = 1;
