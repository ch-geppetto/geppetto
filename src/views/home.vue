<script setup>
import { ref } from 'vue'
import Spinner from '@/components/spinner.vue'
import TextBubble from '@/components/text-bubble.vue'
import Alert from '@/components/alert.vue'
import { sendCommand } from '@/composables/chat'
import { useMessages } from '@/stores/messages'
import { toMarkdown } from '@/utils/toMarkdown'

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

const showDebugger = ref(false)
function toggleDebugger() {
  showDebugger.value = !showDebugger.value
}
</script>

<template>
  <main class="home" :class="currentTheme">
    <header>
      <h1>Chat Geppetto</h1>
      <button type="button" class="debug-btn" @click="toggleDebugger">debug</button>
      <button type="button" class="reset-btn" @click="messages.clearMsgs">x</button>
    </header>
    <section class="debug" v-if="showDebugger">
      <pre>
        {{ messages.chat }}
      </pre>
    </section>
    <section class="output">
      <TextBubble
        v-for="(message, index) in messages.chat"
        :key="index"
        :class="{ me: message.role === 'user' }"
      >
        <template v-if="message.role === 'system-error'">
          <Alert class="error">{{ message.content }}</Alert>
        </template>
        <template v-else-if="message.role === 'assistant'">
          <div v-html="toMarkdown(message.content)"></div>
        </template>
        <template v-else>
          {{ message.content }}
        </template>
        <time :datetime="message.date">{{ message.date }}</time>
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

        <button type="submit" :disabled="messages.isLoading">
          {{ messages.isLoading ? '...' : 'Send' }}
        </button>
      </form>
    </section>
  </main>
</template>
