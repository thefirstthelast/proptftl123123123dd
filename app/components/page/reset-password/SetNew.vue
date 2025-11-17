<template>
  <div class="wrapper">
    <p class="h5_sb">Set a new password</p>
    <p class="description h8">
      Make sure it's at least 15 characters OR at least 8 characters including a
      number and a lowercase letter.
    </p>

    <UForm
      :schema="schema"
      :state="state"
      class="form"
      @submit.prevent="onSubmit"
    >
      <UFormField
        label="Password"
        required
        name="password"
        class="form-field h9_md"
      >
        <UInput
          v-model="state.password"
          :type="showState.password ? 'text' : 'password'"
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
              :icon="showState.password ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              aria-label="Eye icon"
              @click="showState.password = !showState.password"
            />
          </template>
        </UInput>
      </UFormField>

      <UFormField
        label="Confirm password"
        required
        name="confirm"
        class="form-field h9_md"
      >
        <UInput
          v-model="state.confirm"
          :type="showState.confirmPassword ? 'text' : 'password'"
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
              :icon="
                showState.confirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'
              "
              aria-label="Eye icon"
              @click="showState.confirmPassword = !showState.confirmPassword"
            />
          </template>
        </UInput>
      </UFormField>

      <UButton
        type="submit"
        class="submit default-btn h8_sb default-hover"
        :ui="{
          base: 'focus-visible:outline-[#17314a] focus-visible:outline-1',
        }"
      >
        Create account
      </UButton>
    </UForm>

    <NuxtLink
      to="/sign-in"
      class="return-login default-btn h8_md default-hover focus-visible:outline-1"
    >
      Return to log in
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui"
import * as z from "zod"

interface Props {
  email: string
  token: string
}

const props = defineProps<Props>()
const schema = z
  .object({
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
const toast = useToast()
const processing = ref(false)
const csrf = useCookie<string>("XSRF-TOKEN")
const { api_url } = useRuntimeConfig().public
const state = reactive<Schema>({
  password: "",
  confirm: "",
})
const showState = reactive({
  password: false,
  confirmPassword: false,
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    processing.value = true

    await $fetch(api_url + apiPaths.resetPassword, {
      method: "POST",
      body: {
        email: props.email,
        token: props.token,
        password: event.data.password,
        password_confirmation: event.data.confirm,
      },
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrf.value,
      },
    })

    await navigateTo("/sign-in")

    toast.add({
      title: "New password set successfully!",
      description: "Try to log in.",
      duration: 5000,
      progress: false,
      icon: "material-symbols:info-outline",
    })
  } catch (error: any) {
    toast.add({
      title: "Error setting new password",
      description: error.data.message,
      duration: 5000,
      progress: false,
      icon: "material-symbols:info-outline",
      color: "error",
    })
  } finally {
    processing.value = false
  }
}
</script>

<style scoped lang="scss">
.return-login {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  --btn-text: var(--c-base-1000--50);
  --btn-bg: transparent;
}
.form:deep(.submit) {
  justify-content: center;
  margin-top: 0.5rem;
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
.form {
  margin-top: 2rem;
}
.form-field {
  width: 25rem;

  &:deep(> div) {
    margin-bottom: 0.5rem;
  }

  &:deep(.text-default) {
    color: var(--c-base-1000);
  }

  &:deep(.text-error) {
    display: none;
  }

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
}
.description {
  width: 19rem;
  padding: 0 0.5rem;
  margin-top: 0.5rem;
  text-align: center;
  color: var(--c-base-1000--50);
}
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
