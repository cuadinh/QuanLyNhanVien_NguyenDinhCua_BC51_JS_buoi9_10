function DSNV() {
  this.arr = [];
  this.themNV = function (nv) {
    this.arr.push(nv);
  };
  this.timViTri = function (tknv) {
    var index = -1;
    for (var i = 0; i < this.arr.length; i++) {
      var nv = this.arr[i];
      if (tknv === nv.tknv) {
        index = i;
        break;
      }
    }
    return index;
  };
  this._xoaNV = function (tknv) {
    var index = this.timViTri(tknv);
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  };
  this.layThongTinChiTietNV = function (tknv) {
    var index = this.timViTri(tknv);
    if (index !== -1) {
      var nv = this.arr[index];
    }
    return nv;
  };
  this._capNhat = function (nv) {
    var index = this.timViTri(nv.tknv);
    if (index !== -1) {
      this.arr[index] = nv;
    }
  };
  this.timKiemNV = function (keyword) {
    var mangTimKiem = [];
    for (var i = 0; i < this.arr.length; i++) {
      var nv = this.arr[i];
      console.log(nv);
      var keywordLowerCase = keyword.toLowerCase();
      // console.log(keywordLowerCase);

      var xepLoaiLowerCase = nv.xepLoai.toLowerCase();
      // console.log(xepLoaiLowerCase);

      if (xepLoaiLowerCase.indexOf(keywordLowerCase) !== -1) {
        mangTimKiem.push(nv);
      }
    }
    return mangTimKiem;
  };
}
