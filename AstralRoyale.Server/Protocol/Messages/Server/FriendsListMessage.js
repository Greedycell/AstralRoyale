const PiranhaMessage = require('../../PiranhaMessage')

class FriendsListMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20105
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeInt(0); // 0 = Invited | 1 = Facebook (?) | 2 = Gamecenter (?)
    this.writeInt(1); // Friends Count

    this.writeInt(0) // HighID
    this.writeInt(1) // LowID
    this.writeBoolean(true);
    this.writeInt(0) // HighID
    this.writeInt(1) // LowID
    this.writeString('Astral'); // Name
    this.writeString(null); // Facebook Identifier
    this.writeString(null); // Gamecenter Identifier
    this.writeVInt(1); // ExpLevel
    this.writeVInt(0); // Score
    // -- Clan Start --
    this.writeBoolean(false); // Clan.
    // this.writeString(null);
    // this.writeString(null);
    // this.writeVInt(1);
    // -- Clan End --
    this.writeVInt(1); // Arena
    this.writeString(null);
    this.writeString(null);
    this.writeVInt(-1);
    this.writeInt(0);
    this.writeInt(0);
  }
}

module.exports = FriendsListMessage