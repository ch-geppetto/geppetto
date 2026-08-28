<template>
  <span class="spinner"></span>
</template>

<style scoped>
.spinner {
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
