<template>
  <button
    class="workspace-btn"
    :class="{ 'is-open': isOpen }"
    v-click-outside="handleClickOutside"
    @click="toggleOpen"
  >
    <div class="icon-wrap">
      <img
        :src="activeWorkspace?.icon"
        alt="workspace-icon"
        class="inner-img"
      />
    </div>

    <p class="workspace-name h8_md">{{ activeWorkspace?.name }}</p>

    <UIcon name="line-md:chevron-down" class="chevron" />

    <div class="dropdown-menu">
      <button
        v-for="item of workspaces"
        :key="item.id"
        class="menu-item h8_md"
        :class="{ 'is-active': activeWorkspaceId === item.id }"
        @click.stop="handleSelectWorkspace(item.id)"
      >
        <img :src="item.icon" alt="workspace-icon" class="icon" />
        <span>{{ item.name }}</span>

        <UIcon name="material-symbols:check" class="check" />
      </button>

      <div class="wrap-create-workspace">
        <UButton
          icon="i-lucide:plus"
          :ui="{
            base: 'w-full h8_md bg-transparent h-[2rem] text-[var(--c-base-1000--50)] gap-[0.5rem] !px-[.75rem] hover:bg-[var(--c-base-1000--5)] active:bg-[var(--c-base-1000--10)]',
            leadingIcon: 'w-[1rem] h-[1rem]',
          }"
        >
          New workspace
        </UButton>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import type { WorkspaceItemPreview } from "~~/shared"

const workspaces = ref<WorkspaceItemPreview[]>([
  {
    id: 1,
    name: "The First The Last",
    icon: "/images/common/workspace.svg",
  },
  {
    id: 2,
    name: "Coeval",
    icon: "/images/common/coeval.png",
  },
])
const activeWorkspaceId = ref(1)
const activeWorkspace = computed(() => {
  return workspaces.value.find((item) => item.id === activeWorkspaceId.value)
})

const isOpen = ref(false)

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const handleClickOutside = () => {
  if (!isOpen.value) return

  isOpen.value = false
}

const handleSelectWorkspace = (id: number) => {
  activeWorkspaceId.value = id

  isOpen.value = false
}
</script>

<style scoped lang="scss">
.wrap-create-workspace {
  position: relative;
  width: 100%;
  padding-top: 1rem;

  &::before {
    content: "";
    position: absolute;
    top: 0.5rem;
    left: -0.5rem;
    width: calc(100% + 1rem);
    height: 1px;
    background-color: var(--c-base-1000--10);
  }
}
.check {
  position: absolute;
  right: 0.25rem;
  width: 1rem;
  height: 1rem;
  opacity: 0;
  visibility: hidden;
  color: var(--c-base-1000);
}
.icon {
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  overflow: hidden;
}
.menu-item.is-active .check {
  opacity: 1;
  visibility: visible;
}
.menu-item {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s var(--ease-default);

  @include hover() {
    &:hover {
      background-color: var(--c-base-1000--5);
    }
  }

  &:active {
    background-color: var(--c-base-1000--10);
  }
}
.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  width: 100%;
  padding: 0.5rem;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-1rem);
  transition: all 0.3s var(--ease-default);
  border-radius: 1rem;
  border: 1px solid var(--c-base-1000--5);
  background: var(--c-base-0);
  box-shadow: 0 55px 16px 0 rgba(0, 0, 0, 0), 0 35px 14px 0 rgba(0, 0, 0, 0.01),
    0 20px 12px 0 rgba(0, 0, 0, 0.03), 0 9px 9px 0 rgba(0, 0, 0, 0.05),
    0 2px 5px 0 rgba(0, 0, 0, 0.06);
}

.workspace-name {
  flex: 1;
  margin: 0 0.5rem 0 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
.chevron {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s var(--ease-default);
}
.icon-wrap {
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.25rem;
  overflow: hidden;
}
.workspace-btn.is-open {
  background-color: var(--c-base-1000--5);

  .chevron {
    transform: rotate(180deg);
  }
  .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}
.workspace-btn {
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  transition: background-color 0.2s var(--ease-default);
  z-index: 1;

  @include hover() {
    &:hover {
      background-color: var(--c-base-1000--5);
    }
  }
}
</style>
