import styled, { keyframes } from 'styled-components'

export const K64 = styled.article`
  background: #293327;
  display: flex;
  flex-direction: column;
`

export const K64Header = styled.header`
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
`

const logoFloat = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px)
  }
  100% {
    transform: translateY(0px)
  }
`

export const K64Logo = styled.img`
  fill: #764abc;
  height: 5vmin;
  pointer-events: none;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${logoFloat} infinite 3s ease-in-out;
  }
`

export const K64Main = styled.main`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
