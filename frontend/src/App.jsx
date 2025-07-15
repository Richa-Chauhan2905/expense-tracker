import { useState } from 'react'
import Home_page from './components/Home_page'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className='bg-blue-100 min-h-screen'>
      <Navbar />
      <Home_page />
    </div>
  )
}

export default App
