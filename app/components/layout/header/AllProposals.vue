<template>
  <div class="all-proposals">
    <p class="h6_md">All proposals</p>

    <div class="btns-wrapper">
      <UButton
        icon="i-lucide:sparkles"
        :ui="{
          base: 'mt-[0.25rem] h8_md bg-transparent h-[2rem] border border-[var(--c-base-1000--10)] text-[var(--c-base-1000--50)] gap-[0.5rem] !pl-[0.5rem] !pr-[.75rem] hover:bg-[var(--c-base-1000--5)] active:bg-[var(--c-base-1000--10)]',
          leadingIcon: 'w-[1rem] h-[1rem]',
        }"
      >
        Customize
      </UButton>
      <UButton
        icon="i-lucide:plus"
        :ui="{
          base: 'mt-[0.25rem] h8_md bg-transparent h-[2rem] text-[var(--c-base-0)] gap-[0.5rem] !pl-[0.5rem] !pr-[.75rem] bg-[var(--c-brand-500)] hover:bg-unset hover:opacity-80 active:bg-transparent',
          leadingIcon: 'w-[1rem] h-[1rem]',
        }"
      >
        Create proposal
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.all-proposals {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  padding: 0 1rem 0 1.5rem;
  background: var(--c-base-0);
}
.btns-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
