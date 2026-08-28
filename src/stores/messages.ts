import { ref } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'chat-geppetto-messages'

export const useMessages = defineStore('messages', () => {
  const chat = ref([])

  function addMsg(content, role) {
    chat.value.push({ content, role })

    saveMsgs()
  }

  function saveMsgs() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chat.value))
  }

  function loadMsgs() {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (!stored) {
      return
    }

    try {
      chat.value = JSON.parse(stored)
    } catch (error) {
      console.error('Failed to load messages:', error)
      chat.value = [{ content: 'Error!', role: 'system-error' }]
    }
  }

  function clearMsgs() {
    chat.value = []
    localStorage.removeItem(STORAGE_KEY)
  }

  return { chat, addMsg, loadMsgs, clearMsgs }
})
