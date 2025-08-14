import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { token } = useAuth();
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/api/builds/all");
    const data = await res.json();
    setBuilds(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this build?")) return;
    const res = await fetch(`http://localhost:5000/api/builds/delete/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.success) setBuilds((prev) => prev.filter((b) => b._id !== id));
    else alert(data.error || "Delete failed");
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="admin-wrap">
      <div className="admin-header">
        <div>
          <h2 className="admin-title">Admin Dashboard</h2>
          <p className="admin-sub">Manage all saved builds.</p>
        </div>
        <div className="admin-meta">
          <span className="pill">Total: {builds.length}</span>
          <button
            className="btn btn-secondary"
            onClick={fetchAll}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="cards-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="card skeleton" key={i}>
              <div className="sk-line sk-w-60" />
              <div className="sk-line sk-w-90" />
              <div className="sk-line sk-w-50" />
              <div className="sk-btn" />
            </div>
          ))}
        </div>
      ) : builds.length === 0 ? (
        <div className="empty-state">
          <div className="empty-card">
            <h3>No builds yet</h3>
            <p>Saved builds will appear here as users create and store them.</p>
            <button className="btn btn-primary" onClick={fetchAll}>
              Check Again
            </button>
          </div>
        </div>
      ) : (
        <div className="cards-grid">
          {builds.map((b) => (
            <div key={b._id} className="card build-card">
              <div className="card-head">
                <strong className="build-id">Build #{b._id.slice(-6)}</strong>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(b._id)}
                >
                  Delete
                </button>
              </div>

              <div className="kv">
                <span className="k">CPU</span>
                <span className="v">{b.cpu || "—"}</span>
              </div>
              <div className="kv">
                <span className="k">Motherboard</span>
                <span className="v">{b.motherboard || "—"}</span>
              </div>
              <div className="kv">
                <span className="k">GPU</span>
                <span className="v">{b.gpu || "—"}</span>
              </div>
              <div className="kv">
                <span className="k">RAM</span>
                <span className="v">{b.ram || "—"}</span>
              </div>
              <div className="kv">
                <span className="k">PSU</span>
                <span className="v">{b.psu || "—"}</span>
              </div>
              <div className="kv">
                <span className="k">Storage</span>
                <span className="v">{b.storage || "—"}</span>
              </div>
              <div className="kv">
                <span className="k">Cooler</span>
                <span className="v">{b.cooler || "—"}</span>
              </div>
              <div className="kv">
                <span className="k">Case</span>
                <span className="v">{b.case || b.pcCase || "—"}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
