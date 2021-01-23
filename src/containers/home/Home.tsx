import React from 'react'
import { ServiceProvider } from '../../context/ServiceContext'
import SequenceManager from '../../components/SequenceManager'
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
