import React from 'react'
import Header from '../components/header/Header'

const MainLayaout = ({ children }: any) => {
  return (
    <>
        <Header />
        {children}
    </>
  )
}

export default MainLayaout