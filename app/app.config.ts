// app.config.ts
export default defineAppConfig({
  ui: {
    input: {
      slots: {
        root: "w-full",
      }
    },
    toast: {
      slots: {
        root: "bg-[var(--c-add-success-100)] p-[1.25rem!important] ring-[#0B421E] gap-[1rem]",
        title: "text-[var(--c-add-success-800)] mb-[0.25rem!important] h8_md",
        description: "text-[#0B421EB2] h8",
        close: "translate-x-[.25rem] translate-y-[-0.25rem] hover:text-[#0B421E]",
        icon: "bg-[#0B421E]",
      },
    },
    toaster: {
      defaultVariants: {
        position: "bottom-left",
      },
    },
    button: {
      slots: {
        base: "rounded-[0.5rem] transition-all duration-300 ease-(--ease-default) focus-visible:outline-1! focus-visible:outline-(--c-base-1000)! focus-visible:outline-offset-0!",
      }
    },
  },
})
