import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 50px",
        background: "#0f172a",
        borderBottom: "1px solid #1e293b",
      }}
    >
      <h2 style={{ color: "#4f46e5" }}>TaskFlow</h2>

      <div style={{ display: "flex", gap: "25px" }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/register" style={linkStyle}>Register</Link>
      </div>
    </nav>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#e5e7eb",
  fontWeight: "500",
};

export default Navbar;
