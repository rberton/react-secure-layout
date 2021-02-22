import {
  ErrorInfo,
  ReactNode,
  ChangeEventHandler,
  FormEventHandler,
} from 'react'

export interface IBoundaryProps {
  children?: ReactNode
}

export interface IBoundaryState {
  error: Error | null
  info: ErrorInfo | null
}

export type Routes = '/' | '/signup'

export enum Status {
  idle = 'IDLE',
  loading = 'LOADING',
  success = 'SUCCESS',
  failed = 'FAILED',
}

export interface IError {
  label: string
  error: string
}

export interface IErrors {
  items: IError[]
}

export interface IUser {
  avatar?: string
  confirm?: string
  email?: string
  firstname?: string
  lastname?: string
  password?: string
  surname?: string
  token?: string
}

interface IAuthentication {
  connected: boolean
  known: boolean
  status: Status
  errors: IErrors
  user: IUser
  surname: string
  surnameChange: ChangeEventHandler
  firstname: string
  firstnameChange: ChangeEventHandler
  lastname: string
  lastnameChange: ChangeEventHandler
  email: string
  emailChange: ChangeEventHandler
  password: string
  passwordChange: ChangeEventHandler
  confirm: string
  confirmChange: ChangeEventHandler
  loginSubmit: FormEventHandler
  signupSubmit: FormEventHandler
  logoutSubmit: FormEventHandler
}

export interface IAuthenticationOptions {
  path: Routes
}

export type ReturnAuthenticationProps = (
  options: IAuthenticationOptions
) => IAuthentication
