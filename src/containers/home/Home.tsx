import React from 'react'
import { ServiceProvider } from '../../context/ServiceContext'
import SequenceManager from '../../component/SequenceManager'
import { SMContextProvider } from '../../context/SMContext'

const Home = () => {
  return (
    <ServiceProvider>
      <SMContextProvider>
        <SequenceManager />
      </SMContextProvider>
    </ServiceProvider>
  )
}

export default Home
