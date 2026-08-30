class LogicTimer {
  async encode (self, value1, value2, value3) {
    self.writeVInt(value1)
    self.writeVInt(value2)
    self.writeVInt(value3)
  }
}

module.exports = LogicTimer