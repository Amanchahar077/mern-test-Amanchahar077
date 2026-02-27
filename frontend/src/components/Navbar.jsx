import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 20px",
      background: "#eee"
    }}>
      <h3>Task Manager</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Navbar;