<template>
  <div class="wrapper">
    <div class="circle-wrap">
      <div class="circle-icon" />
      <div class="circle-bg" />
    </div>

    <p class="h5_sb">Check your email</p>
    <p class="description h8">
      Check your email for a link to reset your password. If it doesn't appear
      within a few minutes, check your spam folder.
    </p>

    <NuxtLink
      to="/sign-in"
      class="default-btn h8_md default-hover focus-visible:outline-1"
    >
      Return to log in
    </NuxtLink>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.default-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}
.description {
  width: 19rem;
  margin-top: 0.5rem;
  text-align: center;
  color: var(--c-base-1000--50);
}
.circle-bg {
  position: absolute;
  top: 1.75rem;
  left: 0;
  width: 100%;
  height: 2rem;
  background-image: url("/icons/success-bg.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.circle-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--c-base-0);
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1.5rem;
    height: 1.5rem;
    background-image: url("/icons/success.svg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}
.circle-wrap {
  position: relative;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-bottom: 1.5rem;
}
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
