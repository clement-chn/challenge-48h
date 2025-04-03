import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Connexion from './Routes/connexion.jsx'
import Dashboard from './Routes/dashboard.jsx'
import Inscription from './Routes/inscriptions.jsx'

function App() {
  return (
    <>  
      <Router>
        <div style={{ backgroundColor: '#1CABE2', minHeight: '100vh' }}> {/* Changement de fond */}
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
