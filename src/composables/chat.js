import { useMessages } from '@/stores/messages'
import { askAi } from '@/api/ai'

const max_len = 255

async function sendCommand(cmd) {
  const command = cmd.trim()
  if (command === '' || command.length > max_len) {
    return
  }

  const messages = useMessages()

  messages.addMsg(command, 'user')
  messages.isLoading = true

  try {
    const response = await askAi(command)
    messages.addMsg(response, 'assistant')

    return true
  } catch (error) {
    console.error(error)
    messages.addMsg('Something went wrong. Please try again.', 'system-error')

    return false
  } finally {
    messages.isLoading = false
  }
}

export { sendCommand }
