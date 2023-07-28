import Home from "../src/components/Home";
import Login from "../src/components/Login";
import Register from "../src/components/Register";
import Favorite from "../src/components/Favorite";
import AddTab from "../src/components/AddTab";
import Archive from "../src/components/ArchiveSong";
import Profile from "../src/components/Profile";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/addtab" element={<AddTab />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
