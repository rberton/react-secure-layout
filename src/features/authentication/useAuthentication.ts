import {
  useEffect,
  useCallback,
  FormEvent,
  ChangeEvent,
  ChangeEventHandler,
} from 'react'
import * as k64 from '../../@types'
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from 'recoil'
import { useNavigate } from '@reach/router'
import _ from 'lodash'
import {
  connectionAtom,
  knowledgeAtom,
  statusAtom,
  errorsAtom,
  userAtom,
  surnameAtom,
  passwordAtom,
  firstnameAtom,
  lastnameAtom,
  emailAtom,
  confirmAtom,
} from './Authentication.atoms'

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
  const navigate = useNavigate()
  const [surname, setSurname] = useRecoilState(surnameAtom)
  const surnameChange: ChangeEventHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSurname(event.target.value)
  }
  const [password, setPassword] = useRecoilState(passwordAtom)
  const passwordChange: ChangeEventHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value)
  }
  const [firstname, setFirstname] = useRecoilState(firstnameAtom)
  const firstnameChange: ChangeEventHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setFirstname(event.target.value)
  }
  const [lastname, setLastname] = useRecoilState(lastnameAtom)
  const lastnameChange: ChangeEventHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setLastname(event.target.value)
  }
  const [email, setEmail] = useRecoilState(emailAtom)
  const emailChange: ChangeEventHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value)
  }
  const [confirm, setConfirm] = useRecoilState(confirmAtom)
  const confirmChange: ChangeEventHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirm(event.target.value)
  }
  const setUser = useSetRecoilState(userAtom)
  const setConnection = useSetRecoilState(connectionAtom)
  const setErrors = useSetRecoilState(errorsAtom)
  const isEmail = (value?: string): boolean => {
    return !!value && /(.)*@(.)*\.(.)*/.test(value)
  }
  const isNotEmpty = (value?: string): boolean => {
    return !!value && _.trim(value) !== ''
  }
  const isNotEmptyAndEqual = (
    pair?: [string | undefined, string | undefined]
  ): boolean => {
    return (
      !!pair &&
      !!pair[0] &&
      !!pair[1] &&
      _.trim(pair[0]) !== '' &&
      _.trim(pair[1]) !== '' &&
      pair[0] === pair[1]
    )
  }
  const validateSignup = (user: k64.IUser): boolean => {
    return [
      isNotEmpty(user.firstname),
      isNotEmpty(user.lastname),
      isNotEmpty(user.surname),
      isNotEmpty(user.email),
      isEmail(user.email),
      isNotEmptyAndEqual([user.password, user.confirm]),
    ].every((test) => !!test)
  }
  const setSignupSubmitErrors = (user: k64.IUser) => {
    setErrors({
      items: [
        {
          label: 'firstname',
          error: isNotEmpty(user.firstname) ? '' : 'This field is required',
        },
        {
          label: 'lastname',
          error: isNotEmpty(user.lastname) ? '' : 'This field is required',
        },
        {
          label: 'surname',
          error: isNotEmpty(user.surname) ? '' : 'This field is required',
        },
        {
          label: 'email',
          error: isNotEmpty(user.email) ? '' : 'This field is required',
        },
        {
          label: 'email',
          error: isEmail(user.email)
            ? ''
            : 'This field need to be a valid email',
        },
        {
          label: 'password',
          error: isNotEmptyAndEqual([user.password, user.confirm])
            ? ''
            : 'The password and the confirm must be equals',
        },
      ].filter((item) => item.error !== ''),
    })
    setStatus(k64.Status.failed)
  }
  const loginSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setStatus(k64.Status.loading)
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve('ok')
      }, 1000)
    })
    if (response === 'ok') {
      setUser({
        avatar: '',
        confirm: 'true',
        email,
        firstname,
        lastname,
        password,
        surname,
        token: 'token',
      })
      setStatus(k64.Status.success)
      setConnection(true)
      setKnowledge(true)
    }
  }
  const signupSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setStatus(k64.Status.loading)
    const isValid = validateSignup({
      firstname,
      lastname,
      surname,
      email,
      password,
      confirm,
    })
    if (isValid) {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve('ok')
        }, 1000)
      })
      if (response === 'ok') {
        setUser({
          avatar: '',
          confirm: 'true',
          email,
          firstname,
          lastname,
          password,
          surname,
          token: 'token',
        })
        setStatus(k64.Status.success)
        setConnection(true)
        setKnowledge(true)
      }
    } else {
      setSignupSubmitErrors({
        firstname,
        lastname,
        surname,
        email,
        password,
        confirm,
      })
    }
  }
  const logoutSubmit = (event: FormEvent) => {
    event.preventDefault()
    setStatus(k64.Status.idle)
    setConnection(false)
    navigate('/', { replace: true })
  }

  useEffect(() => {
    path === '/signup' ? getSignup() : getLogin()
  }, [path, getSignup, getLogin])

  return {
    connected,
    known,
    status,
    errors,
    user,
    surname,
    surnameChange,
    firstname,
    firstnameChange,
    lastname,
    lastnameChange,
    email,
    emailChange,
    password,
    passwordChange,
    confirm,
    confirmChange,
    loginSubmit,
    signupSubmit,
    logoutSubmit,
  }
}

export default useAuthentication
