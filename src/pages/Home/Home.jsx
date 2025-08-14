import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import data from "../../data/components.json";
import "./Home.css";
import PopupModal from "../../components/PopupModal";

const toIndex = (arr) => Object.fromEntries(arr.map((i) => [i.name, i.price]));
const priceIndex = {
  cpu: toIndex(data.cpus),
  motherboard: toIndex(data.motherboards),
  gpu: toIndex(data.gpus),
  ram: toIndex(data.ram),
  psu: toIndex(data.psus),
  storage: toIndex(data.storage),
  cooler: toIndex(data.coolers),
  case: toIndex(data.cases),
};

const eur = (n) =>
  n
    .toLocaleString("en-IE", { style: "currency", currency: "EUR" })
    .replace("EUR", "")
    .trim();

const getPartPrice = (build, key) => {
  const backendPrice = build[`${key}_price`];
  if (typeof backendPrice === "number") return backendPrice;

  const name = key === "case" ? build.case || build.pcCase : build[key];
  if (!name) return 0;

  const idx = priceIndex[key] || {};
  return typeof idx[name] === "number" ? idx[name] : 0;
};

const computeTotal = (build) =>
  getPartPrice(build, "cpu") +
  getPartPrice(build, "motherboard") +
  getPartPrice(build, "gpu") +
  getPartPrice(build, "ram") +
  getPartPrice(build, "psu") +
  getPartPrice(build, "storage") +
  getPartPrice(build, "cooler") +
  getPartPrice(build, "case");

const valueFor = (build, key) =>
  key === "case" ? build.case || build.pcCase || "—" : build[key] || "—";

const Home = () => {
  const [recentBuilds, setRecentBuilds] = useState([]);
  const { isAdmin, token } = useAuth();

  // ⬇️ modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
    type: "info",
  });

  const openModal = (title, message, type = "info") => {
    setModalData({ title, message, type });
    setModalOpen(true);
  };

  const fetchBuilds = () => {
    fetch("http://localhost:5000/api/builds/all")
      .then((res) => res.json())
      .then((data) => setRecentBuilds(data))
      .catch((err) => {
        console.error("Failed to fetch builds:", err);
        openModal(
          "Fetch Failed",
          "Could not load builds. Please try again.",
          "error"
        );
      });
  };

  useEffect(() => {
    fetchBuilds();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/builds/delete/${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Delete failed: ${res.status} ${txt}`);
      }

      const result = await res.json();
      if (result.success) {
        setRecentBuilds((prev) => prev.filter((b) => b._id !== id));
        openModal("Deleted", "Build was deleted successfully.", "success");
      } else {
        throw new Error(result.error || "Unknown error");
      }
    } catch (err) {
      console.error("Failed to delete build", err);
      openModal(
        "Delete Failed",
        "Delete failed. See console for details.",
        "error"
      );
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">Upgrade Smarter, Not Harder</h1>
          <p className="hero-sub">
            Plan your next PC build with confidence. Our intelligent web-based
            tool helps you choose compatible components with real-time
            validation.
          </p>
          <Link to="/final-guide" className="btn btn-primary hero-cta">
            Launch Compatibility Tool
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <h2 className="section-title">Core Features</h2>
        <div className="grid features-grid">
          <div className="card feature-card">
            <h3>Real-Time Compatibility</h3>
            <p>
              Prevent mismatched components and system failures with live
              validation of sockets, RAM types, PSU capacity and more.
            </p>
          </div>

          <div className="card feature-card">
            <h3>Interactive Build Simulator</h3>
            <p>
              Simulate your full PC build using real specs before buying
              anything.
            </p>
            <Link to="/final-guide" className="link-cta">
              Try It Now
            </Link>
          </div>

          <div className="card feature-card">
            <h3>CPU ↔ Motherboard Checker</h3>
            <p>Ensure your CPU and motherboard sockets match instantly.</p>
            <Link to="/final-guide" className="link-cta">
              Check Now
            </Link>
          </div>

          <div className="card feature-card">
            <h3>Saved Builds</h3>
            <p>
              View all your previously saved builds, export as PDF, or share
              with others.
            </p>
            <Link to="/dashboard" className="link-cta">
              View Saved Builds
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <h2 className="section-title">Recently Saved Builds</h2>

        {recentBuilds.length === 0 ? (
          <p className="muted center">No builds saved yet.</p>
        ) : (
          <div className="grid builds-grid">
            {recentBuilds.map((build) => {
              const totalPrice = computeTotal(build);

              return (
                <div key={build._id} className="card build-card">
                  <div className="build-header">
                    <h4 className="build-id">Build #{build._id.slice(-6)}</h4>
                    {isAdmin && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(build._id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>

                  <ul className="spec-list">
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
                        <span className="spec-key">{key.toUpperCase()}:</span>{" "}
                        <span className="spec-val">{valueFor(build, key)}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="price">
                    Estimated Price: <strong>{eur(totalPrice)}</strong>
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Popup Modal (replaces alert) */}
      <PopupModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalData.title}
        message={modalData.message}
        type={modalData.type} // "success" | "error" | "info"
      />
    </div>
  );
};

export default Home;
