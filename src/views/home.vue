<script setup>
import Spinner from '@/components/spinner.vue'
import TextBubble from '@/components/text-bubble.vue'
import Alert from '@/components/alert.vue'
import { sendCommand } from '@/composables/chat.js'

let cmd = ''
</script>

<template>
  <section class="home">
    <h1>Chat Geppetto</h1>
    <div class="output">
      <TextBubble class="me">Hola</TextBubble>
      <TextBubble><Spinner /></TextBubble>
      <TextBubble><Alert class="error">Error!</Alert></TextBubble>
    </div>
    <div class="input">
      <textarea id="command" v-model="cmd" @keydown.enter.prevent="sendCommand(cmd)" />
      <button type="button" @click="sendCommand(cmd)">▶</button>
    </div>
  </section>
</template>
