<script setup>
import Spinner from '@/components/spinner.vue'
import TextBubble from '@/components/text-bubble.vue'
import Alert from '@/components/alert.vue'
</script>

<template>
  <section class="home">
    <h1>Chat Geppetto</h1>
    <div class="output">
      <TextBubble class="me">Hola</TextBubble>
      <TextBubble><Spinner /></TextBubble>
      <TextBubble><Alert class="error">Error!</Alert></TextBubble>
      <TextBubble><Alert class="error">Error!</Alert></TextBubble>
      <TextBubble><Alert class="error">Error!</Alert></TextBubble>
      <TextBubble><Alert class="error">Error!</Alert></TextBubble>
      <TextBubble><Alert class="error">Error!</Alert></TextBubble>
      <TextBubble><Alert class="error">Error!</Alert></TextBubble>
      <TextBubble><Alert class="error">Error!</Alert></TextBubble>
      <TextBubble><Alert class="error">Error!</Alert></TextBubble>
      <TextBubble><Alert class="error">Error!</Alert></TextBubble>
      <TextBubble><Alert class="error">Error!</Alert></TextBubble>
      <TextBubble><Alert class="error">Error!</Alert></TextBubble>
    </div>
    <div class="input">
      <p contenteditable="true" id="command"></p>
      <button type="button">▶</button>
    </div>
  </section>
</template>
