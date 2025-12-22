export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>🎓 NEDUET Result Notification System</h1>

      <p>
        Register with your email, department, and year.  
        You will be notified automatically when your result is uploaded.
      </p>

      <a
        href="/register"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 16px",
          background: "#000",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "6px"
        }}
      >
        Register for Notifications
      </a>
    </main>
  );
}
