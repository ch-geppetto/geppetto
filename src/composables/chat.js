const max_len = 10

function sendCommand(cmd) {
  if (cmd !== '' && cmd.length < max_len) {
    alert(cmd)
  }
}

export { sendCommand }
