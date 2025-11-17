<template>
  <div class="first-part">
    <p class="h5_sb">Reset your password</p>
    <p class="description h8">
      Enter your user account's verified email address and we will send you a
      password reset link.
    </p>

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

      <UButton
        type="submit"
        class="submit default-btn h8_sb default-hover"
        :disabled="processing"
        :ui="{
          base: 'focus-visible:outline-1 focus-visible:outline-[#17314a]',
        }"
      >
        Send password reset email
      </UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import * as z from "zod"
import type { FormSubmitEvent } from "@nuxt/ui"

const schema = z.object({
  email: z.email("Invalid email"),
})
type Schema = z.output<typeof schema>

const toast = useToast()
const processing = ref(false)
const csrf = useCookie<string>("XSRF-TOKEN")
const { api_url } = useRuntimeConfig().public
const state = reactive<Schema>({
  email: "",
})
const emits = defineEmits<{
  (e: "next"): void
}>()

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  if (processing.value) return

  try {
    processing.value = true

    await $fetch(api_url + apiPaths.forgotPassword, {
      method: "POST",
      body: {
        email: event.data.email,
      },
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrf.value,
      },
    })

    emits("next")
  } catch (error: any) {
    toast.add({
      title: "Error sending password reset email",
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
.form {
  margin-top: 2rem;
}
.form:deep(.submit) {
  margin-top: 0.5rem;
  justify-content: center;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
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
.first-part {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.description {
  width: 19rem;
  text-align: center;
  margin-top: 0.5rem;
  color: var(--c-base-1000--50);
}
</style>
