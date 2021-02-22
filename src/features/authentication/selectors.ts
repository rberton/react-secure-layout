import { selector, DefaultValue } from 'recoil'
import {
  connectionAtom,
  knowledgeAtom,
  statusAtom,
  userAtom,
  errorsAtom,
} from './atoms'

export const connectionSelector = selector({
  key: 'connectionSelector',
  get: ({ get }) => {
    const connection = get(connectionAtom)

    return !connection
  },
})

export const knowledgeSelector = selector({
  key: 'knowledgeSelector',
  get: ({ get }) => !get(knowledgeAtom),
  set: ({ set }, newValue) =>
    set(knowledgeAtom, newValue instanceof DefaultValue ? newValue : !newValue),
})

export const statusSelector = selector({
  key: 'statusSelector',
  get: ({ get }) => {
    const status = get(statusAtom)

    return status
  },
})

export const userSelector = selector({
  key: 'userSelector',
  get: ({ get }) => {
    const user = get(userAtom)

    return user
  },
})

export const errorsSelector = selector({
  key: 'errorsSelector',
  get: ({ get }) => {
    const errors = get(errorsAtom)

    return errors
  },
})
