import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Views/Home/Home";
import Create from "./Views/Create/Create";
import Landing from "./Views/Landing/Landing";
import Details from "./Views/Details/Details";

function App() {
  function NavbarController() {
    const location = useLocation();
    const isLandingRoute = location.pathname === "/";
    
    if (isLandingRoute) {
      return null;
    }
  
    return <Navbar />;
  }
  return (
    <div className="App">
      <BrowserRouter>
      <NavbarController />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
