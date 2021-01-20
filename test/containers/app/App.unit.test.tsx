import React from 'react'
import { expect } from 'chai'
import { render } from '@testing-library/react'
import App from '../../../src/containers/app/App' // fixed to absolute path

describe('App page', () => {
  it('should render some element', () => {
    const { getByText } = render(
      <App>
        <div>hello world</div>
      </App>
    )
    const element = getByText('hello world')
    expect(document.body.contains(element))
  })
})
