import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@reach/router'
import { RecoilRoot } from 'recoil'
import './index.css'
//import * as serviceWorker from './serviceWorker'
import App from './App'
import ErrorBoundary from './ErrorBoundary'
import { NotFound } from './NotFound'
import { Routes } from './dataStructure'
import reportWebVitals from './reportWebVitals'

interface Props {
  path: Routes
}
const Controller: React.FC<Props> = ({ path }) => <App path={path} />

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <RecoilRoot>
        <Router>
          <Controller path="/" />
          <Controller path="/active" />
          <Controller path="/completed" />
          <NotFound default />
        </Router>
      </RecoilRoot>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.register()
