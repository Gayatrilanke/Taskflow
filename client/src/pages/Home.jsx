import { Link } from "react-router-dom";

function Home() {
  return (
    <div>

      {/* HERO */}
      <section
        style={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "40px",
          background: "linear-gradient(to right, #0f172a, #1e293b)",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "52px", marginBottom: "20px" }}>
          Organize your work with <span style={{ color: "#4f46e5" }}>TaskFlow</span>
        </h1>

        <p style={{ maxWidth: "600px", fontSize: "18px", opacity: 0.8 }}>
          Plan projects, manage tasks, and stay productive — all in one simple dashboard.
        </p>

        <div style={{ marginTop: "30px" }}>
          <Link to="/register">
            <button style={primaryBtn}>Get Started</button>
          </Link>

          <Link to="/login">
            <button style={secondaryBtn}>Login</button>
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section
        style={{
          padding: "80px 20px",
          background: "#0f172a",
          color: "white",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "32px", marginBottom: "50px" }}>
          Why Use TaskFlow?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "30px",
            maxWidth: "1000px",
            margin: "auto",
          }}
        >
          <div className="card">
            <h3>📁 Project Management</h3>
            <p>Create and manage multiple projects easily.</p>
          </div>

          <div className="card">
            <h3>✅ Task Tracking</h3>
            <p>Track daily work and mark tasks completed.</p>
          </div>

          <div className="card">
            <h3>📊 Productivity</h3>
            <p>Visualize your workflow and progress clearly.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

const primaryBtn = {
  padding: "12px 25px",
  marginRight: "15px",
  background: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};

const secondaryBtn = {
  padding: "12px 25px",
  background: "white",
  color: "#111827",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Home;
