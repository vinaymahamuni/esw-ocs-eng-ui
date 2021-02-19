import { Spin } from 'antd'
import React from 'react'
import { useIsFetching } from 'react-query'
import './GlobalSpinner.css'

export default function GlobalSpinner(): JSX.Element {
  const isFetching = useIsFetching()

  return (
    <div className='global-spinner'>
      <Spin spinning={isFetching ? true : false} />
    </div>
  )
}
