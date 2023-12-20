import './App.css'
import { Routes, Route } from 'react-router-dom'; // Asumiendo que estás utilizando react-router-dom
import Home from './components/home';
import Turnos from './components/turnos';

function App() {


  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/turnos" element={<Turnos/>} />
      </Routes>
    </div>
  )
}

export default App

