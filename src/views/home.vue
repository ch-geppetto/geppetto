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
      <button type="button" class="debug-btn" @click="toggleDebugger">{{ "</>" }}</button>
      <button type="button" class="reset-btn" @click="messages.clearMsgs">x</button>
    </header>
    <section class="debug" v-if="showDebugger">
      <pre>
        {{ messages.chat }}
      </pre>
    </section>
    <section v-else class="output">
      <TextBubble v-for="(message, index) in messages.chat" :key="index" :class="message.role">
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

<style scoped>
main.home {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      margin: 0;
      text-transform: uppercase;
      color: var(--accent);
      display: inline-block;
      flex-grow: 1;
    }

    .debug-btn {
      font-size: 1.5rem;
      color: var(--foreground);
    }

    .reset-btn {
      font-size: 2rem;
      color: var(--danger);
    }
  }

  button {
    background-color: transparent;
    color: var(--accent);
    border-radius: 10px;
    border: 0;
    padding: 0.25rem 0.5rem;
    font-size: 1rem;

    &:hover {
      color: var(--fg);
      cursor: pointer;
    }
  }

  .output {
    flex-grow: 1;
    padding: 1rem;
    border-radius: 5px;
    overflow-y: auto;
    border: 1px solid var(--accent);
  }

  .input form {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    button {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
    }

    textarea {
      display: block;
      border-radius: 5px;
      border: 1px solid var(--accent);
      background-color: transparent;
      padding: 1rem;
      padding-inline-end: 3rem;
      width: 100%;
      font-size: 1rem;
      color: var(--fg);
      margin: 0;
      resize: none;
    }
  }

  section.debug {
    border: 1px solid var(--foreground);
    overflow-y: auto;
    border-radius: 5px;
    min-height: 150px;
    padding: 1rem;

    pre {
      white-space: pre-wrap;
    }
  }
}
</style>
