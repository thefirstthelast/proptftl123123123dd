<template>
  <div class="aside-content">
    <div>
      <UButton
        icon="i-lucide:home"
        :ui="{
          base: 'w-full h8_md bg-transparent h-[2.5rem] text-[var(--c-base-1000)] gap-[0.5rem] !px-[.75rem] hover:bg-[var(--c-base-1000--5)] active:bg-[var(--c-base-1000--10)]',
          leadingIcon: 'w-[1rem] h-[1rem]',
        }"
      >
        All proposals
      </UButton>

      <UButton
        icon="i-lucide:plus"
        :ui="{
          base: 'w-full mt-[0.25rem] h8_md bg-transparent h-[2.5rem] text-[var(--c-brand-500)] gap-[0.5rem] !px-[.75rem] hover:bg-[var(--c-base-1000--5)] active:bg-[var(--c-base-1000--10)]',
          leadingIcon: 'w-[1rem] h-[1rem]',
        }"
      >
        Create proposal
      </UButton>

      <div class="mt-4!">
        <UButton
          icon="i-lucide:building-2"
          :ui="{
            base: 'w-full h8_md bg-transparent h-[2.5rem] text-[var(--c-base-1000--50)] gap-[0.5rem] !px-[.75rem] hover:bg-[var(--c-base-1000--5)] active:bg-[var(--c-base-1000--10)]',
            leadingIcon: 'w-[1rem] h-[1rem]',
          }"
        >
          Cases
        </UButton>
        <UButton
          icon="i-lucide:user-round"
          :ui="{
            base: 'w-full h8_md bg-transparent h-[2.5rem] text-[var(--c-base-1000--50)] gap-[0.5rem] !px-[.75rem] hover:bg-[var(--c-base-1000--5)] active:bg-[var(--c-base-1000--10)]',
            leadingIcon: 'w-[1rem] h-[1rem]',
          }"
        >
          Members
        </UButton>
        <UButton
          icon="i-lucide:trophy"
          :ui="{
            base: 'w-full h8_md bg-transparent h-[2.5rem] text-[var(--c-base-1000--50)] gap-[0.5rem] !px-[.75rem] hover:bg-[var(--c-base-1000--5)] active:bg-[var(--c-base-1000--10)]',
            leadingIcon: 'w-[1rem] h-[1rem]',
          }"
        >
          Awards
        </UButton>
        <UButton
          icon="i-lucide:message-square-quote"
          :ui="{
            base: 'w-full h8_md bg-transparent h-[2.5rem] text-[var(--c-base-1000--50)] gap-[0.5rem] !px-[.75rem] hover:bg-[var(--c-base-1000--5)] active:bg-[var(--c-base-1000--10)]',
            leadingIcon: 'w-[1rem] h-[1rem]',
          }"
        >
          Testimonials
        </UButton>
        <UButton
          icon="i-lucide:heart-handshake"
          :ui="{
            base: 'w-full h8_md bg-transparent h-[2.5rem] text-[var(--c-base-1000--50)] gap-[0.5rem] !px-[.75rem] hover:bg-[var(--c-base-1000--5)] active:bg-[var(--c-base-1000--10)]',
            leadingIcon: 'w-[1rem] h-[1rem]',
          }"
        >
          Partners
        </UButton>
      </div>
    </div>

    <div>
      <UButton
        icon="i-lucide:circle-fading-arrow-up"
        :ui="{
          base: 'w-full h8_md bg-transparent h-[2.5rem] text-[var(--c-base-1000--50)] gap-[0.5rem] !px-[.75rem] hover:bg-[var(--c-base-1000--5)] active:bg-[var(--c-base-1000--10)]',
          leadingIcon: 'w-[1rem] h-[1rem]',
        }"
      >
        Plans
      </UButton>
      <UButton
        icon="i-lucide:bell"
        :ui="{
          base: 'w-full h8_md bg-transparent h-[2.5rem] text-[var(--c-base-1000--50)] gap-[0.5rem] !px-[.75rem] hover:bg-[var(--c-base-1000--5)] active:bg-[var(--c-base-1000--10)]',
          leadingIcon: 'w-[1rem] h-[1rem]',
        }"
      >
        Notifications

        <template #trailing>
          <div class="notif-counter h9_md">3</div>
        </template>
      </UButton>
      <UButton
        icon="i-lucide:settings"
        :ui="{
          base: 'w-full h8_md bg-transparent h-[2.5rem] text-[var(--c-base-1000--50)] gap-[0.5rem] !px-[.75rem] hover:bg-[var(--c-base-1000--5)] active:bg-[var(--c-base-1000--10)]',
          leadingIcon: 'w-[1rem] h-[1rem]',
        }"
      >
        Settings
      </UButton>
      <UButton
        icon="i-lucide:life-buoy"
        :ui="{
          base: 'w-full h8_md bg-transparent h-[2.5rem] text-[var(--c-base-1000--50)] gap-[0.5rem] !px-[.75rem] hover:bg-[var(--c-base-1000--5)] active:bg-[var(--c-base-1000--10)]',
          leadingIcon: 'w-[1rem] h-[1rem]',
        }"
      >
        Help
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.notif-counter {
  width: 1.25rem;
  padding: 0.1875rem 0.375rem 0.125rem 0.375rem;
  border-radius: 0.25rem;
  color: var(--c-base-0);
  background-color: var(--c-brand-500);
}
.aside-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 1.5rem;
}
</style>
