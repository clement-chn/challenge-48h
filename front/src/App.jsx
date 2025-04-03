import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Connexion from './Routes/connexion.jsx'
import Dashboard from './Routes/dashboard.jsx'
import Inscription from './Routes/Inscription.jsx'
import { Box } from '@mui/material'
import { Button } from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-900">
          <Routes>
            <Route path="/" element={<Connexion />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
