import React, { useEffect, useState } from "react";
import "./ClientDashboard.css";

const ClientDashboard = () => {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:5000/api/builds/all");
      const data = await res.json();
      setBuilds(data);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="client-wrap">
      <div className="client-header">
        <div>
          <h2 className="client-title">Your Saved Builds</h2>
          <p className="client-sub">
            All builds you’ve saved will appear here.
          </p>
        </div>
        <span className="pill">Total: {builds.length}</span>
      </div>

      {loading ? (
        <div className="cards-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div className="card skeleton" key={i}>
              <div className="sk-line sk-w-70" />
              <div className="sk-line sk-w-90" />
            </div>
          ))}
        </div>
      ) : builds.length === 0 ? (
        <div className="empty-state">
          <div className="empty-card">
            <h3>No builds yet</h3>
            <p>Start using the compatibility tool to save your first build.</p>
          </div>
        </div>
      ) : (
        <div className="cards-grid">
          {builds.map((b) => (
            <div key={b._id} className="card build-card">
              <strong className="build-id">Build #{b._id.slice(-6)}</strong>
              <div className="build-meta">
                {b.cpu || "—"} <span className="sep">|</span>{" "}
                {b.motherboard || "—"} <span className="sep">|</span>{" "}
                {b.gpu || "—"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
