import React from 'react'
import { fireEvent, render, within } from '@testing-library/react'
import { expect } from 'chai'
import { SelectionModal } from '../../../src/components/Modal/SelectionModal'

describe('SelectionModal', () => {
  it('should render modal with title and given list of data | ESW-441', async () => {
    const modalProps = {
      data: ['data-1', 'data-2'],
      title: 'some-title',
      okText: 'Start',
      onChange: () => true,
      selectedItem: '',
      visible: true
    }
    const { getByText, getByRole } = render(<SelectionModal {...modalProps} />)

    const title = getByText(/some-title/i)
    const data1 = getByRole('menuitem', {
      name: 'data-1'
    })
    const data2 = getByRole('menuitem', {
      name: 'data-2'
    })

    expect(title).to.exist
    expect(data1.innerText).eq('data-1')
    expect(data2.innerText).eq('data-2')
  })

  it('should call onChange method when menu item is selected', () => {
    let value = ''
    const modalProps = {
      data: ['data-1', 'data-2'],
      title: 'some-title',
      okText: 'Start',
      onChange: (selectedKey: string) => (value = selectedKey),
      selectedItem: '',
      visible: true
    }
    const { getByRole } = render(<SelectionModal {...modalProps} />)

    const data1 = getByRole('menuitem', {
      name: 'data-1'
    })

    fireEvent.click(data1)

    expect(value).eq('data-1')
  })

  it('should handle onOk and onCancel event', () => {
    let value = ''
    const modalProps = {
      data: [],
      title: 'some-title',
      okText: 'Start',
      onChange: () => true,
      onOk: () => (value = 'Ok'),
      onCancel: () => (value = 'canceled'),
      selectedItem: '',
      visible: true
    }
    const { getByRole } = render(<SelectionModal {...modalProps} />)

    const okButton = getByRole('button', { name: /start/i })
    const cancelButton = getByRole('button', { name: /cancel/i })

    fireEvent.click(okButton)
    expect(value).eq('Ok')

    fireEvent.click(cancelButton)
    expect(value).eq('canceled')
  })

  it('should not show menu if visible equals false', () => {
    const modalProps = {
      data: [],
      title: 'some-title',
      okText: 'Start',
      onChange: () => true,
      onOk: () => true,
      onCancel: () => true,
      selectedItem: '',
      visible: false
    }

    const { queryByText } = render(<SelectionModal {...modalProps} />)
    expect(queryByText(/some-title/i)).to.null
  })

  it('should show empty if data is not present', () => {
    const modalProps = {
      data: [],
      title: 'some-title',
      okText: 'Start',
      onChange: () => true,
      onOk: () => true,
      onCancel: () => true,
      selectedItem: '',
      visible: true
    }

    const { queryByRole, getByText } = render(
      <SelectionModal {...modalProps} />
    )

    expect(getByText(/No Data/i)).to.exist
    expect(queryByRole('menuitem')).to.null
  })
})