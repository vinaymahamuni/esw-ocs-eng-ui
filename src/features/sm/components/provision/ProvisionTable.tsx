import { InputNumber, Table } from 'antd'
import type { ColumnsType } from 'antd/lib/table/interface'
import React from 'react'

type ProvisionProps = {
  provisionRecord: Record<string, number>
  setProvisionRecord: (value: Record<string, number>) => void
}

type ProvisionDataType = {
  key: string
  agentPrefix: string
  numOfSequenceComps: number
}

const columns = (
  func: (numOfSeqComp: number, record: ProvisionDataType) => void
): ColumnsType<ProvisionDataType> => [
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
        onChange={(value: string | number | null | undefined) =>
          func(value ? Number(value) : 0, record)
        }
      />
    )
  }
]
export const ProvisionTable = ({
  provisionRecord,
  setProvisionRecord
}: ProvisionProps): JSX.Element => {
  const data: ProvisionDataType[] = Object.entries(provisionRecord).map(
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
