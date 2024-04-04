const mongoose = require('mongoose')


const castTaglinesSchema = mongoose.Schema(
  {
    whoSaidIt: {
        type: String,
        required: [true, "Please enter cast member first name"]
    },

    content: {
        type: String,
    }
  }
)

const castTaglines = mongoose.model('castTaglines', castTaglinesSchema);

module.exports = castTaglines