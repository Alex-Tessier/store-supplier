import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Settings from './pages/Settings/Settings'
import ProtectedRouteWithLayout from './components/ProtectedRouteWithLayout'
import { AppProvider } from './components/AppContext'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={
            <ProtectedRouteWithLayout>
              <Settings />
            </ProtectedRouteWithLayout>
          } />
          <Route path="*" element={<div>404 NOT FOUND</div>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
