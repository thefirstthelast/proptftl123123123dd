<template>
  <div class="wrapper">
    <div class="wrap-top">
      <p class="h5">Sign up</p>
      <p class="h8">Create your free account</p>
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
          :type="showState.confirm ? 'text' : 'password'"
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
              :icon="showState.confirm ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              aria-label="Eye icon"
              @click="showState.confirm = !showState.confirm"
            />
          </template>
        </UInput>
      </UFormField>

      <UButton
        type="submit"
        class="submit default-btn h8_sb default-hover"
      :loading="props.loading"
        :ui="{
          base: 'focus-visible:outline-[#17314a] focus-visible:outline-1',
        }"
      >
        Create account
      </UButton>
    </UForm>

    <p class="terms p10">
      Signing up for a Propozly account means you agree to the
      <NuxtLink to="/" class="link default-hover">Privacy Policy</NuxtLink>
      <br />
      and
      <NuxtLink to="/" class="link default-hover"> Terms of Service </NuxtLink>
    </p>

    <div class="suggestion h8_md">
      <p>Already have an account?</p>

      <NuxtLink to="/sign-in" class="default-hover">Log in</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui"
import type { ZodType } from "zod"

type Schema = {
  email: string
  password: string
  confirm: string
}

interface Props {
  state: Schema
  schema: ZodType<Schema>
  loading?: boolean
}

const props = defineProps<Props>()
const emits = defineEmits<{
  (e: "submit", event: FormSubmitEvent<Schema>): void
}>()

const showState = reactive({
  password: false,
  confirm: false,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  emits("submit", event)
}
</script>

<style scoped lang="scss">
.wrapper {
  width: 25rem;
}
.link {
  display: inline-block;
  text-decoration: underline;
  text-underline-offset: 0.125rem;
  text-decoration-thickness: 0.0625rem;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-skip-ink: none;
}
.terms {
  margin-top: 1rem;
  text-align: center;
  color: var(--c-base-1000--50);
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
.wrap-top .h8 {
  margin-top: 0.5rem;
  color: var(--c-base-1000--50);
}
.wrap-top {
  text-align: center;
  margin-bottom: 2rem;
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
</style>
