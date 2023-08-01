import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import About from './pages/About'

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

import './App.css'

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div >
  )
}

export default App
