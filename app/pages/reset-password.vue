<template>
  <main class="reset-password">
    <div class="content-wrapper">
      <template v-if="email && token">
        <PageResetPasswordSetNew
          :email="String(email)"
          :token="String(token)"
        />
      </template>
      <template v-else>
        <Transition name="fade" mode="out-in">
          <PageResetPasswordMainPart v-if="step === 1" @next="step = 2" />
          <PageResetPasswordCheckEmail v-else />
        </Transition>
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "protect-sign",
})

const route = useRoute()
const token = route.query.token
const email = route.query.email
const step = ref(1)
</script>

<style scoped lang="scss">
.content-wrapper {
  position: relative;
  width: 29rem;
  color: var(--c-base-1000);
  padding: 4rem 2rem 2rem;
  border-radius: 2rem;
  background-color: var(--c-base-0);
}
.reset-password {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(0deg, #0a0f22 0%, #0a0f22 100%), #212c6a;
  background-image: url("/images/bg/sign-in.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: var(--c-white);
  overflow: hidden;
}
</style>
