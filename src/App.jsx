import React, { useState, useEffect } from 'react'
import ThreeDHeart from './components/ThreeHeart'
import Dashboard from './components/main' 

const App = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 5500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='h-[100vh] w-[100vw]'> 
      {loading ? (
        <div className='flex bg-white h-full w-full text-black justify-center items-center'>
          <ThreeDHeart />
        </div>
      ) : (
        <Dashboard /> 
      )}
    </div>
  )
}

export default App