<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
useState("show-proposals-table", () => false)
const firstLoad = useState<boolean>("first-load", () => true)

onMounted(() => {
  firstLoad.value = false
})
</script>
