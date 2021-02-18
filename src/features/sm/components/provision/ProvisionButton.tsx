import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { useConfigService } from '../../../config/hooks/useConfigService'
import { useSMService } from '../hooks/useSMService'
import {
  AgentProvisionConfig,
  ConfigService,
  Prefix,
  ProvisionConfig,
  SequenceManagerService
} from '@tmtsoftware/esw-ts'
import { ProvisionTable } from './ProvisionTable'
import { Spinner } from '../../../../components/spinners/Spinner'
import { useAction } from '../../../utils/hooks/useMutation'
import { useProvisionAction } from '../../hooks/useProvisionAction'

type ProvisionRecord = Record<string, number>

const provision = (provisionRecord: ProvisionRecord) => (
  sequenceManagerService: SequenceManagerService
) => {
  const provisionConfig = parseProvisionConf(provisionRecord)
  return sequenceManagerService.provision(provisionConfig).then((res) => {
    if (res._type == 'Success') return res
    throw Error(JSON.stringify(res))
  })
}

const parseProvisionConf = (provisionRecord: ProvisionRecord) => {
  const agentProvisionConfigs = Object.entries(provisionRecord).map(
    ([prefixStr, num]) => {
      return new AgentProvisionConfig(Prefix.fromString(prefixStr), num)
    }
  )
  return new ProvisionConfig(agentProvisionConfigs)
}

const fetchProvisionConf = (callBack: (p: ProvisionRecord) => void) => async (
  configService: ConfigService
): Promise<void> => {
  const confOption = await configService.getActive('/provision.json')
  if (!confOption) throw Error('Provision conf is not present')
  const text = await confOption.fileContentAsString()

  const config: Record<string, never> = JSON.parse(text)
  callBack(config['esw-sm']['provision'])
}

export const ProvisionButton = (): JSX.Element => {
  const [modalVisibility, setModalVisibility] = useState(false)
  const [provisionRecord, setProvisionRecord] = useState<ProvisionRecord>({})

  const handleModalCancel = () => setModalVisibility(false)

  const configService = useConfigService()
  const smService = useSMService()

  const fetchProvisionConfAction = useAction(
    'provisionConfig',
    fetchProvisionConf(setProvisionRecord),
    'Successfully fetched Provision Config from ConfigService',
    'Failed to fetch Provision Config'
  )

  const provisionAction = useProvisionAction(
    provision(provisionRecord),
    'Successfully provisioned',
    'Failed to provision'
  )

  if (configService.isLoading || smService.isLoading) return <Spinner />

  const onProvisionClick = () => {
    if (configService.data) fetchProvisionConfAction.mutate(configService.data)
    setModalVisibility(true)
  }

  const handleModalOk = () => {
    if (smService.data) provisionAction.mutate(smService.data)
    setModalVisibility(false)
  }

  return (
    <>
      <Button
        type='primary'
        size='middle'
        loading={provisionAction.isLoading}
        onClick={onProvisionClick}>
        Provision
      </Button>
      <Modal
        title='Choose an agent to spawn Sequence Manager'
        okText='Provision'
        centered
        visible={modalVisibility}
        confirmLoading={provisionAction.isLoading}
        bodyStyle={{ padding: 0 }}
        onOk={handleModalOk}
        onCancel={handleModalCancel}>
        <ProvisionTable
          provisionRecord={provisionRecord}
          setProvisionRecord={setProvisionRecord}
        />
      </Modal>
    </>
  )
}
