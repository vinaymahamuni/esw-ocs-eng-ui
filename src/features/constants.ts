import { AkkaConnection, ComponentId, Prefix } from '@tmtsoftware/esw-ts'

export const agentPrefix = new Prefix('ESW', 'primary')
export const obsModeConfig = 'smObsModeConfig.conf'

const smPrefix = new Prefix('ESW', 'sequence_manager')
const smConnType = 'Service'
export const smComponentId = new ComponentId(smPrefix, smConnType)

export const smConnection = AkkaConnection(smPrefix, smConnType)
