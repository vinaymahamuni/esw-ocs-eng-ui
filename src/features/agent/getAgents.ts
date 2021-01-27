import { createAsyncThunk } from '@reduxjs/toolkit'
import type { LocationService } from '@tmtsoftware/esw-ts'

export const getAgents = createAsyncThunk(
  'getAgents',
  async (locationService: LocationService) => {
    const agents = await locationService.listByComponentType('Machine')
    return agents.map((l) => l.connection.prefix.toJSON())
  }
)
