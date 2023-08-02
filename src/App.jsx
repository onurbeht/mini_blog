import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react'

import { useAuthentication } from './hooks/useAuthentication'

//Pages
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import CreatePost from './pages/CreatePost/CreatePost'
import About from './pages/About/About'

//components
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

//context
import { AuthProvider } from './context/authContext'

//style
import './App.css'

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)      
    })
  }, [auth])

  if(loadingUser) {
    return <p>Carregando...</p>
  }


  return (
    <div className="app">
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
              <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to='/login' />} />
              <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to='/login' />} />
              <Route path='/about' element={<About />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div >
  )
}

export default App
