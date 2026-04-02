export default function DanhSachPhong({ data }) {
  return (
    <table className="table table-bordered table-hover">
      <thead className="table-light">
        <tr>
          <th>Room Name</th>
          <th>Room Code</th>
          <th>Computers</th>
          <th>Manager</th>
          <th>Email</th>
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center">No data</td>
          </tr>
        ) : (
          data.map((item) => (
            <tr key={item.id}>
              <td>{item.tenPhong}</td>
              <td>{item.maPhong}</td>
              <td>{item.soMay}</td>
              <td>{item.quanLy}</td>
              <td>{item.email}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
