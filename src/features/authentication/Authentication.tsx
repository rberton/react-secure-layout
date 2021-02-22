import React, { FormEvent } from 'react'
import * as k64 from '../../@types'
import useAuthentication from './useAuthentication'
import { Grid, Paper, Typography } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import {
  K64ConnectionForm,
  K64TextField,
  K64Button,
  K64Link,
  K64Loop,
} from '../../styled-components'
import {
  surnameAtom,
  passwordAtom,
  firstnameAtom,
  lastnameAtom,
  emailAtom,
  confirmAtom,
  userAtom,
  statusAtom,
  connectionAtom,
  knowledgeAtom,
  errorsAtom,
} from './atoms'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useNavigate } from '@reach/router'
import _ from 'lodash'

const Authentication: React.FC<k64.IAuthenticationOptions> = ({ path }) => {
  const navigate = useNavigate()
  const { connected, known, status, errors } = useAuthentication({
    path,
  })
  const [surname, setSurname] = useRecoilState(surnameAtom)
  const [password, setPassword] = useRecoilState(passwordAtom)
  const [firstname, setFirstname] = useRecoilState(firstnameAtom)
  const [lastname, setLastname] = useRecoilState(lastnameAtom)
  const [email, setEmail] = useRecoilState(emailAtom)
  const [confirm, setConfirm] = useRecoilState(confirmAtom)
  const setUser = useSetRecoilState(userAtom)
  const setStatus = useSetRecoilState(statusAtom)
  const setConnection = useSetRecoilState(connectionAtom)
  const setKnowledge = useSetRecoilState(knowledgeAtom)
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
  const handleLoginSubmit = async (event: FormEvent) => {
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
  const handleSignupSubmit = async (event: FormEvent) => {
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
  const handleLogoutSubmit = (event: FormEvent) => {
    event.preventDefault()
    setStatus(k64.Status.idle)
    setConnection(false)
    navigate('/', { replace: true })
  }

  return (
    <Paper elevation={3}>
      {/* Écran de login */}

      {(status === k64.Status.idle || status === k64.Status.failed) &&
        known &&
        !connected && (
          <K64ConnectionForm
            noValidate
            autoComplete="off"
            onSubmit={handleLoginSubmit}
          >
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <K64TextField
                  name="surname"
                  label={'Surname'}
                  value={surname}
                  onChange={(event) => setSurname(event.target.value)}
                  error={
                    !!errors.items.find(
                      (error: k64.IError) => error.label === 'surname'
                    )
                  }
                  helperText={
                    errors.items.find(
                      (error: k64.IError) => error.label === 'surname'
                    )?.error
                  }
                />
              </Grid>
              <Grid item>
                <K64TextField
                  type="password"
                  name="password"
                  label={'Password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  error={
                    !!errors.items.find(
                      (error: k64.IError) => error.label === 'password'
                    )
                  }
                  helperText={
                    errors.items.find(
                      (error: k64.IError) => error.label === 'password'
                    )?.error
                  }
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <K64Button type="submit">Login</K64Button>
                or
                <K64Link to={'/signup'}>Signup</K64Link>
              </Grid>
            </Grid>
          </K64ConnectionForm>
        )}

      {/* Écran d'inscription */}

      {(status === k64.Status.idle || status === k64.Status.failed) &&
        !known &&
        !connected && (
          <K64ConnectionForm
            noValidate
            autoComplete="off"
            onSubmit={handleSignupSubmit}
          >
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <K64TextField
                  name="firstname"
                  label={'Firstname'}
                  value={firstname}
                  onChange={(event) => setFirstname(event.target.value)}
                  error={
                    !!errors.items.find(
                      (error: k64.IError) => error.label === 'firstname'
                    )
                  }
                  helperText={
                    errors.items.find(
                      (error: k64.IError) => error.label === 'firstname'
                    )?.error
                  }
                />
              </Grid>
              <Grid item>
                <K64TextField
                  name="lastname"
                  label={'Lastname'}
                  value={lastname}
                  onChange={(event) => setLastname(event.target.value)}
                  error={
                    !!errors.items.find(
                      (error: k64.IError) => error.label === 'lastname'
                    )
                  }
                  helperText={
                    errors.items.find(
                      (error: k64.IError) => error.label === 'lastname'
                    )?.error
                  }
                />
              </Grid>
              <Grid item>
                <K64TextField
                  name="surname"
                  label={'Surname'}
                  value={surname}
                  onChange={(event) => setSurname(event.target.value)}
                  error={
                    !!errors.items.find(
                      (error: k64.IError) => error.label === 'surname'
                    )
                  }
                  helperText={
                    errors.items.find(
                      (error: k64.IError) => error.label === 'surname'
                    )?.error
                  }
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <K64TextField
                  type="email"
                  name="email"
                  label={'Email'}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  error={
                    !!errors.items.find(
                      (error: k64.IError) => error.label === 'email'
                    )
                  }
                  helperText={
                    errors.items.find(
                      (error: k64.IError) => error.label === 'email'
                    )?.error
                  }
                />
              </Grid>
              <Grid item>
                <K64TextField
                  type="password"
                  name="password"
                  label={'Password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  error={
                    !!errors.items.find(
                      (error: k64.IError) => error.label === 'password'
                    )
                  }
                  helperText={
                    errors.items.find(
                      (error: k64.IError) => error.label === 'password'
                    )?.error
                  }
                />
              </Grid>
              <Grid item>
                <K64TextField
                  type="password"
                  name="confirm"
                  label={'Confirm'}
                  value={confirm}
                  onChange={(event) => setConfirm(event.target.value)}
                  error={
                    !!errors.items.find(
                      (error: k64.IError) => error.label === 'password'
                    )
                  }
                  helperText={
                    errors.items.find(
                      (error: k64.IError) => error.label === 'password'
                    )?.error
                  }
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <K64Button type="submit">Sign up</K64Button>
                or
                <K64Link to={'/'}>Login</K64Link>
              </Grid>
            </Grid>
          </K64ConnectionForm>
        )}

      {/* Écran de déconnexion */}

      {status === k64.Status.success && known && connected && (
        <K64ConnectionForm autoComplete="off" onSubmit={handleLogoutSubmit}>
          <Grid container>
            <Grid item>
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                <Typography variant="body1">User connected !</Typography>
              </Alert>
            </Grid>
            <Grid item>
              <K64Button type="submit">Logout</K64Button>
            </Grid>
          </Grid>
        </K64ConnectionForm>
      )}

      {/* Chargement */}

      {status === k64.Status.loading && <K64Loop />}
    </Paper>
  )
}

export default Authentication
