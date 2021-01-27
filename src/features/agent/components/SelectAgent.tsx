import { Select } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocationService } from '../../../hooks/locationHooks'
import { getAgents } from '../getAgents'
import type { AppRootState } from '../../../store/store'

interface SelectAgentProps {
  onChange: (value: string) => void
  agentPrefix: string
}

export const SelectAgent = ({
  onChange,
  agentPrefix
}: SelectAgentProps): JSX.Element => {
  const dispatch = useDispatch()
  const [locationService] = useLocationService()
  const { agents } = useSelector((state: AppRootState) => state.Agents)

  useEffect(() => {
    locationService && dispatch(getAgents(locationService))
  }, [locationService])

  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder={'Select a agent'}
      optionFilterProp='children'
      onChange={onChange}
      defaultValue={agentPrefix}>
      {agents &&
        agents.map((location) => {
          return (
            <Select.Option value={location} key={location}>
              {location}
            </Select.Option>
          )
        })}
    </Select>
  )
}
