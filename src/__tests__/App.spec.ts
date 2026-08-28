import { beforeEach, describe, it, expect } from 'vitest'

import { createPinia, setActivePinia } from 'pinia'
import { sendCommand } from '@/composables/chat'

describe('App', () => {
  describe('sendCommand', () => {
    beforeEach(() => {
      setActivePinia(createPinia())
    })

    it('does not send an empty command', async () => {
      const result = await sendCommand('')

      expect(result).toBe(false)
    })

    it('does not send whitespace-only commands', async () => {
      const result = await sendCommand('   ')

      expect(result).toBe(false)
    })

    it('rejects commands longer than 255 characters', async () => {
      const command = 'a'.repeat(256)

      const result = await sendCommand(command)

      expect(result).toBe(false)
    })
  })
})
