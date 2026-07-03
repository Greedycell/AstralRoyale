const AvailableServerCommandMessage = require('../../Messages/Server/AvailableServerCommandMessage')

class LogicCreateGameRoomCommand {
  constructor() {}

  async decode (self) {}

  async process (self) {
    await new AvailableServerCommandMessage(self.client, 248).send()
  }
}

module.exports = LogicCreateGameRoomCommand