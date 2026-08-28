import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMessages = defineStore('messages', () => {
  const chat = ref([])

  function addMsg(content, role) {
    chat.value.push({ content, role })
  }

  return { addMsg, chat }
})
