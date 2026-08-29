<template>
  <div class="text-bubble">
    <div><slot /></div>
  </div>
</template>

<style scoped>
.text-bubble {
  display: flex;
  width: 100%;
  margin: 0 0 1rem;

  &.user {
    white-space: break-spaces;
    justify-content: end;
    padding-left: 2rem;

    > * {
      background-color: var(--accent);
    }
  }

  &.assistant,
  &.system-error {
    padding-right: 2rem;
  }

  &.assistant > * {
    background-color: var(--foreground);
  }

  &.system-error > * {
    background-color: var(--danger);
  }

  > * {
    border-radius: 5px;
    border: 0;
    color: var(--background);
    padding: 0.5rem;
  }
}
</style>
