import { Select } from 'antd'
import React from 'react'
import { useAgents } from '../hooks/useAgents'

interface SelectAgentProps {
  onChange: (value: string) => void
}

export const SelectAgent = ({ onChange }: SelectAgentProps): JSX.Element => {
  const allAgentQuery = useAgents()

  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder='Select a agent'
      optionFilterProp='children'
      onChange={onChange}>
      {allAgentQuery.data &&
        allAgentQuery.data.map((prefix) => {
          const agentName = prefix.toJSON()
          return (
            <Select.Option value={agentName} key={agentName}>
              {agentName}
            </Select.Option>
          )
        })}
    </Select>
  )
}
