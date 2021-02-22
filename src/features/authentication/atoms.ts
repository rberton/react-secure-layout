import { atom } from 'recoil'
import * as k64 from '../../@types'

export const connectionAtom = atom({
  key: 'connected',
  default: false,
})

export const knowledgeAtom = atom({
  key: 'known',
  default: true,
})

export const statusAtom = atom({
  key: 'status',
  default: k64.Status.loading,
})

export const userAtom = atom({
  key: 'user',
  default: {
    avatar: '',
    confirm: '',
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    surname: '',
    token: '',
  },
})

export const errorsAtom = atom({
  key: 'errors',
  default: {
    items: [] as k64.IError[],
  },
})

export const surnameAtom = atom({
  key: 'surname',
  default: '',
})

export const passwordAtom = atom({
  key: 'password',
  default: '',
})

export const firstnameAtom = atom({
  key: 'firstname',
  default: '',
})

export const lastnameAtom = atom({
  key: 'lastname',
  default: '',
})

export const emailAtom = atom({
  key: 'email',
  default: '',
})

export const confirmAtom = atom({
  key: 'confirm',
  default: '',
})
