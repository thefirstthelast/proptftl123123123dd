<template>
  <div class="progress-circle">
    <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90 object-cover">
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke="#f1f2f5"
        stroke-width="12"
        fill="none"
      />

      <circle
        cx="50"
        cy="50"
        r="44"
        stroke="var(--c-brand-500)"
        stroke-width="12"
        fill="none"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
        class="transition-[stroke-dashoffset] duration-500 ease-in-out"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  progress: { type: Number, default: 0 },
})

const radius = 44
const circumference = 2 * Math.PI * radius
const offset = computed(
  () => circumference - (props.progress / 100) * circumference
)
</script>

<style scoped>
.progress-circle {
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
