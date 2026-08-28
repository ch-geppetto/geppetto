<script setup>
import { ref } from 'vue'
import Spinner from '@/components/spinner.vue'
import TextBubble from '@/components/text-bubble.vue'
import Alert from '@/components/alert.vue'
import { sendCommand } from '@/composables/chat.js'
import { useMessages } from '@/stores/messages'

const messages = useMessages()
messages.loadMsgs()

let cmd = ref('')

function submitCommand() {
  if (sendCommand(cmd.value)) {
    cmd.value = ''
  }
}
</script>

<template>
  <main class="home">
    <header>
      <h1>Chat Geppetto</h1>
      <button type="button" @click="messages.clearMsgs">x</button>
    </header>
    <section class="output">
      <TextBubble
        v-for="(message, index) in messages.chat"
        :key="index"
        :class="{ me: message.role === 'user' }"
      >
        <template v-if="message.role === 'system-error'">
          <Alert>{{ message.content }}</Alert>
        </template>
        <template v-else>
          {{ message.content }}
        </template>
      </TextBubble>
    </section>
    <section class="input">
      <textarea id="command" v-model="cmd" @keydown.enter.prevent="submitCommand" />
      <button type="button" @click="submitCommand">▶</button>
    </section>
  </main>
</template>
