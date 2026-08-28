import { useMessages } from '@/stores/messages'

const max_len = 255

function sendCommand(cmd) {
  const command = cmd.trim()
  if (command === '' || command.length > max_len) {
    return
  }

  const messages = useMessages()
  messages.addMsg(command, 'user')
  return true
}

export { sendCommand }
