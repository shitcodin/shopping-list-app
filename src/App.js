import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Overview from "./routes/Overview";
import Detail from "./routes/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;