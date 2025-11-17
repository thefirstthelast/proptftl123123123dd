<template>
  <div
    class="wrapper confirm-email-code"
    :style="{ '--count-of-code-inputs': COUNT_OF_CODE_INPUTS }"
  >
    <p class="h5_sb">Confirm your email address</p>
    <p class="subtitle h8">We have sent a code to {{ email }}</p>

    <form class="form" @submit.stop.prevent="onSubmit">
      <p class="h9_md label">Enter code <span class="required">*</span></p>

      <div class="code-inputs">
        <label class="code-input" v-for="i in COUNT_OF_CODE_INPUTS" :key="i">
          <input
            type="text"
            :maxlength="1"
            name="code"
            class="focus:outline-none focus:ring-0"
            :data-index="i - 1"
            @input="($event) => handleInputCode($event, i - 1)"
            @keydown="($event) => handleKeyDown($event, i - 1)"
          />
        </label>
      </div>

      <UButton
        type="submit"
        class="submit default-btn h8_sb default-hover"
        :disabled="processing"
        :ui="{
          base: 'focus-visible:outline-[#17314a] focus-visible:outline-1',
        }"
      >
        Confirm
      </UButton>
    </form>

    <button
      class="resend-code-btn default-btn h8_md default-hover focus-visible:outline-[#17314a] focus-visible:outline-1"
      :disabled="processing"
      @click="handleResendCode"
    >
      Resend the code
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ResendVerifyEmailResponse, VerifyEmailResponse } from "~~/shared"

interface Props {
  email: string
}

const COUNT_OF_CODE_INPUTS = 6

const router = useRouter()
const props = defineProps<Props>()
const state = ref<string[]>([])
const toast = useToast()
const processing = ref(false)
const emits = defineEmits<{
  (e: "submit"): void
}>()
state.value = Array.from({ length: COUNT_OF_CODE_INPUTS }, () => "")
const csrf = useCookie<string>("XSRF-TOKEN")
const { api_url } = useRuntimeConfig().public

const onSubmit = async () => {
  if (state.value.some((value) => value.length === 0) || processing.value)
    return

  try {
    processing.value = true

    await $fetch<VerifyEmailResponse>(api_url + apiPaths.emailVerify, {
      method: "POST",
      body: {
        email: props.email,
        code: state.value.join(""),
      },
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrf.value,
      },
    })

    emits("submit")

    await router.push({
      path: "/sign-in",
    })

    toast.add({
      title: "Your account was created successfully!",
      description: "Please sign in to continue.",
      duration: 5000,
      progress: false,
      icon: "material-symbols:info-outline",
    })
  } catch (error: any) {
    if (error.statusCode === 422) {
      toast.add({
        title: "Error confirming email",
        description: error.data.message,
        duration: 5000,
        progress: false,
        icon: "material-symbols:info-outline",
        color: "error",
      })
    }
  } finally {
    processing.value = false
  }
}

const handleKeyDown = (event: KeyboardEvent, index: number) => {
  const target = event.target as HTMLInputElement

  if (event.key === "Backspace" && target.value.length === 0 && index > 0) {
    const prevInput = document.querySelector<HTMLInputElement>(
      `.confirm-email-code input[data-index="${index - 1}"]`
    )

    if (prevInput) {
      prevInput.focus()
    }
  }
}

const handleInputCode = (event: InputEvent, index: number) => {
  const target = event.target as HTMLInputElement
  const newValue = target.value.replace(/\s/g, "")

  if (state.value[index]?.length && newValue.length === 0) {
    state.value[index] = ""

    return
  }

  state.value[index] = newValue

  // move to the next input
  if (index < COUNT_OF_CODE_INPUTS - 1 && newValue.length > 0) {
    const nextInput = document.querySelector<HTMLInputElement>(
      `.confirm-email-code input[data-index="${index + 1}"]`
    )

    if (nextInput) {
      nextInput.focus()
    }
  }
}

const handlePasteCode = (event: ClipboardEvent) => {
  const clipboardData = event.clipboardData
  const data = clipboardData?.getData("text")

  if (!data) return

  const codeInputs = document.querySelectorAll<HTMLInputElement>(
    ".confirm-email-code .code-input input"
  )
  const values = data
    .slice(0, COUNT_OF_CODE_INPUTS)
    .replace(/\s/g, "")
    .split("")

  if (values.length !== COUNT_OF_CODE_INPUTS) return

  codeInputs.forEach((input, index) => {
    input.value = values[index] ?? ""
    state.value[index] = values[index] ?? ""

    if (index === COUNT_OF_CODE_INPUTS - 1) {
      input.focus()
    }
  })
}

const handleResendCode = async () => {
  try {
    processing.value = true

    const resendCodeResponse = await $fetch<ResendVerifyEmailResponse>(
      api_url + apiPaths.resendEmailVerify,
      {
        method: "POST",
        body: {
          email: props.email,
        },
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": csrf.value,
        },
      }
    )

    toast.add({
      title: "Code resent",
      description: resendCodeResponse.message,
      duration: 5000,
      progress: false,
      icon: "material-symbols:info-outline",
      color: "error",
    })
  } catch (error) {
    console.log(error)
  } finally {
    processing.value = false
  }
}

onMounted(() => {
  document.addEventListener("paste", handlePasteCode)
})

onUnmounted(() => {
  document.removeEventListener("paste", handlePasteCode)
})
</script>

<style scoped lang="scss">
.resend-code-btn {
  --btn-text: var(--c-base-1000--50);
  --btn-bg: transparent;

  margin-top: 0.5rem;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
.form:deep(.submit) {
  justify-content: center;
  margin-top: 1rem;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
.code-input input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
}
.code-input {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  background-color: var(--c-base-1000--5);

  &:focus-within {
    border-color: var(--c-base-1000);
  }
}
.code-inputs {
  width: 100%;
  height: 2.5rem;
  display: grid;
  grid-template-columns: repeat(var(--count-of-code-inputs), 1fr);
  gap: 0.25rem;
}
.label {
  padding: 0.5rem 0;
}
.required {
  color: var(--c-add-error-500);
}
.form {
  text-align: left;
  margin-top: 2rem;
}
.subtitle {
  margin-top: 0.5rem;
  color: var(--c-base-1000--50);
}
.wrapper {
  width: 25rem;
  text-align: center;
}
</style>
