import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Articles from "./components/Articles";

function Partner() {
  return <h1>Become a Partner Page</h1>;
}

function Deliver() {
  return <h1>Deliver for Toters Page</h1>;
}

function Careers() {
  return <h1>Careers Page</h1>;
}

function Privacy() {
  return <h1>Privacy Page</h1>;
}

function Media() {
  return <h1>Media Updates Page</h1>;
}

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/partner" element={<Partner />} />
        <Route path="/deliver" element={<Deliver />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/media" element={<Media />} />
        <Route path="/signup" element={<Privacy />} />
      </Routes>
    </div>
  );
}

export default App;
