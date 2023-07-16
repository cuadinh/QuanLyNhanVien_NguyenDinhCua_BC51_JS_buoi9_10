function Validation() {
  this.kiemTraRong = function (value, errorID, mess) {
    if (value === "") {
      getEle(errorID).innerHTML = mess;
      getEle(errorID).style.display = "block";
      return false;
    }
    getEle(errorID).style.display = "none";
    return true;
  };
  this.kiemTraChucVu = function (idSelect, errorID, mess) {
    var chonChucVu = getEle(idSelect);
    // console.log(chonChucVu);

    if (chonChucVu.selectedIndex != 0) {
      getEle(errorID).style.display = "none";
      return true;
    }
    getEle(errorID).innerHTML = mess;
    getEle(errorID).style.display = "block";
    return false;
  };
  this.kiemTraDoDaiKiTu = function (value, errorID, mess, min, max) {
    if (min <= value.trim().length && value.trim().length <= max) {
      getEle(errorID).style.display = "none";
      return true;
    }
    getEle(errorID).style.display = "block";
    getEle(errorID).innerHTML = mess;

    return false;
  };
  this.checkPattern = function (value, errorID, mess, letter) {
    if (value.match(letter)) {
      getEle(errorID).style.display = "none";
      return true;
    }
    getEle(errorID).innerHTML = mess;

    getEle(errorID).style.display = "block";
    return false;
  };
  this.kiemTraKhoangGiaTri = function (value, errorID, mess, min, max) {
    if (min <= parseFloat(value) && parseFloat(value) <= max) {
      getEle(errorID).style.display = "none";
      return true;
    }
    getEle(errorID).style.display = "block";
    getEle(errorID).innerHTML = mess;

    return false;
  };
}
