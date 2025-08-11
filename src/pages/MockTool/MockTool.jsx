import React, { useState } from "react";
import data from "../../data/components.json";
import "./MockTool.css";

const MockTool = () => {
  const [formData, setFormData] = useState({
    cpu: "",
    motherboard: "",
    gpu: "",
    ram: "",
    psu: "",
    storage: "",
    case: "",
    cooler: "",
  });

  const [showSummary, setShowSummary] = useState(false);
  const [validationResults, setValidationResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedCpu = data.cpus.find((c) => c.name === formData.cpu);
    const selectedMotherboard = data.motherboards.find(
      (m) => m.name === formData.motherboard
    );
    const selectedRam = data.ram.find((r) => r.name === formData.ram);
    const selectedPsu = data.psus.find((p) => p.name === formData.psu);
    const selectedGpu = data.gpus.find((g) => g.name === formData.gpu);
    const selectedCase = data.cases.find((c) => c.name === formData.case);

    const results = [];

    // CPU ↔ Motherboard socket compatibility
    if (selectedCpu && selectedMotherboard) {
      if (selectedCpu.socket === selectedMotherboard.socket) {
        results.push("✅ Processor and Motherboard sockets match.");
      } else {
        results.push(
          `❌ Processor (${selectedCpu.socket}) is not compatible with Motherboard (${selectedMotherboard.socket}).`
        );
      }
    }

    // RAM ↔ Motherboard RAM type
    if (selectedRam && selectedMotherboard) {
      if (selectedRam.type === selectedMotherboard.ram_type) {
        results.push("✅ RAM type is supported by the motherboard.");
      } else {
        results.push(
          `❌ RAM type (${selectedRam.type}) is not supported by Motherboard (${selectedMotherboard.ram_type}).`
        );
      }
    }

    // PSU capacity
    if (selectedGpu && selectedCpu && selectedPsu) {
      const estimatedTotalPower = selectedGpu.power + 125; // 125W for CPU
      if (selectedPsu.wattage >= estimatedTotalPower + 150) {
        results.push("✅ PSU wattage is sufficient for GPU + Processor.");
      } else {
        results.push(
          `❌ PSU wattage (${selectedPsu.wattage}W) may be insufficient for GPU (${selectedGpu.power}W) + CPU (125W).`
        );
      }
    }

    // GPU size vs Case clearance
    if (selectedGpu && selectedCase) {
      if (selectedGpu.length_mm <= selectedCase.gpu_clearance_mm) {
        results.push("✅ GPU will fit in the selected case.");
      } else {
        results.push(
          `❌ GPU (${selectedGpu.length_mm}mm) is too long for Case (${selectedCase.gpu_clearance_mm}mm).`
        );
      }
    }

    setValidationResults(results);
    setShowSummary(true);
  };

  const componentFields = [
    { label: "Processor", name: "cpu", options: data.cpus },
    { label: "Motherboard", name: "motherboard", options: data.motherboards },
    { label: "GPU", name: "gpu", options: data.gpus },
    { label: "RAM", name: "ram", options: data.ram },
    { label: "PSU", name: "psu", options: data.psus },
    { label: "Storage", name: "storage", options: data.storage },
    { label: "Case", name: "case", options: data.cases },
    { label: "Cooler", name: "cooler", options: data.coolers },
  ];

  return (
    <div
      className="mock-tool"
      style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}
    >
      <h1 style={{ marginBottom: "20px" }}>Mock PC Build Tool</h1>
      <p style={{ marginBottom: "30px" }}>
        Select your preferred components to simulate a full PC build and
        validate compatibility.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        {componentFields.map(({ label, name, options }) => (
          <div key={name}>
            <label className="form-label">{label}</label>
            <select
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">-- Select {label} --</option>
              {options.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button
          type="submit"
          className="cta-button"
          style={{ width: "fit-content" }}
        >
          Build Summary
        </button>
      </form>

      {showSummary && (
        <div style={{ marginTop: "30px" }}>
          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              background: "#f4f4f4",
            }}
          >
            <h3>Your Selected Build:</h3>
            <ul style={{ lineHeight: "1.8" }}>
              {Object.entries(formData).map(([key, value]) => (
                <li key={key}>
                  <strong>{key.toUpperCase()}:</strong>{" "}
                  {value || "Not selected"}
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#fffbea",
            }}
          >
            <h3>🔍 Compatibility Check:</h3>
            <ul style={{ paddingLeft: "20px" }}>
              {validationResults.map((msg, idx) => (
                <li key={idx} style={{ marginBottom: "10px" }}>
                  {msg}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockTool;
