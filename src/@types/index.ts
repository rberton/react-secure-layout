import { ErrorInfo, ReactNode } from 'react'

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
}

export interface IAuthenticationOptions {
  path: Routes
}

export type ReturnAuthenticationProps = (
  options: IAuthenticationOptions
) => IAuthentication
