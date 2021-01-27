import React from 'react'
import { Button } from 'antd'
import { useSelector } from 'react-redux'
import type { AppRootState } from '../../../store/store'

type SMButtonProps = {
  btnName: string
  disabled: boolean
  action: () => void
}

export const SMToggleButton = ({
  btnName,
  disabled,
  action
}: SMButtonProps): JSX.Element => {
  const { loading } = useSelector(
    (state: AppRootState) => state.SequenceManager
  )

  return (
    <Button disabled={disabled} loading={loading} onClick={() => action()}>
      {btnName}
    </Button>
  )
}
