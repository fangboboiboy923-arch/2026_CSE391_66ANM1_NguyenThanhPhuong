-- =========================================
-- TẠO DATABASE
-- =========================================
CREATE DATABASE QuanLiKyTucXa
GO

USE QuanLiKyTucXa
GO


-- =========================================
-- XÓA BẢNG NẾU ĐÃ TỒN TẠI
-- =========================================
IF OBJECT_ID('CuTru', 'U') IS NOT NULL DROP TABLE CuTru
IF OBJECT_ID('HoSoDangKi', 'U') IS NOT NULL DROP TABLE HoSoDangKi
IF OBJECT_ID('SinhVien', 'U') IS NOT NULL DROP TABLE SinhVien


-- =========================================
-- BẢNG 1: SINH VIÊN (ĐÚNG NHƯ TRONG ẢNH)
-- =========================================
CREATE TABLE SinhVien
(
    MaSV VARCHAR(20) PRIMARY KEY,
    HoTen NVARCHAR(100) NOT NULL,
    NgaySinh DATE,
    GioiTinh NVARCHAR(10),
    Lop NVARCHAR(50),
    Khoa NVARCHAR(50),
    SoDienThoai VARCHAR(15),
    Email VARCHAR(100),
    DiaChi NVARCHAR(200)
)


-- =========================================
-- BẢNG 2: HỒ SƠ ĐĂNG KÝ (ĐÚNG NHƯ TRONG ẢNH)
-- =========================================
CREATE TABLE HoSoDangKi
(
    MaHoSo VARCHAR(20) PRIMARY KEY,
    MaSV VARCHAR(20) NOT NULL,
    NgayDangKi DATE,
    LoaiDangKi NVARCHAR(50),
    TrangThai NVARCHAR(50),
    GhiChu NVARCHAR(200),
    FOREIGN KEY (MaSV) REFERENCES SinhVien(MaSV)
)


-- =========================================
-- BẢNG 3: CƯ TRÚ (ĐÚNG NHƯ TRONG ẢNH)
-- =========================================
CREATE TABLE CuTru
(
    MaCuTru INT IDENTITY(1,1) PRIMARY KEY,
    MaSV VARCHAR(20) NOT NULL,
    Phong NVARCHAR(20),
    NgayBatDau DATE,
    NgayHetHan DATE,
    TrangThaiCuTru NVARCHAR(50),
    GhiChu NVARCHAR(200),
    FOREIGN KEY (MaSV) REFERENCES SinhVien(MaSV)
)


-- =========================================
-- DỮ LIỆU MẪU (CHO 3 FORM HOẠT ĐỘNG)
-- =========================================

-- Thêm sinh viên
INSERT INTO SinhVien VALUES
('SV001', N'Nguyễn Văn An', '2004-05-12', N'Nam', 'CNTT1', N'Công nghệ thông tin', '0911111111', 'an@gmail.com', N'Hà Nội'),
('SV002', N'Trần Thị Bình', '2004-09-21', N'Nữ', 'CNTT2', N'Công nghệ thông tin', '0922222222', 'binh@gmail.com', N'Hải Phòng'),
('SV003', N'Lê Minh Hoàng', '2003-11-02', N'Nam', 'QTKD1', N'Quản trị kinh doanh', '0933333333', 'hoang@gmail.com', N'Đà Nẵng')

-- Thêm hồ sơ đăng ký
INSERT INTO HoSoDangKi VALUES
('HS001', 'SV001', '2026-01-10', N'Đăng ký mới', N'Đã duyệt', N'Đầy đủ giấy tờ'),
('HS002', 'SV002', '2026-01-15', N'Gia hạn', N'Chờ duyệt', N'Chưa nộp CCCD'),
('HS003', 'SV003', '2026-01-20', N'Đăng ký mới', N'Đã duyệt', N'')

-- Thêm cư trú
INSERT INTO CuTru (MaSV, Phong, NgayBatDau, NgayHetHan, TrangThaiCuTru, GhiChu) VALUES
('SV001', 'A101', '2026-01-01', '2026-12-31', N'Đang ở', N''),
('SV002', 'B205', '2026-02-01', '2026-11-30', N'Đang ở', N''),
('SV003', 'C303', '2026-03-01', '2026-10-30', N'Đã rời', N'Đã trả phòng')


-- =========================================
-- KIỂM TRA
-- =========================================
SELECT * FROM SinhVien
SELECT * FROM HoSoDangKi
SELECT * FROM CuTru