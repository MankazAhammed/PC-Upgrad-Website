import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jsPDF } from "jspdf";
import data from "../../data/components.json";
import "../../styles/Theme.css";
import "./CompatibilityCheck.css";

const CompatibilityCheck = () => {
  const [cpu, setCpu] = useState("");
  const [motherboard, setMotherboard] = useState("");
  const [gpu, setGpu] = useState("");
  const [selectedCase, setSelectedCase] = useState("");
  const [psu, setPsu] = useState("");
  const [ram, setRam] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [result, setResult] = useState([]);
  const [aiHint, setAiHint] = useState("");

  // Load from localStorage
  useEffect(() => {
    const savedBuild = JSON.parse(localStorage.getItem("savedBuild"));
    if (savedBuild) {
      setCpu(savedBuild.cpu || "");
      setMotherboard(savedBuild.motherboard || "");
      setGpu(savedBuild.gpu || "");
      setSelectedCase(savedBuild.selectedCase || "");
      setRam(savedBuild.ram || "");
      setPsu(savedBuild.psu || "");
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      "savedBuild",
      JSON.stringify({ cpu, motherboard, gpu, selectedCase, ram, psu })
    );
  }, [cpu, motherboard, gpu, selectedCase, ram, psu]);

  const selectedCpu = data.cpus.find((c) => c.name === cpu);
  const selectedMotherboard = data.motherboards.find(
    (m) => m.name === motherboard
  );
  const gpuObj = data.gpus.find((g) => g.name === gpu);
  const caseObj = data.cases.find((c) => c.name === selectedCase);
  const selectedRam = data.ram.find((r) => r.name === ram);
  const selectedPsu = data.psus.find((p) => p.name === psu);

  const filteredMotherboards = cpu
    ? data.motherboards.filter((m) => m.socket === selectedCpu?.socket)
    : data.motherboards;
  const filteredRAMs = motherboard
    ? data.ram.filter((r) => r.type === selectedMotherboard?.ram_type)
    : data.ram;
  const compatibleCases = gpu
    ? data.cases.filter((c) => gpuObj && gpuObj.length_mm <= c.gpu_clearance_mm)
    : [];

  const checkLiveCompatibility = {
    cpuMotherboard:
      selectedCpu && selectedMotherboard
        ? selectedCpu.socket === selectedMotherboard.socket
        : null,
    ramMotherboard:
      selectedRam && selectedMotherboard
        ? selectedRam.type === selectedMotherboard.ram_type
        : null,
    gpuCase:
      gpuObj && caseObj ? gpuObj.length_mm <= caseObj.gpu_clearance_mm : null,
    bottleneck:
      selectedCpu && gpuObj
        ? gpuObj.power > 250 &&
          (selectedCpu.name.includes("i5") ||
            selectedCpu.name.includes("Ryzen 5") ||
            selectedCpu.name.includes("i3") ||
            selectedCpu.name.includes("Ryzen 3"))
        : false,
  };

  const handleCheck = (e) => {
    e.preventDefault();
    const messages = [];
    let tip = "";

    if (selectedCpu && selectedMotherboard) {
      messages.push(
        selectedCpu.socket === selectedMotherboard.socket
          ? "✅ CPU and Motherboard sockets are compatible."
          : `❌ CPU (${selectedCpu.socket}) and Motherboard (${selectedMotherboard.socket}) are incompatible.`
      );
    }

    if (gpuObj && caseObj) {
      messages.push(
        gpuObj.length_mm <= caseObj.gpu_clearance_mm
          ? "✅ GPU fits in the selected case."
          : `❌ GPU (${gpuObj.length_mm}mm) is too long for the case (${caseObj.gpu_clearance_mm}mm).`
      );
    }

    if (selectedMotherboard && selectedRam) {
      messages.push(
        selectedRam.type === selectedMotherboard.ram_type
          ? "✅ RAM is compatible with the motherboard."
          : `❌ RAM type (${selectedRam.type}) is incompatible with motherboard (${selectedMotherboard.ram_type}).`
      );
    }

    if (checkLiveCompatibility.bottleneck) {
      messages.push(
        "⚠️ Potential bottleneck: Powerful GPU may be limited by selected CPU."
      );
      tip =
        "💡 Tip: Consider upgrading to a higher-end CPU to fully utilize your GPU’s potential.";
    } else if (
      gpuObj?.power &&
      selectedPsu?.wattage &&
      gpuObj.power + 125 > selectedPsu.wattage - 100
    ) {
      tip =
        "💡 Tip: Your PSU may be close to capacity. Consider a higher wattage for stability.";
    }

    setResult(messages);
    setAiHint(tip);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("PC Build Summary", 20, 20);

    let y = 30;
    Object.entries({
      CPU: cpu,
      Motherboard: motherboard,
      GPU: gpu,
      RAM: ram,
      Case: selectedCase,
      PSU: psu,
    }).forEach(([key, value]) => {
      doc.text(`${key}: ${value || "Not selected"}`, 20, y);
      y += 10;
    });

    y += 10;
    doc.text("Compatibility Results:", 20, y);
    y += 10;
    result.forEach((line) => {
      doc.text(line, 20, y);
      y += 10;
    });

    if (aiHint) {
      y += 10;
      doc.text("Build Tip:", 20, y);
      y += 10;
      doc.text(doc.splitTextToSize(aiHint, 170), 20, y);
    }

    doc.save("PC_Build_Summary.pdf");
  };

  const totalPower = (gpuObj?.power || 0) + (selectedCpu ? 125 : 0);
  const psuWattage = selectedPsu?.wattage || 0;
  const powerUsage = Math.min(100, Math.round((totalPower / psuWattage) * 100));

  const selectedParts = {
    CPU: cpu,
    Motherboard: motherboard,
    RAM: ram,
    GPU: gpu,
    Case: selectedCase,
    PSU: psu,
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <div className="top-bar">
        <button onClick={() => setDarkMode(!darkMode)}>
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      <div className="compatibility-check">
        <div className="form-section">
          <h1>Component Compatibility Checker</h1>
          <form onSubmit={handleCheck}>
            <div className="form-group">
              <label>CPU</label>
              <select
                value={cpu}
                onChange={(e) => {
                  setCpu(e.target.value);
                  setMotherboard("");
                  setRam("");
                }}
                required
              >
                <option value="">-- Select CPU --</option>
                {data.cpus.map((c) => (
                  <option
                    key={c.name}
                    value={c.name}
                    title={`Socket: ${c.socket}`}
                  >
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>
                Motherboard{" "}
                {checkLiveCompatibility.cpuMotherboard !== null && (
                  <span
                    className={
                      checkLiveCompatibility.cpuMotherboard
                        ? "success"
                        : "error"
                    }
                  >
                    {checkLiveCompatibility.cpuMotherboard ? "✅" : "❌"}
                  </span>
                )}
              </label>
              <select
                value={motherboard}
                onChange={(e) => {
                  setMotherboard(e.target.value);
                  setRam("");
                }}
                required
                disabled={!cpu}
              >
                <option value="">-- Select Motherboard --</option>
                {filteredMotherboards.map((m) => (
                  <option
                    key={m.name}
                    value={m.name}
                    title={`Socket: ${m.socket}, RAM: ${m.ram_type}`}
                  >
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>
                RAM{" "}
                {checkLiveCompatibility.ramMotherboard !== null && (
                  <span
                    className={
                      checkLiveCompatibility.ramMotherboard
                        ? "success"
                        : "error"
                    }
                  >
                    {checkLiveCompatibility.ramMotherboard ? "✅" : "❌"}
                  </span>
                )}
              </label>
              <select
                value={ram}
                onChange={(e) => setRam(e.target.value)}
                required
                disabled={!motherboard}
              >
                <option value="">-- Select RAM --</option>
                {filteredRAMs.map((r) => (
                  <option key={r.name} value={r.name} title={`Type: ${r.type}`}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>GPU</label>
              <select
                value={gpu}
                onChange={(e) => {
                  setGpu(e.target.value);
                  setSelectedCase("");
                }}
                required
              >
                <option value="">-- Select GPU --</option>
                {data.gpus.map((g) => (
                  <option
                    key={g.name}
                    value={g.name}
                    title={`Length: ${g.length_mm}mm, Power: ${g.power}W`}
                  >
                    {g.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>
                Case{" "}
                {checkLiveCompatibility.gpuCase !== null && (
                  <span
                    className={
                      checkLiveCompatibility.gpuCase ? "success" : "error"
                    }
                  >
                    {checkLiveCompatibility.gpuCase ? "✅" : "❌"}
                  </span>
                )}
              </label>
              <select
                value={selectedCase}
                onChange={(e) => setSelectedCase(e.target.value)}
                disabled={!gpu}
                required
              >
                <option value="">-- Select Case --</option>
                {compatibleCases.map((c) => (
                  <option
                    key={c.name}
                    value={c.name}
                    title={`Clearance: ${c.gpu_clearance_mm}mm`}
                  >
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="cta-button">
              Check Compatibility
            </button>
          </form>

          <AnimatePresence>
            {result.length > 0 && (
              <motion.div
                className="result-box"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3>🔍 Compatibility Results</h3>
                <ul>
                  {result.map((msg, idx) => (
                    <motion.li
                      key={idx}
                      className={
                        msg.includes("✅")
                          ? "success"
                          : msg.includes("❌")
                          ? "error"
                          : "warning"
                      }
                    >
                      {msg}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {aiHint && (
            <motion.div
              className="ai-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p>{aiHint}</p>
            </motion.div>
          )}

          <button
            onClick={handleDownloadPDF}
            className="cta-button"
            style={{ marginTop: "20px" }}
          >
            Export to PDF
          </button>
        </div>

        <motion.div
          className="summary-panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3>🧰 Your Build Summary</h3>
          <ul>
            {Object.entries(selectedParts).map(([label, value]) => (
              <li key={label}>
                <strong>{label}:</strong> {value || "Not selected"}
              </li>
            ))}
          </ul>
          {psuWattage > 0 && (
            <div style={{ marginTop: "15px" }}>
              <strong>⚡ PSU Usage:</strong>
              <div
                style={{
                  background: "#ddd",
                  height: "12px",
                  borderRadius: "6px",
                  overflow: "hidden",
                  marginTop: "5px",
                }}
              >
                <div
                  style={{
                    width: `${powerUsage}%`,
                    height: "100%",
                    backgroundColor:
                      powerUsage > 90
                        ? "red"
                        : powerUsage > 70
                        ? "orange"
                        : "green",
                  }}
                ></div>
              </div>
              <small>
                {totalPower}W / {psuWattage}W used
              </small>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CompatibilityCheck;
