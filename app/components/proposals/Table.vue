<template>
  <div class="wrap-table">
    <div class="header">
      <div class="header-content">
        <div id="filter-tabs" class="tabs">
          <button
            v-for="tab in filterTabs"
            :key="tab.value"
            class="btn-tab h8_md"
            :data-value="tab.value"
            :class="{ 'is-active': tab.isActive }"
            @click="handleFilter(tab.value as FilterField)"
          >
            <span>{{ tab.label }}</span>
          </button>

          <div id="highlight-filter" class="highlight-filter" />
        </div>

        <div class="flex gap-2">
          <UInput
            icon="i-lucide:search"
            variant="outline"
            placeholder="Search..."
            :ui="{
              base: 'w-48 h8_md bg-transparent pl-9! h-8 hover:bg-transparent placeholder:text-(--c-base-1000--50)! active:bg-transparent border-1 border-(--c-base-1000--10) ring-0 text-(--c-base-1000)! focus:ring-0! focus:border-(--c-base-1000)!',
              leadingIcon: 'w-4 h-4 left-3! text-(--c-base-1000--50)!',
              leading: 'left-3! pointer-events-none',
            }"
          />

          <UButton
            icon="i-lucide:list-filter"
            :ui="{
              base: 'w-full h8_md bg-transparent h-8 text-[var(--c-base-1000--50)] gap-[0.5rem] !p-2 hover:bg-[var(--c-base-1000--5)] active:bg-[var(--c-base-1000--10)] border-1 border-(--c-base-1000--10) focus-visible:none focus-visible:outline-none focus-visible:border-(--c-base-1000)',
              leadingIcon: 'w-3 h-3',
            }"
          >
            Filter
          </UButton>
        </div>
      </div>
    </div>

    <div class="thead table-grid h9 text-(--c-base-1000--50)">
      <button class="hover:text-(--c-base-1000)" @click="handleSorting('id')">
        <span>ID</span>

        <UIcon
          name="i-lucide:arrow-down"
          class="w-3 h-3 transition-transform duration-300 ease-(--ease-default)"
          :class="[
            `${sortingStatus.id.direction === 'asc' ? 'rotate-180' : ''}`,
            `${sortingStatus.id.isActive ? 'opacity-100' : 'opacity-0'}`,
          ]"
        />
      </button>
      <button @click="handleSorting('company')">
        <span>Company</span>

        <UIcon
          name="i-lucide:arrow-down"
          class="w-3 h-3 transition-transform duration-300 ease-(--ease-default)"
          :class="[
            `${sortingStatus.company.direction === 'asc' ? 'rotate-180' : ''}`,
            `${sortingStatus.company.isActive ? 'opacity-100' : 'opacity-0'}`,
          ]"
        />
      </button>
      <button @click="handleSorting('slug')">
        <span>Slug</span>

        <UIcon
          name="i-lucide:arrow-down"
          class="w-3 h-3 transition-transform duration-300 ease-(--ease-default)"
          :class="[
            `${sortingStatus.slug.direction === 'asc' ? 'rotate-180' : ''}`,
            `${sortingStatus.slug.isActive ? 'opacity-100' : 'opacity-0'}`,
          ]"
        />
      </button>
      <div>Expired in</div>
      <div>Status</div>
      <div>Client status</div>
    </div>

    <div class="tbody">
      <div
        class="trow table-grid h8_md"
        v-for="proposal in proposals"
        :key="proposal.id"
      >
        <div>{{ proposal.id }}</div>
        <div>{{ proposal.company }}</div>
        <div>{{ proposal.slug }}</div>
        <div>{{ proposal.expiredIn }}</div>
        <div>
          <span :class="`l-${proposal.status.toLowerCase().replace(' ', '-')}`">
            {{ proposal.status }}
          </span>
        </div>
        <div>
          <UIcon
            v-if="proposal.clientStatus === 'viewed'"
            name="i-lucide:eye"
            class="w-4 h-4 text-(--c-base-1000--50) mr-2!"
          />
        </div>
        <div>
          <button
            v-if="proposal.status === 'Published'"
            class="share-btn text-(--c-base-1000--50) hover:text-(--c-base-1000) transition-all duration-300 ease-(--ease-default)"
          >
            <UIcon name="i-lucide:redo-2" class="w-4 h-4" />
          </button>
          <button
            class="actions-btn text-(--c-base-1000--50) hover:text-(--c-base-1000) transition-all duration-300 ease-(--ease-default)"
          >
            <UIcon name="i-lucide:ellipsis-vertical" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const filterTabs = reactive([
  {
    label: "All",
    value: "all",
    isActive: true,
  },
  {
    label: "Ready for sale",
    value: "ready-for-sale",
    isActive: false,
  },
  {
    label: "Published",
    value: "published",
    isActive: false,
  },
  {
    label: "Viewed",
    value: "viewed",
    isActive: false,
  },
  {
    label: "Draft",
    value: "draft",
    isActive: false,
  },
  {
    label: "Expired soon",
    value: "expired-soon",
    isActive: false,
  },
])
const proposalsPure = Array.from({ length: 30 }, (_, i) => ({
  id: 1 + i,
  company:
    ["TFTL", "FIVE", "Seventh", "Coeval", "Aexlab", "Babyn Yar", "Yoodezen"][
      i % 7
    ] ?? "",
  slug:
    ["tftl-proposal", "five-proposal", "seventh-proposal", "coeval-proposal"][
      i % 4
    ] ?? "",
  expiredIn: `${Math.floor(Math.random() * 30) + 1} days`,
  status: ["Draft", "Published", "Expired soon"][i % 4] ?? "",
  clientStatus: i % 4 === 0 ? "viewed" : "",
}))

