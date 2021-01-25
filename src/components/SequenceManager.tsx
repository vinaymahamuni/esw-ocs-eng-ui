import { AuthContext, TrackingEvent } from '@tmtsoftware/esw-ts'
import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocationService } from '../hooks/customHook'
import { sequenceManager, SequenceManagerState } from '../store/store'
import { ShutdownSMButton, SpawnSMButton } from './sm/SMButton'
import { smConnection } from './sm/constants'

const SequenceManager = (): JSX.Element => {
  const { isSpawned } = useSelector((state: SequenceManagerState) => state)
  const dispatch = useDispatch()

  const { auth } = useContext(AuthContext)
  if (!auth) throw Error('Login to proceed ...')

  const [locationService] = useLocationService()

  const updateSmState = (trackingEvent: TrackingEvent) => {
    if (trackingEvent._type === 'LocationRemoved') {
      dispatch(sequenceManager.actions.killed())
    } else if (trackingEvent._type === 'LocationUpdated') {
      dispatch(sequenceManager.actions.spawned())
    }
  }

  useEffect(() => {
    locationService?.track(smConnection)(updateSmState)
  }, [])

  if (isSpawned) return <ShutdownSMButton />
  return <SpawnSMButton />
}

export default SequenceManager
