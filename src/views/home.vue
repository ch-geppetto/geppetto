<script setup>
import TextBubble from '@/components/text-bubble.vue'
</script>

<template>
  <section class="home">
    <div class="output">
      <TextBubble class="me">Hola</TextBubble>
      <TextBubble>Hola</TextBubble>
    </div>
    <div class="input">
      <p contenteditable="true" id="command"></p>
      <button type="button">▶</button>
    </div>
  </section>
</template>
