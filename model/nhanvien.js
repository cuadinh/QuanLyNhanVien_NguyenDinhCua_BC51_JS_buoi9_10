function NhanVien(
  _tknv,
  _tenNV,
  _email,
  _password,
  _ngayLam,
  _luongCB,
  _chucVu,
  _gioLam
) {
  this.tknv = _tknv;
  this.tenNV = _tenNV;
  this.email = _email;
  this.password = _password;
  this.ngayLam = _ngayLam;
  this.luongCB = _luongCB;
  this.chucVu = _chucVu;
  this.gioLam = _gioLam;
  this.tinhTongLuong = function () {
    if (this.chucVu === "Sếp") {
      this.tongLuong = this.luongCB * 3;
    } else if (this.chucVu === "Trưởng phòng") {
      this.tongLuong = this.luongCB * 2;
    } else {
      this.tongLuong = this.luongCB;
    }
  };
  this.tinhXepLoai = function () {
    if (this.gioLam < 160) {
      this.xepLoai = "Trung bình";
    } else if (160 <= this.gioLam && this.gioLam < 176) {
      this.xepLoai = "Khá";
    } else if (176 <= this.gioLam && this.gioLam < 192) {
      this.xepLoai = "Giỏi";
    } else {
      this.xepLoai = "Xuất xắc";
    }
  };
}
