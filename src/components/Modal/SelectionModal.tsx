import { Empty, Menu, Modal, ModalProps } from 'antd'
import React from 'react'
import styles from './selectionModal.module.css'
import type { SelectInfo } from 'rc-menu/lib/interface'

interface SelectionModalProps extends ModalProps {
  selectedItem: string
  data: string[] | undefined
  onChange: (value: string) => void
}

export const SelectionModal = ({
  selectedItem,
  data,
  title,
  okText,
  visible,
  confirmLoading,
  onOk,
  onCancel,
  onChange
}: SelectionModalProps): JSX.Element => {
  const onSelect = (e: SelectInfo) => onChange(e.key as string)

  return (
    <Modal
      title={title}
      okText={okText}
      centered
      visible={visible}
      confirmLoading={confirmLoading}
      bodyStyle={{ padding: 0 }}
      onOk={onOk}
      onCancel={onCancel}>
      <Menu selectable onSelect={onSelect}>
        {(data == undefined || data.length == 0) && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
        {data &&
          data.map((item) => {
            return (
              <Menu.Item
                className={
                  styles.menuItem +
                  ` ${item == selectedItem ? styles.selectedItem : ''}`
                }
                style={{ paddingLeft: '24px', marginTop: 0, marginBottom: 0 }}
                key={item}>
                {item}
              </Menu.Item>
            )
          })}
      </Menu>
    </Modal>
  )
}
