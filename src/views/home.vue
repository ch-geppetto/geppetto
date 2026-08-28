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

const themes = ['melange-dark', 'catppuccin-mocha', 'dracula', 'pomboverso']

const currentTheme = ref(themes[Math.floor(Math.random() * themes.length)])

function submitCommand() {
  if (sendCommand(cmd.value)) {
    cmd.value = ''
  }
}
</script>

<template>
  <main class="home" :class="currentTheme">
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
          <Alert class="error">{{ message.content }}</Alert>
        </template>
        <template v-else>
          {{ message.content }}
        </template>
      </TextBubble>
      <TextBubble class="system" v-if="messages.isLoading">
        <Spinner />
      </TextBubble>
    </section>
    <section class="input">
      <form @submit.prevent="submitCommand">
        <label for="command">Message</label>

        <textarea
          id="command"
          v-model="cmd"
          rows="1"
          @keydown.enter.exact.prevent="submitCommand"
          placeholder="Ask something..."
        />

        <button type="submit">Send</button>
      </form>
    </section>
  </main>
</template>
