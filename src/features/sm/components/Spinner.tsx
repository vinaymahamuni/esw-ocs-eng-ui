import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'

const antIcon = <LoadingOutlined style={{ color: '#08c' }} spin />

export const Spinner = (): JSX.Element => <Spin indicator={antIcon} />
