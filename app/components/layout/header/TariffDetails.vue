<template>
  <div class="tariff-details">
    <!-- <div class="progress-circle" /> -->
    <div class="wrap-progress">
      <CommonProgressCircle :progress="progress" />
    </div>

    <div class="tariff-details-info">
      <div class="flex align-center gap-[.5rem]">
        <p class="h8_md">24 / 50</p>
        <p class="label h10_md">Pro</p>
      </div>
      <p class="h8 text-(--c-base-1000--50)">15 days left</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const progress = ref(0)

const initAnimation = () => {
  setTimeout(() => {
    progress.value = 47
  }, 100)
}

onMounted(() => {
  initAnimation()
})
</script>

<style scoped lang="scss">
.wrap-progress {
  width: 2.5rem;
  height: 2.5rem;
}
.tariff-details {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  padding-left: 0.75rem;
  background: var(--c-base-0);
}
.tariff-details-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.progress-circle {
}
</style>
