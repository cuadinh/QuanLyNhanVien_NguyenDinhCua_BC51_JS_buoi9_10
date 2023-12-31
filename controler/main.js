var dsnv = new DSNV();
var validation = new Validation();
getLocalStorage();

function getEle(id) {
  return document.getElementById(id);
}

function layThongTinNV(isAdd) {
  var tknv = getEle("tknv").value;
  var tenNV = getEle("name").value;
  var email = getEle("email").value;
  var password = getEle("password").value;
  var ngayLam = getEle("datepicker").value;
  var luongCB = getEle("luongCB").value;
  var chucVu = getEle("chucvu").value;
  var gioLam = getEle("gioLam").value;

  var isValid = true;
  if (isAdd) {
    isValid &=
      validation.kiemTraRong(
        tknv,
        "tbTKNV",
        "(*) Vui lòng nhập mã nhân viên"
      ) &&
      validation.kiemTraDoDaiKiTu(
        tknv,
        "tbTKNV",
        "(*) Vui lòng nhập tài khoản từ 4 - 6",
        4,
        6
      ) &&
      validation.kiemTraMaNVTonTai(
        tknv,
        "tbTKNV",
        "(*) Mã nhân viên đã tồn tại",
        dsnv.arr
      );
  }
  isValid &=
    validation.kiemTraRong(tenNV, "tbTen", "(*) Vui lòng nhập tên nhân viên") &&
    validation.checkPattern(
      tenNV,
      "tbTen",
      "(*) Vui lòng nhập tên là chữ",
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
    );

  isValid &=
    validation.kiemTraRong(email, "tbEmail", "(*) Vui lòng nhập email") &&
    validation.checkPattern(
      email,
      "tbEmail",
      "(*) Vui lòng nhập đúng định dạng",
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
  isValid &=
    validation.kiemTraRong(
      password,
      "tbMatKhau",
      "(*) Vui lòng nhập mật khẩu"
    ) &&
    validation.checkPattern(
      password,
      "tbMatKhau",
      "(*) Vui lòng nhập MK có kí tự đặc biệt, số, ký tự in hoa, thường",
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/
    );
  isValid &=
    validation.kiemTraRong(ngayLam, "tbNgay", "(*) Vui lòng nhập ngày làm") &&
    validation.checkPattern(
      ngayLam,
      "tbNgay",
      "(*) Vui lòng nhập đúng định dạng",
      /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
    );
  isValid &=
    validation.kiemTraRong(
      luongCB,
      "tbLuongCB",
      "(*) Vui lòng nhập lương căn bản"
    ) &&
    validation.kiemTraKhoangGiaTri(
      luongCB,
      "tbLuongCB",
      "(*) Vui lòng nhập mức lương từ 1tr - 20tr",
      1000000,
      20000000
    );
  isValid &=
    validation.kiemTraRong(
      gioLam,
      "tbGiolam",
      "(*) Vui lòng nhập số giờ làm"
    ) &&
    validation.kiemTraKhoangGiaTri(
      gioLam,
      "tbGiolam",
      "(*) Vui lòng nhập giờ làm từ 80 - 200",
      80,
      200
    );
  isValid &= validation.kiemTraChucVu(
    "chucvu",
    "tbChucVu",
    "(*) Vui lòng nhập chức vụ"
  );
  if (isValid) {
    var nv = new NhanVien(
      tknv,
      tenNV,
      email,
      password,
      ngayLam,
      luongCB,
      chucVu,
      gioLam
    );
    nv.tinhTongLuong();
    nv.tinhXepLoai();
    return nv;
  }
  return null;
}

function renderTable(data) {
  var content = "";

  for (var i = 0; i < data.length; i++) {
    var nv = data[i];
    content += `
        <tr>
            <td>${nv.tknv}</td>
            <td>${nv.tenNV}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.xepLoai}</td>
            <td>
            <button class='btn btn-success' onclick = "suaNV('${nv.tknv}')">Sua</button>
            <button class = 'btn btn-danger' onclick = "xoaNV('${nv.tknv}')"> Xoa </button>
            </td>
        </tr>
        `;
    getEle("tableDanhSach").innerHTML = content;
  }
}

function themNhanVien() {
  var nv = layThongTinNV(true);

  if (nv) {
    dsnv.themNV(nv);
    renderTable(dsnv.arr);
    setLocalStorage();
  }
}
function xoaNV(tknv) {
  dsnv._xoaNV(tknv);
  renderTable(dsnv.arr);
  setLocalStorage();
}
function suaNV(tknv) {
  var nv = dsnv.layThongTinChiTietNV(tknv);
  if (nv) {
    getEle("tknv").value = nv.tknv;
    getEle("name").value = nv.tenNV;
    getEle("email").value = nv.email;
    getEle("password").value = nv.password;
    getEle("datepicker").value = nv.ngayLam;
    getEle("luongCB").value = nv.luongCB;
    getEle("chucvu").value = nv.chucVu;
    getEle("gioLam").value = nv.gioLam;
  }
}
function capNhatNV() {
  var nv = layThongTinNV(false);
  if (nv) {
    dsnv._capNhat(nv);
    renderTable(dsnv.arr);
    setLocalStorage();
  }
}

// tim kiem nhan vien
function searchNV() {
  var txtSearch = getEle("searchName").value;
  var mangTimKiem = dsnv.timKiemNV(txtSearch);
  renderTable(mangTimKiem);
}
getEle("searchName").addEventListener("keyup", searchNV);

function getLocalStorage() {
  if (localStorage.getItem("DSNV")) {
    var dataString = localStorage.getItem("DSNV");
    var dataJson = JSON.parse(dataString);
    dsnv.arr = dataJson;
    renderTable(dsnv.arr);
  }
}

function setLocalStorage() {
  var dataString = JSON.stringify(dsnv.arr);
  localStorage.setItem("DSNV", dataString);
}
