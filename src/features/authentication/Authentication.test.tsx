import React from 'react'
import { render } from '@testing-library/react'
import Authentication from './Authentication'
import { RecoilRoot } from 'recoil'
import { Router } from '@reach/router'

describe('Authentication component behaviours', () => {
  test('renders login form on /', () => {
    const screen = render(
      <RecoilRoot>
        <Router>
          <Authentication path="/" />
        </Router>
      </RecoilRoot>
    )
    expect(screen.getByText(/Signup/i)).toBeInTheDocument()
  })
})
