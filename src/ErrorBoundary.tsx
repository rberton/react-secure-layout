import React, { Component, ReactNode, ErrorInfo } from 'react'
import * as k64 from './@types'
import styled from 'styled-components'
class ErrorBoundary extends Component<k64.IBoundaryProps, k64.IBoundaryState> {
  state = {
    error: null,
    info: null,
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.setState({ error, info })
  }

  render(): ReactNode {
    const { error } = this.state
    if (error) {
      return <ErrorBoundaryFallbackComponent />
    }
    return this.props.children
  }
}

export default ErrorBoundary

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Message = styled.div`
  padding: 40px;
  border: 2px #78909c solid;
  border-radius: 5px;
  font-size: 24px;
  color: #78909c;
`

const ErrorBoundaryFallbackComponent = () => (
  <Layout>
    <Message>
      Something Error Ooccurring
      <span role="img" aria-label="face-emoji">
        😞
      </span>
    </Message>
  </Layout>
)
