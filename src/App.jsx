import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Product from './pages/Product'
import About from './pages/About'

import Navbar from './components/Navbar'

import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Product />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
