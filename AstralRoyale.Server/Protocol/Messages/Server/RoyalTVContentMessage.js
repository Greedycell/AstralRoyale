const PiranhaMessage = require('../../PiranhaMessage')

class RoyalTVContentMessage extends PiranhaMessage {
  constructor (client, classId, instanceId) {
    super()
    this.id = 20073
    this.client = client
    this.version = 1
    this.classId = classId
    this.instanceId = instanceId
  }

  async encode () {
    this.writeVInt(1) // Count
    {
      this.writeString("{\"player0\":{\"acc_hi\":0,\"acc_lo\":1,\"name\":\"Test 1\",\"alliance\":\"Test\",\"stars\":1,\"score\":0,\"score_p\":30,\"alli_hi\":0,\"alli_lo\":1,\"home_hi\":0,\"home_lo\":1,\"badge\":16000078,\"spells\":[{\"d\":26000006},{\"d\":26000020},{\"d\":28000004},{\"d\":26000018,\"l\":1},{\"d\":26000011},{\"d\":26000003,\"l\":2},{\"d\":26000014,\"l\":1},{\"d\":26000012}]},\"player1\":{\"acc_hi\":0,\"acc_lo\":2,\"name\":\"Test 2\",\"alliance\":\"Test\",\"stars\":3,\"score\":30,\"score_p\":0,\"alli_hi\":0,\"alli_lo\":1,\"home_hi\":0,\"home_lo\":2,\"badge\":16000078,\"spells\":[{\"d\":26000000,\"l\":1},{\"d\":26000007},{\"d\":26000013},{\"d\":26000018},{\"d\":28000000},{\"d\":26000003},{\"d\":26000002},{\"d\":26000015}]},\"player2\":{\"acc_hi\":0,\"acc_lo\":0,\"alli_hi\":0,\"alli_lo\":0,\"home_hi\":0,\"home_lo\":0},\"player3\":{\"acc_hi\":0,\"acc_lo\":0,\"alli_hi\":0,\"alli_lo\":0,\"home_hi\":0,\"home_lo\":0},\"arena\":54000002,\"replayV\":64,\"challenge\":false,\"tournament\":false,\"friendly_challenge\":false,\"survival\":false,\"game_config\":{\"gmt\":1,\"plt\":1,\"gamemode\":72000006,\"t1s\":0,\"t2s\":0}}")

      this.writeVInt(0)

      // Replay Version
      this.writeVInt(3)
      this.writeVInt(830)
      this.writeVInt(6)

      this.writeVInt(0) // Views

      this.writeVInt(0)
      this.writeVInt(1)
      this.writeVInt(0) // Age

      this.writeVInt(0) // ReplayShardId?

      this.writeVInt(1)
      this.writeVInt(26)

      this.writeLong(1) // ReplayId

      this.writeVInt(this.classId) // ClassId
      this.writeVInt(this.instanceId) // InstanceId
    }
  }
}

module.exports = RoyalTVContentMessage