import { FetchError } from "ofetch"

type User = {
  id: number
  name: string | null
  email: string
}

type LoginPayload = {
  email: string
  password: string
}

type RegisterPayload = {
  email: string
  password: string
  password_confirmation: string
  name?: string | null
}

const parseErrorMessage = (error: unknown): string => {
  if (error instanceof FetchError) {
    const data = error.data as Record<string, unknown> | undefined

    const errors = data && ("errors" in data ? (data.errors as Record<string, string[]>) : null)
    if (errors) {
      return Object.values(errors).flat().join(" ")
    }

    if (data && typeof data.message === "string") {
      return data.message
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return "Something went wrong. Please try again."
}

export const useAuth = () => {
  const config = useRuntimeConfig()
  const user = useState<User | null>("auth:user", () => null)
  const isFetchingUser = useState<boolean>("auth:isFetchingUser", () => false)
  const isReady = useState<boolean>("auth:isReady", () => false)
  const xsrfToken = useCookie<string | null>("XSRF-TOKEN")

  const apiFetch = <T>(path: string, options: Parameters<typeof $fetch<T>>[1] = {}) => {
    const headers: Record<string, string> = {
      ...(options?.headers as Record<string, string> | undefined),
    }

    if (xsrfToken.value) {
      headers["X-XSRF-TOKEN"] = xsrfToken.value
    }

    return $fetch<T>(path, {
      baseURL: config.public.apiBase,
      credentials: "include",
      ...options,
      headers,
    })
  }

  const csrf = async () => {
    await apiFetch("/sanctum/csrf-cookie")
  }

  const fetchUser = async () => {
    if (isFetchingUser.value) return

    isFetchingUser.value = true
    try {
      const response = await apiFetch<{ user: User }>("/api/auth/user", {
        method: "GET",
      })

      user.value = response.user
    } catch {
      user.value = null
    } finally {
      isFetchingUser.value = false
      isReady.value = true
    }
  }

  const ensureUser = async () => {
    if (!isReady.value) {
      await fetchUser()
    }
  }

  const login = async (payload: LoginPayload) => {
    try {
      await csrf()
      await apiFetch<{ user: User }>("/api/auth/login", {
        method: "POST",
        body: payload,
      })

      await fetchUser()
    } catch (error) {
      throw new Error(parseErrorMessage(error))
    }
  }

  const register = async (payload: RegisterPayload) => {
    try {
      await csrf()
      await apiFetch<{ user: User }>("/api/auth/register", {
        method: "POST",
        body: payload,
      })

      await fetchUser()
    } catch (error) {
      throw new Error(parseErrorMessage(error))
    }
  }

  const logout = async () => {
    await csrf()
    await apiFetch("/api/auth/logout", {
      method: "POST",
    })

    user.value = null
  }

  const isLoggedIn = computed(() => Boolean(user.value))

  return {
    user,
    isLoggedIn,
    isReady,
    fetchUser,
    ensureUser,
    login,
    register,
    logout,
  }
}

