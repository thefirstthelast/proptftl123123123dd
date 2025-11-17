<template>
  <div class="dashboard flex flex-col items-center justify-center">
    <ProposalsTable v-if="showProposalsTable" />
    <CommonNoProposals v-else />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "dashboard",
})

const showProposalsTable = useState<boolean>("show-proposals-table", () => false)
</script>

<style scoped lang="scss">
.dashboard {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
