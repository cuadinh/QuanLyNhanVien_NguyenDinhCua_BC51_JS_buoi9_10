var dsnv = new DSNV();

var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

function layThongTinNV() {
  var tknv = getEle("tknv").value;
  var tenNV = getEle("name").value;
  var email = getEle("email").value;
  var password = getEle("password").value;
  var ngayLam = getEle("datepicker").value;
  var luongCB = getEle("luongCB").value;
  var chucVu = getEle("chucvu").value;
  var gioLam = getEle("gioLam").value;

  var isValid = true;
  isValid &=
    validation.kiemTraRong(tknv, "tbTKNV", "(*) Vui lòng nhập mã nhân viên") &&
    validation.kiemTraDoDaiKiTu(
      tknv,
      "tbTKNV",
      "(*) Vui lòng nhập tài khoản từ 4 - 6",
      4,
      6
    );
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
  }
}
