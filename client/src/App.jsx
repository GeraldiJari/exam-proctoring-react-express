import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TestPage from './pages/TestPage'
import ExamPage from './pages/ExamPage'
import AdminDashboard from './pages/AdminPage'
import './App.css'


function App() {
  return (
    <>
    <Router>
      <Routes>
        {/* <ExamPage/> */}
        <Route path="/" element={<ExamPage />} />

        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>


    </>
  )
}

export default App
