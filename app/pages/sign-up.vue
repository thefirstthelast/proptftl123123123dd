<template>
  <main class="sign-up">
    <div class="form-content">
      <PageSignUpFirstPart
        :state="state"
        :schema="schema"
        :loading="isSubmitting"
        @submit="onSubmit"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui"
import * as z from "zod"

definePageMeta({
  middleware: "protect-sign",
})

const schema = z
  .object({
    email: z.email("Invalid email"),
    password: z
      .string("Password is required")
      .refine(
        (val) =>
          val.length >= 15 ||
          (val.length >= 8 && /[a-z]/.test(val) && /[0-9]/.test(val)),
        {
          message:
            "Password must be at least 15 characters, OR at least 8 characters with a number and a lowercase letter",
        }
      ),
    confirm: z
      .string("Password is required")
      .refine(
        (val) =>
          val.length >= 15 ||
          (val.length >= 8 && /[a-z]/.test(val) && /[0-9]/.test(val)),
        {
          message:
            "Password must be at least 15 characters, OR at least 8 characters with a number and a lowercase letter",
        }
      ),
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  })

type Schema = z.output<typeof schema>

const auth = useAuth()
const toast = useToast()
const state = reactive<Schema>({
  email: "",
  password: "",
  confirm: "",
})
const isSubmitting = ref(false)

const onSubmit = async (_event: FormSubmitEvent<Schema>) => {
  if (isSubmitting.value) return

  try {
    isSubmitting.value = true

    await auth.register({
      email: state.email,
      password: state.password,
      password_confirmation: state.confirm,
    })

    toast.add({
      title: "Account created",
      description: "Welcome to Propozly!",
      duration: 5000,
      icon: "i-lucide-check",
    })

    await navigateTo("/dashboard")
  } catch (error) {
    toast.add({
      title: "Unable to sign up",
      description: error instanceof Error ? error.message : "Please try again.",
      color: "red",
      duration: 5000,
      icon: "i-lucide-alert-triangle",
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped lang="scss">
.form-content {
  color: var(--c-base-1000);
  padding: 4rem 2rem 2rem;
  border-radius: 2rem;
  background-color: var(--c-base-0);
}
.sign-up {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(0deg, #0a0f22 0%, #0a0f22 100%), #212c6a;
  background-image: url("/images/bg/sign-in.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: var(--c-white);
}
</style>
