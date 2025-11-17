<template>
  <main class="sign-in">
    <div class="form-wrapper">
      <div class="wrap-top">
        <p class="h5">Log in</p>
        <p class="h8">Enter your account</p>
      </div>

      <div class="another-login">
        <ButtonContinueGoogle />
        <ButtonContinueApple />

        <div class="or h9">
          <span>or</span>
        </div>
      </div>

      <UForm
        :schema="schema"
        :state="state"
        class="form"
        @submit.prevent="onSubmit"
      >
        <UFormField
          label="Email address"
          required
          name="email"
          class="form-field h9_md"
        >
          <UInput
            v-model="state.email"
            class="input"
            :ui="{
              base: 'ring-transparent focus-visible:ring-1 focus-visible:ring-[#17314a]',
            }"
          />
        </UFormField>

        <UFormField
          label="Password"
          name="password"
          required
          class="form-field h9_md"
        >
          <UInput
            v-model="state.password"
            :type="showPassword ? 'text' : 'password'"
            class="input"
            show-password-on="click"
            :ui="{
              base: 'ring-transparent focus-visible:ring-1 focus-visible:ring-[#17314a]',
              trailing: 'right-[.75rem]',
            }"
          >
            <template #trailing>
              <UButton
                color="neutral"
                size="sm"
                class="icon-eye default-hover"
                :ui="{
                  base: 'focus-visible:ring-[#17314a] focus-visible:ring-1',
                }"
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                aria-label="Eye icon"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormField>

        <UButton
          type="submit"
          class="submit default-btn h8_sb default-hover"
        :loading="isSubmitting"
          :ui="{
            base: 'focus-visible:outline-1 focus-visible:outline-[#17314a]',
          }"
        >
          Submit
        </UButton>
      </UForm>

      <NuxtLink
        to="/reset-password"
        class="forgot-btn default-btn h8_md default-hover focus-visible:outline-1"
      >
        Forgot password?
      </NuxtLink>

      <div class="suggestion h8_md">
        <p>New on Propozly?</p>

        <NuxtLink to="/sign-up" class="default-hover focus-visible:outline-1">
          Create an Account
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import * as z from "zod"
import type { FormSubmitEvent } from "@nuxt/ui"

definePageMeta({
  middleware: "protect-sign",
})

const schema = z.object({
  email: z.email("Invalid email"),
  password: z
    .string("Password is required")
    .min(8, "Must be at least 8 characters"),
})

type Schema = z.output<typeof schema>

const toast = useToast()
const auth = useAuth()
const state = reactive<Schema>({
  email: "",
  password: "",
})
const showPassword = ref(false)
const isSubmitting = ref(false)

async function onSubmit(_event: FormSubmitEvent<Schema>) {
  if (isSubmitting.value) return

  try {
    isSubmitting.value = true
    await auth.login({
      email: state.email,
      password: state.password,
    })

    toast.add({
      title: "Welcome back!",
      description: "You have successfully signed in.",
      duration: 4000,
      icon: "i-lucide-check",
    })

    await navigateTo("/dashboard")
  } catch (error) {
    toast.add({
      title: "Unable to sign in",
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
.icon-eye {
  color: transparent;
}
.or {
  position: relative;
  margin-top: 1.125rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--c-base-1000--50);

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    display: block;
    width: 47%;
    height: 1px;
    transform: translateY(-50%);
    background-color: var(--c-base-1000--10);
  }
  &::before {
    left: 0;
  }
  &::after {
    right: 0;
  }
}
.another-login {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.suggestion a {
  color: var(--c-brand-500);
}
.suggestion p {
  color: var(--c-base-1000--50);
}
.suggestion {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}
.forgot-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  --btn-text: var(--c-base-1000--50);
  --btn-bg: transparent;
}
.wrap-top .h8 {
  margin-top: 0.5rem;
  color: var(--c-base-1000--50);
}
.wrap-top {
  text-align: center;
  margin-bottom: 2rem;
}
.form:deep(.submit) {
  margin-top: 0.5rem;
  justify-content: center;
}
.input {
  &:deep(.icon-eye span) {
    color: var(--c-base-1000);
  }
  &:deep(input) {
    width: 100%;
    height: 2.5rem;
    padding-left: 0.5rem;
    border-radius: 0.5rem;
    background-color: var(--c-base-1000--5);
    color: var(--c-base-1000);
  }
}
.form:deep(.text-error) {
  color: var(--c-add-error-500);
}
.form-field {
  width: 25rem;

  &:deep(.text-error) {
    display: none;
  }
  &:deep(> div) {
    margin-bottom: 0.5rem;
  }
  &:deep(.text-default) {
    color: var(--c-base-1000);
  }
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
}
.form-wrapper {
  width: 29rem;
  color: var(--c-base-1000);
  padding: 4rem 2rem 2rem;
  border-radius: 2rem;
  background-color: var(--c-base-0);
}
.sign-in {
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
