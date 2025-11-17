<template>
  <main class="main main-container">
    <aside class="aside">
      <LayoutAsideWorkspaceBtn />

      <LayoutAsideContent />
    </aside>
    <section class="content-wrap">
      <header class="header">
        <LayoutHeaderAllProposals />

        <LayoutHeaderTariffDetails />

        <button class="avatar-wrapper" title="Logout" @click="logout">
          <img src="/images/common/avatar.png" alt="avatar" class="inner-img" />
        </button>
      </header>

      <div class="content">
        <slot />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { State } from "~~/shared"

const appState = useState<State>("app-state")
const csrf = useCookie<string>("XSRF-TOKEN")
const config = useRuntimeConfig()
// Используем значение из конфига, по умолчанию пустая строка (относительные пути)
const apiBase = config.public.apiBase || config.public.api_url || ''

const logout = async () => {
  appState.value.user = null

  try {
    await $fetch(apiBase + "/api/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrf.value || "",
      },
    })
  } catch (error) {
    console.error("Logout error: ", error)
  } finally {
    navigateTo("/sign-in")
  }
}
</script>

<style scoped lang="scss">
.avatar-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid var(--c-base-1000--10);
}
.content {
  flex: 1;
  width: 100%;
}
.header {
  position: relative;
  width: 100%;
  min-height: 4rem;
  display: grid;
  grid-template-columns: 1fr 13rem 4rem;
  gap: 1rem;
  z-index: 2;
}
.content-wrap {
  flex: 1;
  min-height: 100vh;
  height: 100%;
  overflow: auto;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  padding: 1.5rem;
  padding-bottom: 1rem;

  overscroll-behavior: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
.aside {
  position: relative;
  width: 14rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 1.5rem 1rem 1rem;
}
.main {
  flex: 1;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  background-color: var(--c-gray);
}
</style>
