import React, { useState } from "react";
import { jsPDF } from "jspdf";
import data from "../../data/components.json";
import { motion, AnimatePresence } from "framer-motion";
import "../../pages/CompatibilityCheck/CompatibilityCheck.css";
import "../../pages/MockTool/MockTool.css";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faExclamationCircle,
  faLightbulb,
  faMicrochip,
  faMemory,
  faVideo,
  faBolt,
  faHdd,
  faFan,
  faBoxOpen,
  faWrench,
  faSearch,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

const FinalCompatibilityGuide = () => {
  const [cpu, setCpu] = useState("");
  const [motherboard, setMotherboard] = useState("");
  const [gpu, setGpu] = useState("");
  const [ram, setRam] = useState("");
  const [psu, setPsu] = useState("");
  const [storage, setStorage] = useState("");
  const [cooler, setCooler] = useState("");
  const [pcCase, setPcCase] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [results, setResults] = useState([]);
  const [aiHint, setAiHint] = useState("");

  const selectedCpu = data.cpus.find((c) => c.name === cpu);
  const selectedMotherboard = data.motherboards.find((m) => m.name === motherboard);
  const selectedRam = data.ram.find((r) => r.name === ram);
  const selectedGpu = data.gpus.find((g) => g.name === gpu);
  const selectedPsu = data.psus.find((p) => p.name === psu);
  const selectedCase = data.cases.find((c) => c.name === pcCase);

  const filteredMotherboards = cpu
    ? data.motherboards.filter((m) => m.socket === selectedCpu?.socket)
    : data.motherboards;

  const filteredRAMs = motherboard
    ? data.ram.filter((r) => r.type === selectedMotherboard?.ram_type)
    : data.ram;

  const compatibleCases = gpu
    ? data.cases.filter(
        (c) => selectedGpu && selectedGpu.length_mm <= c.gpu_clearance_mm
      )
    : data.cases;

  const checkCompatibility = () => {
    const messages = [];
    let tip = "";

    if (selectedCpu && selectedMotherboard) {
      if (selectedCpu.socket === selectedMotherboard.socket) {
        messages.push({ level: "success", text: "CPU and motherboard sockets match." });
      } else {
        messages.push({
          level: "error",
          text: `CPU (${selectedCpu.socket}) is not compatible with motherboard (${selectedMotherboard.socket}).`,
        });
      }
    }

    if (selectedRam && selectedMotherboard) {
      if (selectedRam.type === selectedMotherboard.ram_type) {
        messages.push({ level: "success", text: "RAM type is supported by the motherboard." });
      } else {
        messages.push({
          level: "error",
          text: `RAM type (${selectedRam.type}) is not supported by motherboard (${selectedMotherboard.ram_type}).`,
        });
      }
    }

    if (selectedGpu && selectedCase) {
      if (selectedGpu.length_mm <= selectedCase.gpu_clearance_mm) {
        messages.push({ level: "success", text: "GPU will fit in the selected case." });
      } else {
        messages.push({
          level: "error",
          text: `GPU length ${selectedGpu.length_mm}mm exceeds case clearance ${selectedCase.gpu_clearance_mm}mm.`,
        });
      }
    }

    if (selectedGpu && selectedCpu && selectedPsu) {
      const totalPower = selectedGpu.power + 125;
      if (selectedPsu.wattage >= totalPower + 150) {
        messages.push({ level: "success", text: "PSU wattage is sufficient for GPU + CPU." });
      } else {
        messages.push({
          level: "error",
          text: `PSU wattage (${selectedPsu.wattage}W) may be insufficient for GPU (${selectedGpu.power}W) + CPU (125W).`,
        });
      }
    }

    if (
      selectedGpu?.power > 250 &&
      ["i5", "i3", "Ryzen 5", "Ryzen 3"].some((frag) => selectedCpu?.name.includes(frag))
    ) {
      tip = "Consider upgrading to a higher-end CPU to avoid potential bottlenecks with your powerful GPU.";
    }

    setResults(messages);
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
      PSU: psu,
      Storage: storage,
      Cooler: cooler,
      Case: pcCase,
    }).forEach(([key, value]) => {
      doc.text(`${key}: ${value || "Not selected"}`, 20, y);
      y += 10;
    });

    y += 10;
    doc.text("Compatibility Results:", 20, y);
    y += 10;
    results.forEach((line) => {
      const tag = line.level === "success" ? "[OK]" : line.level === "error" ? "[ERROR]" : "[NOTE]";
      doc.text(`${tag} ${line.text}`, 20, y);
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

  const totalPower = (selectedGpu?.power || 0) + (selectedCpu ? 125 : 0);
  const psuWattage = selectedPsu?.wattage || 0;
  const powerUsage = psuWattage ? Math.min(100, Math.round((totalPower / psuWattage) * 100)) : 0;

  const formFields = [
    { label: "CPU", value: cpu, set: setCpu, options: data.cpus },
    { label: "Motherboard", value: motherboard, set: setMotherboard, options: filteredMotherboards, disabled: !cpu },
    { label: "RAM", value: ram, set: setRam, options: filteredRAMs, disabled: !motherboard },
    { label: "GPU", value: gpu, set: setGpu, options: data.gpus },
    { label: "Case", value: pcCase, set: setPcCase, options: compatibleCases, disabled: !gpu },
    { label: "PSU", value: psu, set: setPsu, options: data.psus },
    { label: "Storage", value: storage, set: setStorage, options: data.storage },
    { label: "Cooler", value: cooler, set: setCooler, options: data.coolers },
  ];

  const handleSaveBuild = async () => {
    const build = { cpu, motherboard, gpu, ram, psu, storage, cooler, pcCase };

    try {
      const res = await fetch("http://localhost:5000/api/builds/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(build),
      });

      await res.json();
      alert("Build saved successfully!");
    } catch (err) {
      alert("Failed to save build.");
      console.error(err);
    }
  };

  const summaryIcons = {
    CPU: faMicrochip,
    Motherboard: faMemory,
    GPU: faVideo,
    RAM: faMemory,
    PSU: faBolt,
    Storage: faHdd,
    Cooler: faFan,
    Case: faBoxOpen,
  };

  const levelToIcon = (level) =>
    level === "success" ? faCheckCircle : level === "error" ? faTimesCircle : faExclamationCircle;

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <div className="top-bar">
        <button onClick={() => setDarkMode(!darkMode)}>
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      <div className="compatibility-check">
        <div className="form-section">
          <h1>
            <FontAwesomeIcon icon={faWrench} style={{ marginRight: 8 }} />
            Final PC Compatibility Guide
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              checkCompatibility();
              handleSaveBuild();
            }}
          >
            {formFields.map(({ label, value, set, options, disabled = false }) => (
              <div className="form-group" key={label}>
                <label>{label}</label>
                <select
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  disabled={disabled}
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
            <button type="submit" className="cta-button">
              Check Compatibility
            </button>
          </form>

          <AnimatePresence>
            {results.length > 0 && (
              <motion.div
                className="result-box"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3>
                  <FontAwesomeIcon icon={faSearch} style={{ marginRight: 8 }} />
                  Compatibility Results
                </h3>
                <ul>
                  {results.map((item, idx) => (
                    <li
                      key={idx}
                      className={
                        item.level === "success"
                          ? "success"
                          : item.level === "error"
                          ? "error"
                          : "warning"
                      }
                    >
                      <FontAwesomeIcon icon={levelToIcon(item.level)} style={{ marginRight: 8 }} />
                      {item.text}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {aiHint && (
            <motion.div className="ai-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p>
                <FontAwesomeIcon icon={faLightbulb} style={{ marginRight: 8 }} />
                {aiHint}
              </p>
            </motion.div>
          )}

          <button onClick={handleDownloadPDF} className="cta-button" style={{ marginTop: 20 }}>
            Export to PDF
          </button>
        </div>

        <motion.div className="summary-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3>
            <FontAwesomeIcon icon={faClipboardList} style={{ marginRight: 8 }} />
            Build Summary
          </h3>
          <ul>
            {Object.entries({
              CPU: cpu,
              Motherboard: motherboard,
              GPU: gpu,
              RAM: ram,
              PSU: psu,
              Storage: storage,
              Cooler: cooler,
              Case: pcCase,
            }).map(([label, value]) => (
              <li key={label}>
                <FontAwesomeIcon
                  icon={summaryIcons[label]}
                  style={{ marginRight: 8 }}
                />
                <strong>{label}:</strong> {value || "Not selected"}
              </li>
            ))}
          </ul>

          {psuWattage > 0 && (
            <div style={{ marginTop: 15 }}>
              <strong>
                <FontAwesomeIcon icon={faBolt} style={{ marginRight: 8 }} />
                PSU Usage:
              </strong>
              <div
                style={{
                  background: "#ddd",
                  height: 12,
                  borderRadius: 6,
                  overflow: "hidden",
                  marginTop: 5,
                }}
              >
                <div
                  style={{
                    width: `${powerUsage}%`,
                    height: "100%",
                    backgroundColor:
                      powerUsage > 90 ? "red" : powerUsage > 70 ? "orange" : "green",
                  }}
                />
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

export default FinalCompatibilityGuide;
