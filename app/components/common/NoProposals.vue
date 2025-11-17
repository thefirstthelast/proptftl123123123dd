<template>
  <div class="no-proposals">
    <div class="diagram" />

    <p class="h8_md">No proposals available</p>
    <p class="h8 mt-[.25rem]! text-(--c-base-1000--50)">
      List of proposals you've created to will appear here.
    </p>

    <UButton
      icon="i-lucide:plus"
      :ui="{
        base: 'mt-[1.5rem]! h8_md bg-transparent h-[2rem] text-[var(--c-base-0)] gap-[0.5rem] !pl-[0.5rem] !pr-[.75rem] bg-[var(--c-brand-500)] hover:bg-unset hover:opacity-80 active:bg-transparent',
        leadingIcon: 'w-[1rem] h-[1rem]',
      }"
      @click="showProposalsTable = true"
    >
      Create proposal
    </UButton>
  </div>
</template>

<script setup lang="ts">
const showProposalsTable = useState<boolean>("show-proposals-table")
</script>

<style scoped lang="scss">
.diagram {
  width: 100%;
  height: 14rem;
  background-image: url("/images/common/diagram.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.no-proposals {
  width: 27.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
