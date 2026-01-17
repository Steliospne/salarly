import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import type { LoginForm, SignupForm } from './definitions'
import { authClient } from '@/integrations/auth/client'
import { auth } from '@/integrations/auth/server'
import { getRouter } from '@/router'

export async function signupFn(ctx: SignupForm) {
  const router = getRouter()

  const { data, error } = await authClient.signUp.email({
    ...ctx,
  })

  if (data?.user) router.navigate({ to: '/' })

  return error
}

export async function loginFn(ctx: LoginForm) {
  const router = getRouter()
  const { data, error } = await authClient.signIn.email({
    ...ctx,
  })

  if (data?.user) router.navigate({ to: '/' })

  return error
}

export async function signoutFn() {
  const router = getRouter()
  const { error } = await authClient.signOut()

  if (error) return error

  router.navigate({ to: '/auth/login' })
}

export const getSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const headers = getRequestHeaders()
    const session = await auth.api.getSession({ headers })

    if (!session) {
      return null
    }

    return session
  },
)
