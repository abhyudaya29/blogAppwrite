
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import authService from './appwrite/auth'
import {login,logout} from "./store/authSlice"
import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/footer'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  return loading ? (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-lg font-semibold text-gray-700">Loading...</p>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col bg-gray-500">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <p className="text-xl font-bold text-center text-gray-800">Hey Blog</p>
        {/* <Outlet /> */}
      </main>
      <Footer />
    </div>
  )
}

export default App
