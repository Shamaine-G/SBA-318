const mongoose = require('mongoose')


const castMembersSchema = mongoose.Schema(
  {
    firstName: {
        type: String,
        required: [true, "Please enter cast member first name"]
    },
    lastName: {
        type: String,
        required: [true, "Please enter cast member last name"]
    },
    city: {
        type: String, 
    }
  }
)

const castMembers = mongoose.model('castMembers', castMembersSchema);

module.exports = castMembers