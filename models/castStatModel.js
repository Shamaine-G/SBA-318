const mongoose = require('mongoose')


const castStatsSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, "Please enter cast member first name"]
    },
    show_status: {
        type: String,
    },
    marital_status: {
        type: String, 
    }
  }
)

const castStats = mongoose.model('castStats', castStatsSchema);

module.exports = castStats