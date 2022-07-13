const mongoose = require("mongoose")
// const mongoosePaginate = require("mongoose-paginate-v2")
const { model, Schema } = mongoose
const DOCUMENT_NAME = "Match"
const COLLECTION_NAME = "matches"

const schema = new Schema({
  gameRef: {
    type: Number,
    unique: true,
  },

  status: {
    type: String,
    enum: [
      "pre-match",
      "to-be-decided",
      "ended",
      "in-progress",
      "rescheduled",
      "cancelled",
      "postponed",
      "abandoned"
    ],
    required: true
  },

  gameId: String,
  leagueId: Number,
  season: Number,

  matchDay: Number,
  matchDayString: String,

  matchType: String,
  matchWinner: String,

  gameDate: Date,

  aTeamRef: String,
  aTeamScore: Number,
  aTeamCode: String,
  aTeamName: String,

  hTeamRef: String,
  hTeamScore: Number,
  hTeamCode: String,
  hTeamName: String,

  lineupsAvailable: Boolean,
  timings: {
    min: {
      type: Number,
    },
    state: {
      type: String
    }
  },
  events: [{
    eventId: {
      type: Number
    },
    type: {
      type: String
    },
    card: {
      type: String
    },
    min: {
      type: Number
    },
    playerRef: {
      type: String
    },
    teamRef: {
      type: String
    },
    side: {
      type: String
    },
    score: {
      type: Number
    },
    subOff: {
      type: String
    },
    subOn: {
      type: String
    },
    period: {
      type: String
    },
    timeStamps: {
      type: String
    }
  }]
}, { versionKey: false, timestamps: true })

schema.set("toJSON", { virtuals: true })
schema.set("toObject", { virtuals: true })

// using mongoose paginate for pagination
// schema.plugin(mongoosePaginate)

module.exports = model(DOCUMENT_NAME, schema, COLLECTION_NAME)
