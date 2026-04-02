import { useState } from "react";

export default function FormPhong({ onClose, onSave }) {
  const [form, setForm] = useState({
    tenPhong: "",
    maPhong: "",
    soMay: "",
    quanLy: "",
    email: ""
  });

  const [loi, setLoi] = useState({});

  const thayDoi = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const kiemTra = () => {
    const err = {};

    // Room Name
    if (!form.tenPhong.trim()) {
      err.tenPhong = "Room name is required";
    }

    // Room Code: PM + 3 digits
    if (!form.maPhong.trim()) {
      err.maPhong = "Room code is required";
    } else if (!/^PM\d{3}$/.test(form.maPhong)) {
      err.maPhong = "Room code must be in format PMxxx (e.g. PM201)";
    }

    // Computers: 1 -> 60
    if (!form.soMay) {
      err.soMay = "Computers is required";
    } else if (Number(form.soMay) < 1 || Number(form.soMay) > 60) {
      err.soMay = "Computers must be between 1 and 60";
    }

    // Manager
    if (!form.quanLy.trim()) {
      err.quanLy = "Manager is required";
    }

    // Email format
    if (!form.email.trim()) {
      err.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      err.email = "Invalid email format";
    }

    return err;
  };

  const submit = () => {
    const err = kiemTra();
    if (Object.keys(err).length > 0) {
      setLoi(err);
      return;
    }
    onSave(form);
  };

  return (
    <div className="modal show d-block">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5>Add Computer Lab</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="row g-3">

              <div className="col-6">
                <input
                  className={`form-control ${loi.tenPhong && "is-invalid"}`}
                  placeholder="Room Name"
                  name="tenPhong"
                  value={form.tenPhong}
                  onChange={thayDoi}
                />
                <div className="invalid-feedback">{loi.tenPhong}</div>
              </div>

              <div className="col-6">
                <input
                  className={`form-control ${loi.maPhong && "is-invalid"}`}
                  placeholder="Room Code (PMxxx)"
                  name="maPhong"
                  value={form.maPhong}
                  onChange={thayDoi}
                />
                <div className="invalid-feedback">{loi.maPhong}</div>
              </div>

              <div className="col-6">
                <input
                  type="number"
                  className={`form-control ${loi.soMay && "is-invalid"}`}
                  placeholder="Computers (1-60)"
                  name="soMay"
                  value={form.soMay}
                  onChange={thayDoi}
                />
                <div className="invalid-feedback">{loi.soMay}</div>
              </div>

              <div className="col-6">
                <input
                  className={`form-control ${loi.quanLy && "is-invalid"}`}
                  placeholder="Manager"
                  name="quanLy"
                  value={form.quanLy}
                  onChange={thayDoi}
                />
                <div className="invalid-feedback">{loi.quanLy}</div>
              </div>

              <div className="col-12">
                <input
                  className={`form-control ${loi.email && "is-invalid"}`}
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  onChange={thayDoi}
                />
                <div className="invalid-feedback">{loi.email}</div>
              </div>

            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-success" onClick={submit}>Save</button>
          </div>

        </div>
      </div>
    </div>
  );
}

