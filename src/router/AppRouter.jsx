import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Infrastructure from './pages/Infrastructure'
import Automation from './pages/Automation'
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="sobre-mi" element={<About />} />
          <Route path="proyectos" element={<Projects />} />
          <Route path="infraestructura" element={<Infrastructure />} />
          <Route path="automatizacion" element={<Automation />} />
          <Route path="contacto" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App