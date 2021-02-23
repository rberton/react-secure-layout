import styled, { keyframes } from 'styled-components'
import { TextField, Button } from '@material-ui/core'
import { Link } from '@reach/router'
import { Loop } from '@material-ui/icons'

export const K64ConnectionForm = styled.form`
  margin: 1rem;
  max-width: 600px;
  background: white;
  border-radius: 0.3rem;
`

export const K64TextField = styled(TextField)`
  &.MuiFormControl-root {
    margin: 1rem;
  }
  label.Mui-focused {
    color: #764abc;
  }
  .Mui-focused .MuiInput-underline:after {
    border-bottom-color: #764abc;
  }
`

export const K64Button = styled(Button)`
  &.MuiButtonBase-root {
    background: #764abc;
    color: white;
    margin: 1rem 0.5rem;
    &:hover {
      background-color: rgba(118, 74, 188, 0.8);
    }
  }
`

export const K64Link = styled(Link)`
  color: #764abc;
  margin: 0 0.5rem;
`

const loopRotate = keyframes`
  from {
    transform: rotate(0)
  }
  to {
    transform: rotate(360deg)
  }
`

export const K64Loop = styled(Loop)`
  pointer-events: none;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${loopRotate} infinite 2s ease-in-out;
  }
  &.MuiSvgIcon-root {
    fill: #764abc;
    width: 3rem;
    height: 3rem;
  }
`