const sortingStatus = reactive({
  id: {
    direction: "asc",
    isActive: true,
  },
  company: {
    direction: "asc",
    isActive: false,
  },
  slug: {
    direction: "asc",
    isActive: false,
  },
})
const proposals = computed(() => {
  const activeSorting = Object.keys(sortingStatus).find(
    (k) => sortingStatus[k as SortingField].isActive
  ) as SortingField
  const direction = sortingStatus[activeSorting].direction

  if (activeSorting === "id") {
    if (direction === "asc") {
      return proposalsPure.sort((a, b) => {
        return a.id - b.id
      })
    } else {
      return proposalsPure.sort((a, b) => {
        return b.id - a.id
      })
    }
  }
  if (activeSorting === "company") {
    if (direction === "asc") {
      return proposalsPure.sort((a, b) => {
        return a.company.localeCompare(b.company)
      })
    } else {
      return proposalsPure.sort((a, b) => {
        return b.company.localeCompare(a.company)
      })
    }
  }
  if (activeSorting === "slug") {
    if (direction === "asc") {
      return proposalsPure.sort((a, b) => {
        return a.slug.localeCompare(b.slug)
      })
    } else {
      return proposalsPure.sort((a, b) => {
        return b.slug.localeCompare(a.slug)
      })
    }
  }

  return proposalsPure
})

type SortingField = "id" | "company" | "slug"
type FilterField =
  | "all"
  | "ready-for-sale"
  | "published"
  | "viewed"
  | "draft"
  | "expired-soon"

const scrollToTopTable = () => {
  const FIXED_TABLE_GAP = 102
  const contentWrapElement = document.querySelector("main.main .content-wrap")

  if (contentWrapElement) {
    contentWrapElement.scrollTo({ top: FIXED_TABLE_GAP, behavior: "smooth" })
  }
}

const handleSorting = (field: SortingField) => {
  if (!sortingStatus[field].isActive) {
    sortingStatus[field].direction = "asc"
    sortingStatus[field].isActive = true

    // reset all other sorting statuses
    Object.keys(sortingStatus).forEach((k) => {
      const key = k as SortingField

      if (key !== field) {
        sortingStatus[key].direction = "asc"
        sortingStatus[key].isActive = false
      }
    })

    return
  } else {
    sortingStatus[field].direction =
      sortingStatus[field].direction === "asc" ? "desc" : "asc"
    sortingStatus[field].isActive = true
  }

  scrollToTopTable()
}

