export interface User {
  id: number
  name: string | null
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

export interface State {
  user: User | null
}
