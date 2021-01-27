import type { TrackingEvent } from '@tmtsoftware/esw-ts'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocationService } from '../hooks/customHook'
import type { AppRootState } from '../store/store'
import SequenceManagerStore from './sm/SequenceManagerStore'
import { ShutdownSMButton, SpawnSMButton } from './sm/SMButton'
import { smConnection } from './sm/constants'

const SequenceManager = (): JSX.Element => {
  const { isSpawned } = useSelector(
    (state: AppRootState) => state.SequenceManager
  )
  const dispatch = useDispatch()
  const { actions } = SequenceManagerStore

  const [locationService] = useLocationService()

  const updateSmState = (trackingEvent: TrackingEvent) => {
    if (trackingEvent._type === 'LocationRemoved') {
      dispatch(actions.killed())
    } else if (trackingEvent._type === 'LocationUpdated') {
      dispatch(actions.spawned())
    }
  }

  useEffect(() => {
    locationService?.find(smConnection).then((location) => {
      if (location) {
        locationService?.track(smConnection)(updateSmState)
        dispatch(actions.spawned())
      }
    })
  }, [actions, dispatch, locationService, updateSmState])

  if (isSpawned) return <ShutdownSMButton />
  return <SpawnSMButton />
}

export default SequenceManager