const handleFilter = (value: FilterField) => {
  filterTabs.forEach((tab) => {
    tab.isActive = tab.value === value
  })

  animateHighlightFilter(value)
}

const animateHighlightFilter = (value: FilterField) => {
  const FIXED_TAB_GAP = 4
  const highlightFilterElement =
    document.querySelector<HTMLDivElement>("#highlight-filter")
  const filterTabsElement =
    document.querySelector<HTMLDivElement>("#filter-tabs")
  const activeTabElement = filterTabsElement?.querySelector<HTMLButtonElement>(
    `[data-value="${value}"]`
  )

  if (!highlightFilterElement || !filterTabsElement || !activeTabElement) return

  const calculatedLeft =
    activeTabElement.getBoundingClientRect().left -
    filterTabsElement.getBoundingClientRect().left +
    FIXED_TAB_GAP
  const calculatedWidth =
    activeTabElement.getBoundingClientRect().width - FIXED_TAB_GAP * 2

  gsap.to(highlightFilterElement, {
    left: `${calculatedLeft}px`,
    duration: 0.3,
    ease: "power2.inOut",
    width: `${calculatedWidth}px`,
  })
}
</script>

<style scoped lang="scss">
.highlight-filter {
  position: absolute;
  left: 0.25rem;
  bottom: 0;
  width: 1.5rem;
  height: 0.25rem;
  border-radius: 0.25rem;
  background-color: var(--c-brand-500);
}
.tabs {
  position: relative;
  display: flex;
  gap: 0.5rem;
}
.btn-tab {
  color: var(--c-base-1000--50);
  transition: all 0.3s var(--ease-default);
  padding: 0.5rem 0.5rem 1rem 0.5rem;

  &.is-active {
    color: var(--c-brand-500);
  }
}
.actions-btn,
.share-btn {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .icon {
    width: 1rem;
    height: 1rem;
  }
}
.trow {
  position: relative;
  display: flex;
  align-items: center;
  height: 4rem;
  cursor: pointer;
  border-bottom: 1px solid var(--c-base-1000--10);
  background-color: var(--c-base-0);
  transition: all 0.3s var(--ease-default);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0.125rem;
    height: 100%;
    background-color: var(--c-base-1000--20);
    transition: all 0.3s var(--ease-default);
    opacity: 0;
  }

  @include hover {
    &:hover {
      background-color: var(--c-base-1000--5);
      border-color: transparent;

      &::before {
        opacity: 1;
      }
    }
  }

  div {
    &:nth-child(1) {
      padding-left: 1rem;
    }
    &:nth-child(2),
    &:nth-child(3) {
      padding-left: 0;
    }
    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6) {
      padding-right: 0;
      padding-left: 1.5rem;
      text-align: right;
    }
    &:nth-child(7) {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 1rem;
    }
  }
}
.thead {
  position: sticky;
  top: 0;
  z-index: 1;
  border-bottom: 1px solid var(--c-base-1000--10);
  background-color: var(--c-base-0);

  &::before {
    content: "";
    position: absolute;
    top: -1.5rem;
    left: 0;
    width: 100%;
    height: 1.5rem;
    background-color: var(--c-gray);
    z-index: -1;
  }

  button {
    transition: all 0.3s var(--ease-default);

    @include hover {
      &:hover {
        color: var(--c-base-1000);
      }
    }
  }

  div,
  button {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 1rem 2rem 1rem 0;

    &:nth-child(1) {
      padding-left: 1rem;
      padding-right: 0;
    }
    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6) {
      display: flex;
      justify-content: flex-end;
      padding: 0;
      text-align: right;
    }
  }
}
.table-grid {
  display: grid;
  grid-template-columns: 3.75rem 8rem 1fr 5.375rem 7.25rem 6.5rem 7rem;
}
.header-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem;
  background-color: var(--c-base-0);
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  z-index: 1;
}
.tbody {
  position: relative;
  width: 100%;
  background-color: var(--c-base-0);
  z-index: 0;
}
.header {
  position: relative;
  width: 100%;
  height: 4.5rem;
  z-index: 2;
}
.wrap-table {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
