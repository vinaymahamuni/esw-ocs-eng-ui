import Icon from '@ant-design/icons'
import React from 'react'
import { Infra } from './Infra'
import { Settings } from './Settings'
import { Telescope } from './Telescope'
type CustomIconComponentProps = {
  fill?: string
  className?: string
}

export const TelescopeIcon = (props: CustomIconComponentProps) => (
  <Icon component={Telescope} {...props} />
)

export const SettingsIcon = (props: CustomIconComponentProps) => (
  <Icon component={Settings} {...props} />
)

export const InfraIcon = (props: CustomIconComponentProps) => (
  <Icon component={Infra} {...props} />
)
