import React from 'react'
import RealTimeTrack from './pages/RealTimeTrack'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div>
    <Router>
    <Routes>
      {/* Route for the main content */}
     
      <Route path="/Home" element={<RealTimeTrack />} />
   
    </Routes>
  </Router>
    </div>
  )
}
