import React from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Join from "./components/Join";
import Navbar from "./components/Navbar";
import Host from "./components/Host";
import Status from "./components/Status";
import Vote from "./components/Vote";
import "@fontsource/praise";
import Lobby from "./components/Lobby";
import PlayerById from "./components/PlayerById";
import Insider from "./components/Insider";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Insider />} />
        <Route path="/Host" element={<Host />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Vote" element={<Vote />} />
        <Route path="/Lobby" element={<Lobby />} />
        <Route path="/Lobby/:username" element={<Lobby />} />
        <Route path="/Status" element={<Status />} />
        <Route path="/PlayerById/:username" element={<PlayerById />} />
        <Route path="/Vote/:username" element={<Vote />} />
      </Routes>
    </div>
  );
}

export default App;
