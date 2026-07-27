const fs = require('fs')

class LogicCommandManager {
  constructor () {
    this.commands = {}

    fs.readdir('./Protocol/Commands/Client', (err, files) => {
      if (err)console.log(err)
      files.forEach(e => {
        const Command = require(`./Commands/Client/${e.replace('.js', '')}`)
        const commandClass = new Command()

        this.commands[commandClass.commandID] = Command
      })
    })
  }

  handle (id) {
    return this.commands[id]
  }

  getCommands () {
    return Object.keys(this.commands)
  }
}

module.exports = LogicCommandManager