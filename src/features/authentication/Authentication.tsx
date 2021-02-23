import React from 'react'
import * as k64 from '../../@types'
import useAuthentication from './useAuthentication'
import { Grid, Typography } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import {
  K64ConnectionForm,
  K64TextField,
  K64Button,
  K64Link,
  K64Loop,
} from './Authentication.style'

const Authentication: React.FC<k64.IAuthenticationOptions> = ({ path }) => {
  const {
    connected,
    known,
    status,
    errors,
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
  } = useAuthentication({
    path,
  })

  return (
    <article>
      {/* Écran de login */}

      {(status === k64.Status.idle || status === k64.Status.failed) &&
        known &&
        !connected && (
          <K64ConnectionForm
            noValidate
            autoComplete="off"
            onSubmit={loginSubmit}
          >
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <K64TextField
                  data-cy="surname-input-text"
                  name="surname"
                  label={'Surname'}
                  value={surname}
                  onChange={surnameChange}
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
                  data-cy="password-input-text"
                  type="password"
                  name="password"
                  label={'Password'}
                  value={password}
                  onChange={passwordChange}
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
            onSubmit={signupSubmit}
          >
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <K64TextField
                  data-cy="firstname-input-text"
                  name="firstname"
                  label={'Firstname'}
                  value={firstname}
                  onChange={firstnameChange}
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
                  data-cy="lastname-input-text"
                  name="lastname"
                  label={'Lastname'}
                  value={lastname}
                  onChange={lastnameChange}
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
                  data-cy="surname-input-text"
                  name="surname"
                  label={'Surname'}
                  value={surname}
                  onChange={surnameChange}
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
                  data-cy="email-input-text"
                  type="email"
                  name="email"
                  label={'Email'}
                  value={email}
                  onChange={emailChange}
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
                  data-cy="password-input-text"
                  type="password"
                  name="password"
                  label={'Password'}
                  value={password}
                  onChange={passwordChange}
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
                  data-cy="confirm-input-text"
                  type="password"
                  name="confirm"
                  label={'Confirm'}
                  value={confirm}
                  onChange={confirmChange}
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
        <K64ConnectionForm
          autoComplete="off"
          onSubmit={logoutSubmit}
          data-cy="disconnect-form"
        >
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
    </article>
  )
}

export default Authentication
