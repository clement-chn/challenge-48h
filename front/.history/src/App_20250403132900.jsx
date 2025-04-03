import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Connexion from './Routes/connexion.jsx'
import Dashboard from './Routes/dashboard.jsx'
import Inscription from './Routes/inscriptions.jsx'

function App() {
  return (
    <>  
      <Router>
       
        <div className="min-h-screen bg-blue text-gray-900">
          <Routes>
            <Route path="/" element={<Connexion />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
