import type { State, User } from "~~/shared"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const firstLoad = useState<boolean>("first-load")
  const csrf = useCookie<string>("XSRF-TOKEN")
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase || config.public.api_url || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000')
  const appState = useState<State>("app-state", () => ({
    user: null,
  }))

  if (appState.value?.user || firstLoad?.value === false) {
    firstLoad.value = true
    return true
  }

  try {
    // Get CSRF cookie
    const csrfUrl = apiBase ? `${apiBase}/sanctum/csrf-cookie` : "/sanctum/csrf-cookie"
    await $fetch(csrfUrl, {
      credentials: "include",
    })

    // Get user
    const userUrl = apiBase ? `${apiBase}/api/auth/user` : "/api/auth/user"
    const userResponse = await $fetch<{ user: User }>(userUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrf.value || "",
      },
    })

    appState.value.user = userResponse.user
  } catch (error) {
    // User is not authenticated
    appState.value.user = null
  } finally {
    firstLoad.value = true
  }
})
