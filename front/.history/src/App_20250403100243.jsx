import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Connexion from './Routes/connexion.jsx'
import Dashboard from './Routes/dashboard.jsx'
import Inscription from './Routes/inscription.jsx'

function App() {
  return (
    <>  
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-900">
         
          <Routes>
            <Route path="/" element={<Connexion />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inscription" element={<Inscription />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
