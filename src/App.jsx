import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Fun from './pages/Fun/Fun'
import Randomizer from './pages/Randomizer/Randomizer'
import Rust from './pages/Rust/Rust'
import Minecraft from './pages/Minecraft/Minecraft'
import Vlogf from './pages/Vlogf/Vlogf'
import Seido from './pages/Seido/Seido'

const BIO_PATHS = ['/vlogf', '/seido']

function AppLayout() {
  const loc = useLocation()
  const isBio = BIO_PATHS.includes(loc.pathname)

  return (
    <>
      {!isBio && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fun" element={<Fun />} />
        <Route path="/fun/randomizer" element={<Randomizer />} />
        <Route path="/games/rust" element={<Rust />} />
        <Route path="/games/minecraft" element={<Minecraft />} />
        <Route path="/vlogf" element={<Vlogf />} />
        <Route path="/seido" element={<Seido />} />
        <Route path="*" element={null} />
      </Routes>
      {!isBio && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/x-ww">
      <AppLayout />
    </BrowserRouter>
  )
}
