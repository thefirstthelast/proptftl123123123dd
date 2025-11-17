<template>
  <button class="btn h8_sb default-hover">
    <img src="/icons/apple.svg" alt="Apple icon" class="icon" />
    <span>Continue with Apple</span>
  </button>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.icon {
  width: 1rem;
  height: 1rem;
  object-fit: cover;
}
.btn {
  width: 100%;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3rem;
  border: 1px solid var(--c-base-1000--10);
  gap: 0.5rem;
}
</style>
