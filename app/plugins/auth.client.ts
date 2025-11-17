export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:created", () => {
    return nuxtApp.runWithContext(async () => {
      const auth = useAuth()

      await auth.ensureUser()
    })
  })
})

