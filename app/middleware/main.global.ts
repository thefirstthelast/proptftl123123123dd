import type { State, User } from "~~/shared"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const firstLoad = useState<boolean>("first-load")
  const csrf = useCookie<string>("XSRF-TOKEN")
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase || config.public.api_url || "http://localhost:8000"
  const appState = useState<State>("app-state", () => ({
    user: null,
  }))

  if (appState.value?.user || firstLoad?.value === false) {
    firstLoad.value = true
    return true
  }

  try {
    // Get CSRF cookie
    await $fetch(apiBase + "/sanctum/csrf-cookie")

    // Get user
    const userResponse = await $fetch<{ user: User }>(apiBase + "/api/auth/user", {
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
