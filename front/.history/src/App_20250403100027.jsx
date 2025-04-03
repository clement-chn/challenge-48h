

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Connexion from '../src/Routes/connexion'
import Dashboard from '../src/Routes/dashboard'
import Inscription from '../src/Routes/inscription'

function App() {


  return (
    <>  
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-900">
          {/* Barre de navigation */}
          {/* Définition des Routes */}
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
