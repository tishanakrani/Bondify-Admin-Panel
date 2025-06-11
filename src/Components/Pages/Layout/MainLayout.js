import React from 'react'
import Navigation from './Navigation'

const MainLayout = ({ children }) => {
  return (
    <>
      <Navigation />
      <div className='lg:pl-[280px]'>
        {children}
      </div>
    </>
  )
}

export default MainLayout