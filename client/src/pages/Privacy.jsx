function Privacy() {
  return (
    <div className="card" style={{ maxWidth: "900px", margin: "40px auto" }}>
      <h2>Privacy Policy</h2>
      <p style={{ marginTop: "15px" }}>
        Your privacy is important to us. TaskFlow stores only essential user data
        required to provide its services.
      </p>
      <p style={{ marginTop: "10px" }}>
        We do not share your personal information with third parties. Authentication
        is secured using JWT tokens.
      </p>
    </div>
  );
}
export default Privacy;
