import type { DirectiveBinding } from "vue"

interface ExtendedElement extends HTMLElement {
  clickOutsideEvent: (event: Event) => void
}

export default {
  beforeMount(el: ExtendedElement, binding: DirectiveBinding) {
    el.clickOutsideEvent = function (event: Event) {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event)
      }
    }

    document.addEventListener("click", el.clickOutsideEvent)
  },

  beforeUnmount(el: ExtendedElement) {
    document.removeEventListener("click", el.clickOutsideEvent)
  },
}
