import { marked } from 'marked'

function toMarkdown(content) {
  return marked.parse(content)
}

export { toMarkdown }
