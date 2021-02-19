import { AkkaConnection, ComponentId, Prefix } from '@tmtsoftware/esw-ts'

export const obsModeConfig = 'smObsModeConfig.conf'

const smPrefix = new Prefix('ESW', 'sequence_manager')
const smConnType = 'Service'
export const ProvisionConfPath = '/tmt/esw/smProvisionConfig.json'
export const smComponentId = new ComponentId(smPrefix, smConnType)

export const smConnection = AkkaConnection(smPrefix, smConnType)
