import type { TrackingEvent } from '@tmtsoftware/esw-ts'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocationService } from '../../../hooks/locationHooks'
import type { AppRootState } from '../../../store/store'
import SequenceManagerStore from '../SequenceManagerStore'
import { smConnection } from '../../constants'
import { ShutdownSMButton } from './ShutdownSMButton'
import { SpawnSMButton } from './SpawnSMButton'

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
  }, [locationService])

  if (isSpawned) return <ShutdownSMButton />
  return <SpawnSMButton />
}

export default SequenceManager