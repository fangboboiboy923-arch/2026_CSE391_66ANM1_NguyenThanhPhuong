import { useState } from "react";
import { duLieuBanDau } from "./data";
import FormPhong from "./components/FormPhong";
import DanhSachPhong from "./components/DanhSachPhong";

export default function App() {
  const [danhSach, setDanhSach] = useState(duLieuBanDau);
  const [hienForm, setHienForm] = useState(false);
  const [tuKhoa, setTuKhoa] = useState("");

  const themPhong = (duLieu) => {
    setDanhSach([...danhSach, { ...duLieu, id: Date.now() }]);
    setHienForm(false);
  };

  const ketQua = danhSach.filter(e =>
    e.tenPhong.toLowerCase().includes(tuKhoa.toLowerCase()) ||
    e.maPhong.toLowerCase().includes(tuKhoa.toLowerCase()) ||
    e.email.toLowerCase().includes(tuKhoa.toLowerCase())
  );

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand">Lab Manager</span>

        <div className="d-flex">
          <input
            className="form-control me-2"
            placeholder="Search..."
            onChange={(e) => setTuKhoa(e.target.value)}
          />
        </div>
      </nav>

      <div className="container mt-4">
        <div className="d-flex justify-content-between mb-3">
          <h4>Computer Labs</h4>

          <button className="btn btn-primary" onClick={() => setHienForm(true)}>
            + Add new
          </button>
        </div>

        <DanhSachPhong data={ketQua} />
      </div>

      {hienForm && (
        <FormPhong
          onClose={() => setHienForm(false)}
          onSave={themPhong}
        />
      )}
    </div>
  );
}

