var dsnv = new DSNV();
function getEle(id) {
  return document.getElementById(id);
}

function layThongTinNV() {
  var tknv = getEle("tknv").value;
  var tenSV = getEle("name").value;
  var email = getEle("email").value;
  var password = getEle("password").value;
  var ngayLam = getEle("datepicker").value;
  var luongCB = Number(getEle("luongCB").value);
  var chucvu = getEle("chucvu").value;
  var gioLam = Number(getEle("gioLam").value);

  var nv = new NhanVien(
    tknv,
    tenSV,
    email,
    password,
    ngayLam,
    luongCB,
    chucvu,
    gioLam
  );
  nv.tinhTongLuong();
  nv.tinhXepLoai();
  return nv;
}

function renderTable(data) {
  var content = "";

  for (var i = 0; i < data.length; i++) {
    var nv = data[i];
    content += `
        <tr>
            <td>${nv.tknv}</td>
            <td>${nv.tenSV}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucvu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.xepLoai}</td>
        </tr>
        `;
    getEle("tableDanhSach").innerHTML = content;
  }
}

function themNhanVien() {
  var nv = layThongTinNV();

  dsnv.themNV(nv);
  renderTable(dsnv.arr);
}
