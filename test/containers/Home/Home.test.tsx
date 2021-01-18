import React from 'react'
import { expect } from 'chai'
import { render } from '@testing-library/react'
import Home from '../../../src/containers/home/Home'

describe('Home page', () => {
  it('should render header', () => {
    const { getByText } = render(<Home/>)
    const element = getByText('Update src/App.tsx and save to reload.')
    expect(document.body.contains(element))
  })
})
