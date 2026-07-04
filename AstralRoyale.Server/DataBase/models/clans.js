const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating schema
const clansSchema = new Schema({
    highID:{
        type: Number,
        required: true
    },
    lowID:{
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    trophies:{
        type: Number,
        default: 0
    },
    requiredTrophies:{
        type: Number,
        default: 0
    },
    badge:{
        type: Number,
        default: 1
    },
    avatarID:{
        type: Number,
        default: 0
    },
    type:{
        type: Number,
        default: 0  // 0 = Open, 1 = Invite Only, 2 = Closed
    },
    location:{
        type: Number,
        default: 57 // Global
    },
    members: {
        type: Array,
        default: []
        // Each member: { highID, lowID, name, role, trophies, level, arena, donated, donationsReceived }
    },
    messages: {
        type: Array,
        default: []
        // Each message: { id, senderHighID, senderLowID, senderName, senderRole, message, timestamp }
    }
})

mongoose.model('clans', clansSchema);