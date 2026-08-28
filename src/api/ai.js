import { InferenceClient } from '@huggingface/inference'
const hf = new InferenceClient(import.meta.env.VITE_AI_API_KEY)

const MODEL = 'openai/gpt-oss-120b'

async function askAi(prompt) {
  const response = await hf.chatCompletion({
    model: MODEL,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 512,
  })

  return response.choices[0].message.content
}

export { askAi }
