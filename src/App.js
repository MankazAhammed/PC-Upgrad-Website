import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import UpgradeGuide from "./pages/UpgradeGuide";
import CompatibilityCheck from "./pages/CompatibilityCheck";
import MockTool from "./pages/MockTool";
import Navbar from "./components/Navbar";
import FinalCompatibilityGuide from "./components/FinalCompatibilityGuide";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/upgrade-guide" element={<UpgradeGuide />} />
            <Route path="/final-guide" element={<FinalCompatibilityGuide />} />
            <Route
              path="/compatibility-check"
              element={<CompatibilityCheck />}
            />
            <Route path="/mock-tool" element={<MockTool />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
