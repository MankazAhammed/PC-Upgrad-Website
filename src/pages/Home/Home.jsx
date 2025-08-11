import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [recentBuilds, setRecentBuilds] = useState([]);

  const fetchBuilds = () => {
    fetch("http://localhost:5000/api/builds/all")
      .then((res) => res.json())
      .then((data) => setRecentBuilds(data.slice(0, 3)))
      .catch((err) => console.error("Failed to fetch builds:", err));
  };

  useEffect(() => {
    fetchBuilds();
  }, []);

const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/builds/delete/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (result.success) {
      alert("Deleted successfully!");
      // Optionally refetch builds after delete
    }
  } catch (err) {
    console.error("Failed to delete build", err);
  }
};

  return (
    <div className="home" style={{ padding: "20px" }}>
      {/* Hero Section */}
      <section
        className="hero"
        style={{ textAlign: "center", marginBottom: "40px" }}
      >
        <h1>Upgrade Smarter, Not Harder</h1>
        <p style={{ maxWidth: "600px", margin: "10px auto" }}>
          Plan your next PC build with confidence. Our intelligent web-based
          tool helps you choose compatible components with real-time validation.
        </p>
        <Link
          to="/final-guide"
          className="cta-button"
          style={{ marginTop: "20px" }}
        >
          Launch Compatibility Tool
        </Link>
      </section>

      {/* Features Section */}
      <section className="features" style={{ marginTop: "60px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Core Features
        </h2>
        <div className="features-grid">
          <div className="card">
            <h3>🧠 Real-Time Compatibility</h3>
            <p>
              Prevent mismatched components and system failures with live
              validation of sockets, RAM types, PSU capacity and more.
            </p>
          </div>

          <div className="card">
            <h3>🛠️ Interactive Build Simulator</h3>
            <p>
              Simulate your full PC build using real specs before buying
              anything.
            </p>
            <Link to="/final-guide" className="cta-link">
              Try It Now →
            </Link>
          </div>

          <div className="card">
            <h3>⚙️ CPU ↔ Motherboard Checker</h3>
            <p>Ensure your CPU and motherboard sockets match instantly.</p>
            <Link to="/final-guide" className="cta-link">
              Check Now →
            </Link>
          </div>

          <div className="card">
            <h3>📦 Saved Builds</h3>
            <p>
              View all your previously saved builds, export as PDF, or share
              with others.
            </p>
            <Link to="/dashboard" className="cta-link">
              View Saved Builds →
            </Link>
          </div>
        </div>
      </section>

      {/* Recently Saved Builds Section */}
      <section className="recent-builds" style={{ marginTop: "60px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          🧰 Recently Saved Builds
        </h2>

        {recentBuilds.length === 0 ? (
          <p style={{ textAlign: "center" }}>No builds saved yet.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "20px",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            }}
          >
            {recentBuilds.map((build) => {
              const componentPrices = [
                build.cpu_price || 0,
                build.motherboard_price || 0,
                build.gpu_price || 0,
                build.ram_price || 0,
                build.psu_price || 0,
                build.storage_price || 0,
                build.cooler_price || 0,
                build.case_price || 0,
              ];
              const totalPrice = componentPrices.reduce((sum, p) => sum + p, 0);

              return (
                <div key={build._id} className="card">
                  <h4>🖥️ Build ID: {build._id.slice(-6)}</h4>
                  <ul style={{ paddingLeft: "20px" }}>
                    {[
                      "cpu",
                      "motherboard",
                      "gpu",
                      "ram",
                      "psu",
                      "storage",
                      "cooler",
                      "case",
                    ].map((key) => (
                      <li key={key}>
                        <strong>{key.toUpperCase()}:</strong>{" "}
                        {build[key] || "—"}
                      </li>
                    ))}
                  </ul>
                  <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                    💰 Estimated Price: €{" "}
                    {totalPrice
                      .toLocaleString("en-IE", {
                        style: "currency",
                        currency: "EUR",
                      })
                      .replace("EUR", "")
                      .trim()}
                  </p>
                  <button
                    onClick={() => handleDelete(build._id)}
                    style={{
                      marginTop: "10px",
                      padding: "6px 12px",
                      background: "#e74c3c",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
