import { useEffect, useCallback } from 'react'
import * as k64 from '../../@types'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import {
  connectionAtom,
  knowledgeAtom,
  statusAtom,
  errorsAtom,
  userAtom,
} from './atoms'

const useAuthentication: k64.ReturnAuthenticationProps = ({ path }) => {
  const connected = useRecoilValue(connectionAtom)
  const [known, setKnowledge] = useRecoilState(knowledgeAtom)
  const [status, setStatus] = useRecoilState(statusAtom)
  const resetErrors = useResetRecoilState(errorsAtom)
  const getSignup = useCallback(() => {
    setKnowledge(false)
    setStatus(k64.Status.idle)
    resetErrors()
  }, [setKnowledge, setStatus, resetErrors])
  const getLogin = useCallback(() => {
    setKnowledge(true)
    setStatus(k64.Status.idle)
    resetErrors()
  }, [setKnowledge, setStatus, resetErrors])
  const errors = useRecoilValue(errorsAtom)
  const user = useRecoilValue(userAtom)

  useEffect(() => {
    path === '/signup' ? getSignup() : getLogin()
  }, [path, getSignup, getLogin])

  return {
    connected,
    known,
    status,
    errors,
    user,
  }
}

export default useAuthentication
