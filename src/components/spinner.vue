<template>
  <span class="spinner"></span>
</template>

<style scoped>
.spinner {
  background-color: var(--foreground);
  border-radius: 5px;
  border: 0;
  color: var(--background);
  padding: 0.5rem;

  &::before {
    content: 'Thinking ';
  }
  &:after {
    content: '/';
    display: inline-block;
    width: 1ch;
    animation: spinner 600ms infinite;
  }
}

@keyframes spinner {
  0% {
    content: '/';
  }
  25% {
    content: '-';
  }
  50% {
    content: '\\';
  }
  75% {
    content: '|';
  }
}
</style>
