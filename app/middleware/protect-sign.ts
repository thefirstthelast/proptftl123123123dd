export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuth()

  await auth.ensureUser()

  if (auth.isLoggedIn.value) {
    return navigateTo("/dashboard")
  }
})
