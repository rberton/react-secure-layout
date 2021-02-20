import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import { RecoilRoot } from 'recoil'
import { recoilState } from './dataStructure'

test('renders learn react link', () => {
  const todo = {
    todoList: [
      {
        id: 'TsHx9eEN5Y4A',
        bodyText: 'monster',
        completed: false,
      },
      {
        id: 'ba91OwrK0Dt8',
        bodyText: 'boss black',
        completed: false,
      },
      {
        id: 'QwejYipEf5nk',
        bodyText: 'caffe latte',
        completed: false,
      },
    ],
  }
  render(
    <RecoilRoot
      initializeState={({ set }) => {
        set(recoilState, todo)
      }}
    >
      <App path="/" />
    </RecoilRoot>
  )
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
