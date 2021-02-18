import { InputNumber, Table } from 'antd'
import React from 'react'
import type { ColumnsType } from 'antd/lib/table/interface'

interface ProvisionProps {
  provisionRecord: Record<string, number>
  setProvisionRecord: (value: Record<string, number>) => void
}

const columns = (
  func: (numOfSeqComp: number, record: Record<string, number>) => void
): ColumnsType<Record<any, any>> => [
  {
    title: 'Agent',
    width: 50,
    dataIndex: 'agentPrefix',
    key: 'agentPrefix',
    fixed: 'left'
  },
  {
    title: 'Number of Sequence Component',
    width: 100,
    dataIndex: 'numOfSequenceComps',
    key: 'numOfSequenceComps',
    fixed: 'left',
    // eslint-disable-next-line react/display-name
    render: (value: number, record) => (
      <InputNumber
        min={0}
        defaultValue={value}
        onChange={(value: any) => func(value, record)}
      />
    )
  }
]

export const ProvisionTable = ({
  provisionRecord,
  setProvisionRecord
}: ProvisionProps): JSX.Element => {
  const data = Object.entries(provisionRecord).map(
    ([prefixStr, num], index) => {
      return {
        key: index.toString(),
        agentPrefix: prefixStr,
        numOfSequenceComps: num
      }
    }
  )

  return (
    <Table
      pagination={false}
      columns={columns((numOfSeqComp, record) => {
        provisionRecord[record.agentPrefix] = numOfSeqComp
        setProvisionRecord(provisionRecord)
      })}
      dataSource={data}
    />
  )
}
