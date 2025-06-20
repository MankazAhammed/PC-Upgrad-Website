import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About/About";
import Projects from "./pages/Projects";
import BrowseProperties from "./pages/BrowseProperties/BrowseProperties";
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/browse-properties" element={<BrowseProperties />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
