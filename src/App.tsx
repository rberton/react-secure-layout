import React from 'react'
import { Router } from '@reach/router'
import logo from './logo.svg'
import Authentication from './features/authentication/Authentication'
import { K64, K64Header, K64Logo, K64Main } from './App.style'
import { NotFound } from './NotFound'

const App: React.FC = () => {
  return (
    <K64>
      <K64Header>
        <K64Logo src={logo} alt="logo" />
      </K64Header>
      <K64Main>
        <Router>
          <Authentication path="/" />
          <Authentication path="/signup" />
          <NotFound default />
        </Router>
      </K64Main>
    </K64>
  )
}

export default App
