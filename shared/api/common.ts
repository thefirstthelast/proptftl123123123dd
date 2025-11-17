export interface ResendVerifyEmailResponse {
  message: string
}

export interface VerifyEmailResponse {
  message: string
  user: {
    id: number
    email: string
    email_verified_at: string
  }
}
